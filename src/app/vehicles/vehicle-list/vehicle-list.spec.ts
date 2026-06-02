import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { VehicleList } from './vehicle-list';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.model';

// 1. We create mock data to have a predictable environment
const MOCK_VEHICLES: Vehicle[] = [
  { 
    id: '1', plate: 'ONT-123', status: 'active', make: 'Toyota', model: 'Camry', year: 2020, 
    vin: 'V1', account_id: 'A1', device_id: 'D1', last_known_location: null
  },
  { 
    id: '2', plate: 'QUE-456', status: 'parked', make: 'Ford', model: 'F-150', year: 2021, 
    vin: 'V2', account_id: 'A2', device_id: 'D2', last_known_location: null
  },
  { 
    id: '3', plate: 'BC-789', status: 'in_maintenance', make: 'Tesla', model: 'Model 3', year: 2022, 
    vin: 'V3', account_id: 'A3', device_id: 'D3', last_known_location: null
  },
];

describe('VehicleList Component', () => {
  let component: VehicleList;
  let fixture: ComponentFixture<VehicleList>;
  let vehicleServiceMock: any;

  beforeEach(async () => {
    // 2. We mock the service so we don't make real network calls
    vehicleServiceMock = {
      getVehicles: () => of(MOCK_VEHICLES)
    };

    await TestBed.configureTestingModule({
      imports: [VehicleList],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleList);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit to load data
  });

  // TEST A: Filtering Logic
  it('should filter vehicles by plate number', () => {
    component.query.set('ONT'); // Search for Ontario plates
    const filtered = component.getFilteredVehicles();
    
    expect(filtered.length).toBe(1);
    expect(filtered[0].plate).toBe('ONT-123');
  });

  it('should filter vehicles by status', () => {
    component.selectedStatus.set('parked');
    const filtered = component.getFilteredVehicles();
    
    expect(filtered.length).toBe(1);
    expect(filtered[0].status).toBe('parked');
  });

  // TEST B: Vehicle Selection (Details Panel)
  it('should update selectedVehicle signal when a vehicle is selected', () => {
    const targetVehicle = MOCK_VEHICLES[1];
    component.selectVehicle(targetVehicle);
    
    expect(component.selectedVehicle()).toEqual(targetVehicle);
    
    component.selectVehicle(null);
    expect(component.selectedVehicle()).toBeNull();
  });

  // TEST C: Export Logic Check
  it('should only include filtered vehicles in the list used for export', () => {
    component.selectedStatus.set('in_maintenance');
    const filtered = component.getFilteredVehicles();
    
    // We check that the logic feeding the export only sees the filtered item
    expect(filtered.length).toBe(1);
    expect(filtered[0].make).toBe('Tesla');
  });
});

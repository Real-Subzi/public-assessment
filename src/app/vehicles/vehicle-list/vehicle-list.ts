import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { Vehicle, VehicleStatus } from '../vehicle.model';

type StatusFilter = VehicleStatus | 'all';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})
export class VehicleList implements OnInit {
  private vehicleService = inject(VehicleService);

  readonly vehicles = signal<Vehicle[]>([]);
  readonly query = signal('');
  readonly selectedStatus = signal<StatusFilter>('all');
  readonly selectedVehicle = signal<Vehicle | null>(null);

  readonly statuses: StatusFilter[] = ['all', 'active', 'parked', 'in_maintenance', 'decommissioned'];

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles.set(vehicles);
    });
  }

  selectVehicle(vehicle: Vehicle | null): void {
    this.selectedVehicle.set(vehicle);
  }

  exportToCsv(): void {
    const data = this.getFilteredVehicles();
    if (data.length === 0) return;

    const headers = ['Plate', 'Make', 'Model', 'Year', 'Status', 'VIN', 'Account ID', 'Device ID', 'Last Seen'];
    const rows = data.map(v => [
      v.plate,
      v.make,
      v.model,
      v.year,
      v.status,
      v.vin,
      v.account_id,
      v.device_id,
      v.last_known_location?.recorded_at || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `fleet_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getFilteredVehicles(): Vehicle[] {
    const q = this.query();
    const status = this.selectedStatus();
    return this.vehicles().filter((v) => {
      const matchesPlate = q === '' || v.plate.includes(q);
      const matchesStatus = status === 'all' || v.status === status;
      return matchesPlate && matchesStatus;
    });
  }
}

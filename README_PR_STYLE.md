# Fleet Management Workflow Improvements

## Overview

This assessment focuses on improving the workflow efficiency of fleet managers using the provided vehicle management application.

After reviewing the existing implementation, I identified several usability gaps that made it difficult for users to quickly inspect records, identify operational exceptions, and extract relevant data for reporting purposes.

The implemented improvements focus on increasing operational visibility, reducing investigation time, and improving overall workflow efficiency while remaining within a bounded and low-risk scope.


## Problem Statement

The original application provided basic search and status filtering functionality but made it difficult for fleet managers to:

* Quickly inspect vehicle details
* Identify operationally important vehicles
* Prioritize exceptions
* Export relevant operational data

As the dataset grows, these limitations increase the time required to investigate and act on fleet information.


## Implemented Improvements

### 1. Vehicle Details Panel

Users can now select a vehicle directly from the table and view detailed information without leaving the current screen.

Benefits:

* Faster investigation workflow
* Reduced navigation overhead
* Better visibility into vehicle-specific information


### 2. CSV Export

Added the ability to export the currently filtered vehicle dataset.

Benefits:

* Supports reporting workflows
* Enables offline analysis
* Allows users to export targeted subsets of data


### 3. Operational Status Highlighting

Introduced visual indicators and row highlighting based on vehicle status.

Benefits:

* Faster identification of operational exceptions
* Reduced cognitive load
* Improved situational awareness


## Design Decisions

The focus of this assessment was not to build the largest feature set possible, but to deliver a practical improvement that could be implemented, tested, and shipped with confidence.

Priority was given to:

* High-impact workflow improvements
* Low implementation risk
* Clear user value
* Testable functionality


## Tradeoffs

Several possible improvements were intentionally deferred:

* Map visualization
* Real-time telemetry integration
* Backend infrastructure changes
* Authentication and authorization enhancements
* Advanced analytics dashboards

While these features may provide additional value, they introduce significantly greater complexity and were considered outside the scope of a safe and bounded implementation.


## Testing

Validation included:

* Automated unit tests
* Manual happy-path testing
* Edge-case validation
* Failure-mode verification

Automated tests cover:

* Vehicle filtering
* Vehicle selection
* CSV export functionality

Run tests using:

```bash
npm test
```


## Known Limitations

Current implementation assumes:

* Static dataset availability
* Client-side filtering
* Moderate dataset sizes

Additional optimization may be required for significantly larger datasets or real-time operational environments.


## Future Improvements

Potential future enhancements include:

* Map-based fleet visualization
* Advanced filtering and sorting
* Real-time vehicle updates
* Event-driven exception management
* Dashboard metrics and operational summaries


## Running the Application

```bash
npm install
npm start
```

Application will be available at:

```text
http://localhost:4200
```


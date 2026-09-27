# Flight Search

A flight search application built with **Next.js**, **React**, and
**TypeScript** as part of the Transavia front-end assignment.

The application allows users to search for available flights departing
from Amsterdam Schiphol by selecting a destination and departure date.
Matching flights are displayed on the same page with their schedule,
airport information, price, and booking link.

## Features

-   Search flights departing from Amsterdam Schiphol (AMS)
-   Select from destinations available in the provided flight data
-   Search by departure date
-   Display matching flights on the same page
-   Display user-friendly airport names alongside airport codes
-   Show departure and arrival times
-   Show flight number and total price
-   Link to the provided Transavia booking deeplink
-   Loading, error, empty, and success states
-   Responsive layout
-   Accessible form controls and status messages
-   Unit tests for business logic and component rendering

## Tech Stack

-   Next.js
-   React
-   TypeScript
-   CSS Modules
-   Vitest
-   React Testing Library
-   Testing Library User Event

## Getting Started

### Install dependencies

``` bash
npm install
```

### Start the development server

``` bash
npm run dev
```

Open:

``` text
http://localhost:3000
```

### Run tests

``` bash
npm test
```

For a single test run:

``` bash
npm run test:run
```

### Run linting

``` bash
npm run lint
```

### Create a production build

``` bash
npm run build
```

## Project Structure

The application follows a feature-based structure. Flight-specific code
is kept inside the `features/flights` domain, while reusable
application-level components are kept under `shared`.

``` text
flight-search/
├── public/
│   └── data/
│       ├── airports.json
│       └── flights-from-AMS.json
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── layout.tsx
│   │   ├── page.module.css
│   │   └── page.tsx
│   │
│   ├── features/
│   │   └── flights/
│   │       ├── components/
│   │       │   ├── FlightCard/
│   │       │   ├── FlightResults/
│   │       │   ├── FlightSearch/
│   │       │   │   └── reducer/
│   │       │   ├── FlightSearchForm/
│   │       │   │   └── reducer/
│   │       │   └── index.ts
│   │       │
│   │       ├── mappers/
│   │       │   ├── flight.mapper.ts
│   │       │   └── flight.mapper.test.ts
│   │       │
│   │       ├── services/
│   │       │   ├── flight.service.ts
│   │       │   └── flight.service.test.ts
│   │       │
│   │       ├── types/
│   │       │   └── flight.types.ts
│   │       │
│   │       └── utils/
│   │           ├── airportName/
│   │           ├── availableDestinations/
│   │           ├── filterFlights/
│   │           ├── formatFlightTime/
│   │           └── index.ts
│   │
│   └── shared/
│       ├── api/
│       │   ├── apiClient.ts
│       └── components/
│           ├── Footer/
│           ├── Header/
│           └── index.ts
│
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

Tests are colocated with the code they verify. This keeps implementation
and its corresponding tests close together and makes features easier to
maintain.

## Architecture and Design Decisions

### Feature-based structure

Flight-related components, types, services, mappers, reducers, and
utilities are grouped under:

``` text
src/features/flights
```

This keeps the flight domain self-contained instead of distributing
related code across application-wide folders.

Reusable components that are not specific to the flight domain, such as
the `Header` and `Footer`, are placed under:

``` text
src/shared/components
```

This separation makes it clearer which components belong to a business
feature and which can be reused across the wider application.

## Data Loading

The assignment provides two static JSON responses:

``` text
airports.json
flights-from-AMS.json
```

They are placed under:

``` text
public/data/
```

and loaded asynchronously using `fetch`.

### Why use `fetch` instead of importing the JSON directly?

The JSON files could technically be imported directly:

``` ts
import flights from '../../../../public/data/flights-from-AMS.json';
```

For this implementation, they are intentionally accessed through `fetch`
instead.

``` ts
const response = await fetch('/data/flights-from-AMS.json');
```

This was chosen because the supplied JSON represents API response data.
Fetching it asynchronously keeps the application behaviour closer to how
the same feature would work against a real backend API.

It also allows the UI to handle realistic asynchronous states such as:

-   loading
-   successful responses
-   failed requests
-   malformed or unavailable data

The component therefore does not need to assume that data is immediately
available.

Another advantage is that the service layer can later be changed from:

``` text
/data/flights-from-AMS.json
```

to a real API endpoint without requiring the UI components to know where
the data originates.

The static JSON files are therefore treated as a local API/data source
rather than as application source code.

### Shared API client

HTTP access is centralized through a small typed API client rather than
calling `fetch` directly from feature services.

The API client is responsible for common transport-level concerns such as:

- executing HTTP requests
- validating HTTP response status
- parsing JSON responses
- providing typed responses
- normalizing HTTP errors

Feature services remain responsible for domain-specific concerns such as
selecting resources and mapping API response models into application models.

The abstraction is intentionally lightweight. Additional concerns such as
authentication, retries, caching, or request cancellation would only be added
when required by the application.

## Service Layer

Data access is isolated inside the flight service rather than performed
directly inside React components.

This keeps components focused on presentation and user interaction while
the service is responsible for retrieving external data.

For example:

``` text
Component
    ↓
Flight Service
    ↓
JSON / API
```

This separation also makes the service independently testable.

## API Models and UI Models

The structure of `flights-from-AMS.json` is not used directly throughout
the UI.

A mapper converts the supplied `FlightOffer` response into a smaller
`Flight` model that contains only the information required by the
application.

Conceptually:

``` text
FlightOffer (API response)
        ↓
      Mapper
        ↓
Flight (application model)
        ↓
   UI components
```

For example, nested API data such as:

``` ts
outboundFlight.departureAirport.locationCode
```

becomes:

``` ts
flight.origin
```

This reduces coupling between the UI and the external response
structure.

If the API response changes in the future, much of that change can be
isolated to the service/types/mapper layer instead of propagating
through every component.

## State Management

The application uses React's built-in `useReducer` where multiple
related state values transition together.

For example, the flight search handles related states such as:

``` text
loading
error
flights
airports
results
hasSearched
```

Using a reducer keeps those transitions explicit and avoids spreading a
larger number of related `useState` calls throughout the component.

The form also uses a reducer for its related destination and
departure-date state.

For the current size of the application, an external state-management
library would add unnecessary complexity.

## Performance

The implementation keeps performance considerations proportional to the
size and scope of the assignment.

Examples include:

- deriving available destinations only when the source flight/airport
  data changes
- keeping filtering logic outside presentation components
- avoiding unnecessary external state-management dependencies
- separating API mapping from rendering
- keeping component responsibilities focused
- using client-side filtering for the supplied small, static dataset

### Code splitting and lazy loading

Next.js provides automatic route-level code splitting, so route-specific
JavaScript does not need to be manually lazy-loaded.

Component-level lazy loading using `next/dynamic` was also considered.
However, components such as `FlightResults` and `FlightCard` are small and
do not contain expensive dependencies.

Introducing an additional lazy-loaded chunk for these components would add
another loading boundary and complexity without providing a meaningful
performance benefit for the current application.

In a larger application, `next/dynamic` would be appropriate for expensive
features that are not required during the initial interaction, such as maps,
charts, rich-text editors, or other large client-side dependencies.

### Client-side filtering

The supplied flight dataset is small enough that client-side filtering is
appropriate. Once the data has been loaded, filtering by destination and
departure date is inexpensive and provides an immediate user interaction
without an additional network request for every search.

For a production system with a significantly larger or continuously changing
flight inventory, search and filtering would typically be moved closer to the
data source and handled through a backend API or Next.js server-side
capabilities. The client would then receive only the results required for the
current search.

## Next.js Server-side Capabilities and Future Evolution

The current implementation intentionally performs the interactive flight
search on the client.

The supplied assignment data is a small, static dataset containing
flights departing from Amsterdam Schiphol. After the data has been
loaded, filtering by destination and departure date is inexpensive and
does not justify an additional server request for every search.

This keeps the implementation proportional to the problem while still
demonstrating realistic asynchronous data loading, mapping,
loading/error handling, and client-side interaction.

### Why server-side search is not used for the supplied dataset

Next.js provides Server Components, server-side data access, caching,
revalidation, Route Handlers, and other server capabilities. These
capabilities are valuable when they solve a concrete problem; they are
not automatically required for every interaction.

For this assignment, moving each search to the server would add another
request and additional server-side complexity while querying the same
small static dataset.

The current flow is therefore:

``` text
Static JSON responses
        ↓
Flight service
        ↓
Mapper / application models
        ↓
Client application
        ↓
Destination + departure-date filtering
        ↓
Matching flights
```

This also keeps the search experience immediate after the initial data
has loaded.

## Accessibility

Accessibility was considered throughout the implementation.

The application includes:

-   semantic HTML
-   explicit labels for form controls
-   keyboard-accessible native form elements
-   accessible button and link names
-   visible focus states
-   loading status announcements
-   search result status announcements
-   error announcements
-   appropriate heading hierarchy
-   decorative UI elements excluded from assistive technology where
    appropriate

Native HTML controls are preferred where possible because they provide
keyboard and accessibility behaviour without recreating it using custom
components.

## Responsive Design

The layout is designed to work across desktop and smaller viewport
sizes.

On wider screens, the search controls are displayed efficiently in a
horizontal layout.

On smaller screens, the layout adapts so controls and flight information
remain readable and usable without requiring horizontal scrolling.

CSS Modules are used to scope component styles locally and avoid
unintended styling conflicts.

## Testing Strategy

The project uses **Vitest** and **React Testing Library**.

Tests are colocated with the code being tested.

The test suite covers both rendering and application logic, as required
by the assignment.

### Utility tests

Pure business logic is tested independently, including:

-   airport-name resolution
-   available origin and destination calculation
-   flight filtering
-   flight-time formatting

### Mapper tests

The flight mapper is tested separately to verify that the supplied API
response structure is correctly transformed into the application's
`Flight` model.

### Service tests

The service layer is tested independently from React components,
including data retrieval and response handling.

### Reducer tests

Reducers are tested as pure functions to verify predictable state
transitions.

### Component tests

Components are tested from the user's perspective using React Testing
Library.

Examples include:

-   rendering form controls
-   displaying available destinations
-   submitting search criteria
-   displaying flight information
-   displaying empty search results
-   displaying loading and error states
-   exposing accessible buttons, links, labels, alerts, and status
    information

Tests intentionally focus on observable behaviour rather than internal
implementation details.

## Error and Empty States

The application distinguishes between different states.

### Loading

While flight and airport information is being retrieved, the user
receives a loading indication.

### Data loading failure

If the supplied data cannot be loaded, an accessible error message is
displayed rather than leaving the page in an undefined state.

### No matching flights

When a search completes successfully but no flight matches the selected
destination and date, the application displays:

``` text
No flights found for your search.
```

The `Available flights` section is only displayed when matching flights
actually exist.

## Trade-offs

The goal was to keep the solution clean and production-minded without
over-engineering a relatively small assignment.

For that reason, the application intentionally does not introduce
additional libraries for:

-   global state management
-   server-state management
-   form management
-   component libraries

React and Next.js provide everything required for the current scope.

With a real backend and a larger production application, additional
considerations could include:

-   request cancellation for subsequent network-backed searches
-   caching and revalidation strategies for API-backed data
-   schema validation for API responses
-   monitoring and observability
-   end-to-end tests
-   localization
-   analytics
-   more advanced error recovery

These were intentionally kept outside the scope of the assignment.

## Engineering Principles Applied

The implementation deliberately favors clarity and maintainability over
unnecessary abstraction.

Key principles include:

-   **Single responsibility:** components, services, mappers, reducers,
    and utilities have focused responsibilities
-   **Separation of concerns:** data retrieval, API-to-UI mapping,
    business logic, state transitions, and rendering are separated
-   **Strong typing:** TypeScript models describe both supplied response
    structures and the simplified application model
-   **Testability:** pure utilities, reducers, mappers, services, and
    user-facing component behaviour can be tested independently
-   **Accessibility by default:** semantic HTML and native controls are
    preferred before custom interaction patterns

## Lighthouse

The application was audited using Google Chrome Lighthouse against the
production build.

The audit achieved:

| Category | Score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Summary

The implementation focuses on:

-   clear separation of responsibilities
-   strongly typed data
-   maintainable feature-based architecture
-   asynchronous data handling
-   testable business logic
-   accessible UI
-   responsive design
-   clean and readable code

The intention was to keep the solution simple and appropriate for the
supplied assignment data while demonstrating patterns that can evolve
naturally as the application grows. In particular, the current
client-side search can move to a Next.js server-side search architecture
when backed by a larger, dynamic production flight inventory, without
requiring the presentation layer to be redesigned.

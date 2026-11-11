# Indian Airport Autocomplete

## About the Project

A simple React application that allows users to search Indian airports using their IATA code or city name.It displays the top 5 matching airports in a dropdown and allows users to select an airport using a mouse or keyboard.

## Technologies Used

- React.js
- JavaScript
- Vite
- HTML
- CSS

## Features

- Search by airport code or city name.
- Case-insensitive search.
- Displays top 5 matching airports.
- 250ms search debounce.
- Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape).
- Mouse selection.
- Displays selected airport details in JSON format.
- Loads airport data from a JSON file using Fetch API.

## Installation and Run

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project folder:

```bash
cd airport-autocomplete
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

Open in browser:

`http://localhost:5173`

## Implementation

**Debouncing:** Used `useEffect` and `setTimeout` with a 250ms delay to avoid searching on every keystroke.

**Keyboard and Mouse:** Used a shared `activeIndex` state to manage the highlighted airport for both keyboard and mouse interactions.

**10,000 Airports:** For larger datasets, I would use an optimized search index or a backend API with database indexing to return the top 5 results efficiently.

## Limitations

- Uses a predefined local JSON dataset.
- Supports substring matching only.
- Does not support typo correction or fuzzy search.

## Author

**Mani Raja Mari**

GitHub: 

import { useEffect, useState } from "react";
import {
  loadAirports,
  searchAirports,
} from "../services/airportLookup";

function AirportAutocomplete() {
  const [input, setInput] = useState("");
  const [airports, setAirports] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load airport data
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const data = await loadAirports();

        if (!cancelled) {
          setAirports(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load airport data.");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  // Debounce search by 250ms
  useEffect(() => {
    if (!input.trim() || loading || error) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const matches = searchAirports(airports, input);
      setResults(matches);
      setActiveIndex(-1);
    }, 250);

    return () => clearTimeout(timer);
  }, [input, airports, loading, error]);

  // Handle input changes
  const handleChange = (event) => {
    setInput(event.target.value);
    setResults([]);
    setSelectedAirport(null);
    setActiveIndex(-1);
    setIsOpen(true);
  };

  // Select an airport
  const handleSelect = (airport) => {
    setInput(airport.code);
    setSelectedAirport(airport);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  // Keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!isOpen || !input.trim()) return;

    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();

      setActiveIndex((previous) =>
        previous >= results.length - 1 ? 0 : previous + 1
      );
    }

    if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();

      setActiveIndex((previous) =>
        previous <= 0 ? results.length - 1 : previous - 1
      );
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();

      const airport = results[activeIndex];

      if (airport) {
        handleSelect(airport);
      }
    }
  };

  return (
    <div className="autocomplete-container">
      <label htmlFor="airport-input">From</label>

      <input
        id="airport-input"
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (input.trim()) setIsOpen(true);
        }}
        placeholder="Search airport or city..."
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen && !!input.trim()}
        aria-controls="airport-list"
        aria-activedescendant={
          activeIndex >= 0
            ? `airport-option-${activeIndex}`
            : undefined
        }
      />

      {loading && <p>Loading airports...</p>}

      {error && <p className="error-message">{error}</p>}

      {isOpen && input.trim() && !loading && !error && (
        <ul id="airport-list" className="dropdown" role="listbox">
          {results.length > 0 ? (
            results.map((airport, index) => (
              <li
                key={airport.code}
                id={`airport-option-${index}`}
                role="option"
                aria-selected={activeIndex === index}
                className={
                  activeIndex === index
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(airport)}
              >
                <div className="airport-code">
                  {airport.code}
                </div>

                <div className="airport-details">
                  <strong>
                    {airport.city}, {airport.country}
                  </strong>
                  <span>{airport.name}</span>
                </div>
              </li>
            ))
          ) : (
            <li className="no-results">
              No airports match
            </li>
          )}
        </ul>
      )}

      {selectedAirport && (
        <div className="selected-result">
          <h3>Selected Airport</h3>
          <pre>
            {JSON.stringify(selectedAirport, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AirportAutocomplete;

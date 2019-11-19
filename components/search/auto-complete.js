import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { connectAutoComplete } from 'react-instantsearch-dom';
import SearchIcon from '../icons/search';

function AutoComplete({ hits, refine }) {
  const [inputValue, setValue] = useState('');
  const inputProps = {
    value: inputValue,
    type: 'search',
    placeholder: 'Search...',
    onChange: (e, { newValue }) => {
      setValue(newValue);
    }
  };

  return (
    <div className="input-container">
      <span className="icon">
        <SearchIcon />
      </span>

      <AutoSuggest
        inputProps={inputProps}
        suggestions={hits}
        onSuggestionsFetchRequested={({ value }) => refine(value)}
        onSuggestionsClearRequested={() => refine()}
        getSuggestionValue={() => inputValue}
        highlightFirstSuggestion
      />

      <style jsx>{`
        .input-container {
          position: relative;
          height: 2rem;
          display: inline-flex;
          align-items: center;
          transition: border 0.2s ease, color 0.2s ease;
          border-radius: 5px;
          border: 1px solid #333333;
        }
        .icon {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
        }
        .input-container :global(.react-autosuggest__input) {
          border: none;
          outline: 0;
          height: 100%;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

// https://www.algolia.com/doc/api-reference/widgets/autocomplete/react/
export default connectAutoComplete(AutoComplete);

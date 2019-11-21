import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { connectAutoComplete } from 'react-instantsearch-dom';
import cn from 'classnames';
import SearchIcon from '../icons/search';
import Suggestion from './suggestion';
import NoResults from './no-results';

function renderSuggestion(hit) {
  return <Suggestion hit={hit} />;
}

function AutoComplete({ hits, refine, onSearchStart, onSearchClear, mobile }) {
  const [inputValue, setValue] = useState('');
  const [hasFocus, setFocus] = useState(false);
  const onFocus = () => {
    setFocus(!hasFocus);
  };
  const inputProps = {
    value: inputValue,
    type: 'search',
    placeholder: 'Search...',
    onChange: (e, { newValue }) => {
      setValue(newValue);
    },
    onBlur: onFocus,
    onFocus
  };

  return (
    <div className={cn('input-container', { focused: hasFocus, mobile })}>
      <span className="icon">
        <SearchIcon />
      </span>

      <AutoSuggest
        inputProps={inputProps}
        suggestions={hits}
        renderSuggestion={renderSuggestion}
        onSuggestionsFetchRequested={({ value }) => {
          if (onSearchStart) onSearchStart();
          refine(value);
        }}
        onSuggestionsClearRequested={() => {
          if (onSearchClear) onSearchClear();
          refine();
        }}
        getSuggestionValue={() => inputValue}
        highlightFirstSuggestion
      />

      <NoResults />

      <style jsx>{`
        .input-container {
          width: 100%;
          height: 2rem;
          display: inline-flex;
          align-items: center;
          transition: border 0.2s ease;
          border-radius: 5px;
          border: 1px solid #d8d8d8;
        }
        .input-container.focused {
          border: 1px solid #888888;
        }
        .input-container.focused > .icon :global(svg) {
          fill: #888888;
        }
        .icon {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
        }
        .icon :global(svg) {
          fill: #d8d8d8;
          transition: fill 0.2s ease;
        }
        .input-container :global(.react-autosuggest__input) {
          width: 100%;
          height: 100%;
          font-size: 0.875rem;
          border: none;
          outline: 0;
          padding-right: 1rem;
        }
        .mobile :global(.react-autosuggest__suggestions-container) {
          max-height: none;
        }
        .mobile :global(.react-autosuggest__suggestions-container--open) {
          top: 113px;
          bottom: calc(153px - 100vh);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .mobile :global(.react-autosuggest__suggestions-list) {
          height: auto;
        }
        .mobile :global(.react-autosuggest__suggestion) {
          padding-left: 0.75rem;
        }
      `}</style>
      <style jsx global>{`
        .react-autosuggest__container {
          display: flex;
          width: 100%;
        }
        .react-autosuggest__suggestion mark {
          color: #000;
          font-weight: 500;
          background: yellow;
        }
        .react-autosuggest__suggestions-container {
          display: none;
          max-height: calc(100vh - 144px);
          overflow-y: auto;
          padding-bottom: 1.5rem;
        }
        .react-autosuggest__suggestions-container--open {
          display: block;
          position: absolute;
          width: 100%;
          top: 3rem;
          left: 0;
          background: #fff;
        }
        .react-autosuggest__suggestions-list {
          margin: 0;
          padding: 0;
          list-style-type: none;
          overflow-y: auto;
        }
        .react-autosuggest__suggestion {
          cursor: pointer;
          padding-right: 0.75rem;
        }
        .react-autosuggest__suggestion a {
          text-decoration: none;
          color: black;
          border-radius: 4px;
          display: block;
          padding: 0.75rem;
          border: 1px solid transparent;
        }
        .react-autosuggest__suggestion--highlighted a {
          background: #fafafa;
          border-color: #d8d8d8;
        }
        .react-autosuggest__suggestion--highlighted a span {
          color: #000;
        }
      `}</style>
    </div>
  );
}

// https://www.algolia.com/doc/api-reference/widgets/autocomplete/react/
export default connectAutoComplete(AutoComplete);

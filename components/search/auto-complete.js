import { useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { connectAutoComplete } from 'react-instantsearch-dom';
import SearchIcon from '../icons/search';

function AutoComplete({ hits, refine }) {
  const [inputValue, setValue] = useState('');
  const inputProps = {
    value: inputValue,
    type: 'search',
    onChange: (e, { newValue }) => {
      setValue(newValue);
    }
  };

  return (
    <span className="input-container">
      <span className="search__search-placeholder">
        <SearchIcon />
        <span>Search...</span>
      </span>

      <AutoSuggest
        inputProps={inputProps}
        suggestions={hits}
        onSuggestionsFetchRequested={({ value }) => refine(value)}
        onSuggestionsClearRequested={() => refine()}
        getSuggestionValue={() => inputValue}
        highlightFirstSuggestion
      />
    </span>
  );
}

// https://www.algolia.com/doc/api-reference/widgets/autocomplete/react/
export default connectAutoComplete(AutoComplete);

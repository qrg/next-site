import { useState, useEffect, useCallback } from 'react';
import AutoSuggest from 'react-autosuggest';
import { connectAutoComplete } from 'react-instantsearch-dom';
import { useRouter } from 'next/router';
import cn from 'classnames';
import SearchIcon from '../icons/search';
import Suggestion, { getHitLinkProps } from './suggestion';
import NoResults from './no-results';

function renderSuggestion(hit) {
  return <Suggestion hit={hit} />;
}

function AutoComplete({ id, isMobile, hits, refine, onSearchStart, onSearchClear, containerRef }) {
  const [inputValue, setValue] = useState('');
  const [hasFocus, setFocus] = useState(false);
  const router = useRouter();
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
  const renderSuggestionsContainer = useCallback(
    ({ containerProps, children }) => {
      const { ref, ...props } = containerProps;
      const newRef = element => {
        if (containerRef) containerRef.current = element;
        ref(element);
      };
      return (
        <div ref={newRef} {...props}>
          {children}
        </div>
      );
    },
    [containerRef]
  );

  // Close the search after a page navigation
  useEffect(() => {
    if (inputValue) setValue('');
  }, [router.asPath]);

  return (
    <div className={cn('input-container', { focused: hasFocus })}>
      <span className="icon">
        <SearchIcon />
      </span>

      <AutoSuggest
        id={id}
        inputProps={inputProps}
        suggestions={hits}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionsFetchRequested={({ value }) => {
          if (value && onSearchStart) {
            onSearchStart();
          }
          // Call onSearchClear if the input becomes empty, even if it still has focus
          if (!value && inputValue && onSearchClear) {
            onSearchClear();
          }
          refine(value);
        }}
        onSuggestionsClearRequested={() => {
          // On mobile, only clear Algolia suggestions if the input is empty
          if (!isMobile || !inputValue) {
            if (onSearchClear) onSearchClear();
            refine();
          }
        }}
        onSuggestionSelected={(e, { suggestion, method }) => {
          if (method === 'enter') {
            const { href, as } = getHitLinkProps(suggestion);
            router.push(href, as);
          }
        }}
        getSuggestionValue={() => inputValue}
        alwaysRenderSuggestions={isMobile}
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

        @media screen and (max-width: 960px) {
          .input-container :global(.react-autosuggest__input),
          .input-container :global(.no-results) {
            font-size: 1rem;
          }
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
          top: 3.5rem;
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

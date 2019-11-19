import { InstantSearch, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import AutoComplete from './auto-complete';

const searchClient = algoliasearch('NNTAHQI9C5', 'ac5d89f9877f9fb09dbdc9a010cca761');

export default function Search() {
  return (
    <InstantSearch indexName="nextjs_docs" searchClient={searchClient}>
      <Configure hitsPerPage={8} />
      <AutoComplete />
    </InstantSearch>
  );
}

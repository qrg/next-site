import { InstantSearch, Configure } from 'react-instantsearch-dom';
import AlgoliaClient from '../../lib/algolia-client';
import AutoComplete from './auto-complete';

const searchClient = new AlgoliaClient();

export default function Search(props) {
  return (
    <InstantSearch indexName="nextjs_docs" searchClient={searchClient}>
      <Configure hitsPerPage={8} />
      <AutoComplete {...props} />
    </InstantSearch>
  );
}

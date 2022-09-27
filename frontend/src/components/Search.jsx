import { useState } from 'react';
import { searchCoin } from '../utils/fetchFromApi';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCoin(search).then((data) => onSearch(data));
    setSearch('');
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};
export default Search;

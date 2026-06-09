import React, { useState, useRef } from 'react';

interface SearchProps {
    setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSearchQuery }) => {
    const [query, setQuery] = useState('');
    const referenciaSearch = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setSearchQuery(newQuery);
    };

    const handleSearch = () => {
        referenciaSearch.current?.focus();
        setSearchQuery(query);
    };

    return (
        <form onSubmit={handleSearch}>
            <input type="text" onChange={handleInputChange} placeholder="Name..." />
            <input ref={referenciaSearch} type="text" value={query} onChange={handleInputChange} placeholder="Search..." />
            <button>Search</button>
        </form>
    );
};

export default Search;
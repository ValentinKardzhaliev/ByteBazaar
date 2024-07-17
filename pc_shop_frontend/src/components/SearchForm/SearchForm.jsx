import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchingOption = formData.get('search_form');

        if (searchingOption === '') {
            document.getElementById('search_form').value = '';
        } else {
            navigate(`/search/${searchingOption}`);
            document.getElementById('search_form').value = '';
        }
    };

    return (
        <form onSubmit={searchHandler}>
            <label htmlFor="search_form" className="sr-only">
                Search
            </label>
            <input
                type="text"
                id="search_form"
                name="search_form"
                placeholder="Search..."
            />
            {/* <button type="submit">
                <span>Search</span>
            </button> */}
        </form>
    );
}

export default SearchForm;

import { useContext } from 'react';
import backgroundImage from '../../assets/images/search_bar_background.jpg'
import ProductContext from '../../contexts/ProductContext.jsx';
import ProductBar from '../ProductBar/ProductBar.jsx';

import './SearchBar.css'

function SearchBar() {
    const { setOptionForProducts } = useContext(ProductContext);

    const searchHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchingOption = formData.get('search_form');
        setOptionForProducts(searchingOption);
        document.getElementById('search_form').value = '';
    }

    return (
        <div className="search-bar-section">
            <img src={backgroundImage} alt="search_bar_background" />
            <div className="center-text">
                <b>What are you looking for?</b>
            </div>
            <div className="form-content">
                <form onSubmit={searchHandler}>
                    <label htmlFor="search_form" className="sr-only">
                        Search
                    </label>
                    <br />
                    <input
                        type="text"
                        id="search_form"
                        name="search_form"
                        placeholder="Search..."
                    />
                    <button type="submit">
                        <span>Search</span>
                    </button>
                </form>
            </div>
            <ProductBar />
        </div>
    )
}


export default SearchBar;
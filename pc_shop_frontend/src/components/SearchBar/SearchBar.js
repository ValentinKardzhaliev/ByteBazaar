import backgroundImage from '../../images/search_bar_background.jpg'
import ProductBar from '../ProductBar/ProductBar';

import './SearchBar.css'

function SearchBar(props) {

    const searchHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchingOption = formData.get('search_form');
        props.setOptionForProducts(searchingOption);
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
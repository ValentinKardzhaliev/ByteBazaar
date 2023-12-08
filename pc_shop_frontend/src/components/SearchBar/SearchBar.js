import backgroundImage from '../../images/search_bar_background.jpg'
import ProductBar from '../ProductBar/ProductBar';
import './SearchBar.css'

function SearchBar() {

    return (
        <div className="search-bar-section">
            <img src={backgroundImage} alt="search_bar_background" />
            <div className="center-text">
                <b>What are you looking for?</b>
            </div>
            <div className="form-content">
                <form>
                    <label htmlFor="search-input" className="sr-only">
                        Search
                    </label>
                    <br />
                    <input
                        type="text"
                        id="search-input"
                        name="search"
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
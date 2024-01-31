import backgroundImage from '../../assets/images/search_bar_background.jpg'
import ProductBar from '../ProductBar/ProductBar.jsx';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'


function SearchBar() {
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
import backgroundImage from '../../assets/images/home-page-first-image.jpg'
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
        <div className="first-image-container">
            <img src={backgroundImage} alt="first-image" className='home-page-first-image'/>
        </div>

    )
}


export default SearchBar;
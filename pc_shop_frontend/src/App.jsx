import './App.css';
import Header from './components/Header/Header.jsx';
import ProductList from './components/ProductList/ProductList.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import { ProductPrider } from './contexts/ProductContext.jsx';

function App() {
    return (
        <>
            <Header />
            <ProductPrider>
                <SearchBar />
                <h1 className='topOffers'>TOP OFFERS!!!</h1>
                <ProductList />
            </ProductPrider>
        </>

    );
}

export default App;
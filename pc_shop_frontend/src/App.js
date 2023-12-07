import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import SearchBar from './components/SearchBar/SearchBar';

import { useState, useEffect } from 'react';
function App() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('http://127.0.0.1:8000/')
            .then(res => res.json())
            .then(result => {
                setProducts(result);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Header />
            <SearchBar />
            <h1 className='topOffers'>TOP OFFERS!!!</h1>
            <ProductList products={products} />
        </>

    );
}

export default App;

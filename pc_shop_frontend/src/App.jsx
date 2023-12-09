import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.jsx';
import ProductList from './components/ProductList/ProductList.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';
import Login from './components/Login/Login.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Logout from './components/Logout/Logout.jsx';

function App() {
    return (
        <>
            <AuthProvider>
                <Header />

                <Routes>
                    <Route path='/' element={
                        <ProductProvider>

                            <SearchBar />
                            <h1 className='topOffers'>TOP OFFERS!!!</h1>
                            <ProductList />
                        </ProductProvider>
                    } />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />

                </Routes>
            </AuthProvider>

        </>

    );
}

export default App;
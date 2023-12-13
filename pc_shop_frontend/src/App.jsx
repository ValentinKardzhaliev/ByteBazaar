import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.jsx';
import ProductList from './components/ProductList/ProductList.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';
import Login from './components/Login/Login.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Logout from './components/Logout/Logout.jsx';
import IsLoggedIn from './components/common/IsLoggedIn.jsx';
import Register from './components/Register/Register.jsx';
import Cart from './components/Cart/Cart.jsx';
import IsNotLoggedIn from './components/common/IsNotLoggedIn.jsx';
import SearchProductList from './components/SearchProductList/SearchProductList.jsx';

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <ProductProvider>

                    <Routes>
                        <Route path='/' element={
                            <>
                                <SearchBar />
                                <h1 className='topOffers'>TOP OFFERS!!!</h1>
                                <ProductList />
                            </>
                        } />
                        <Route path='/search/:searchParams' element={
                            <>
                                <SearchBar />
                                <h1 className='topOffers'>TOP OFFERS!!!</h1>
                                <SearchProductList />
                            </>
                        } />
                        <Route element={<IsLoggedIn />}>
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />

                        </Route>
                        <Route element={<IsNotLoggedIn />}>
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/logout' element={<Logout />} />
                        </Route>
                    </Routes>
                </ProductProvider>
            </AuthProvider>

        </>

    );
}

export default App;
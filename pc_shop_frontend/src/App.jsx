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
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import ComputerList from './components/ComputerList/ComputerList.jsx';
import MonitorList from './components/MonitorList/MonitorList.jsx';
import KeyboardList from './components/KeyboardList/KeyboardList.jsx';
import { LoadingProvider } from './contexts/LoadingContext.jsx';
import UserLikedProducts from './components/UserLikedProducts/UserLikedProducts.jsx';

function App() {
    return (
        <>
            <LoadingProvider>
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
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/computers' element={
                                <ComputerList />
                            } />
                            <Route path='/monitors' element={
                                <MonitorList />
                            } />
                            <Route path='/keyboards' element={
                                <KeyboardList />
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
                                <Route path='/likes' element={<UserLikedProducts />} />
                                <Route path='/logout' element={<Logout />} />
                            </Route>
                            <Route path='/products/:typeOfProduct/:productId' element={< ProductDetails />} />
                        </Routes>
                    </ProductProvider>
                </AuthProvider>
            </LoadingProvider>
        </>

    );
}

export default App;
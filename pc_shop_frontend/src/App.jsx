import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.jsx';
import ProductList from './components/ProductList/ProductList.jsx';
import HomePageImage from './components/HomePageImage/HomePageImage.jsx';
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
import { LoadingProvider } from './contexts/LoadingContext.jsx';
import UserLikedProducts from './components/UserLikedProducts/UserLikedProducts.jsx';
import CatalogList from './components/CatalogList/CatalogList.jsx';

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
                                    <HomePageImage />
                                    <h1 className='topOffers'>TOP OFFERS!!!</h1>
                                    <ProductList />
                                </>
                            } />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/catalog/:category' element={
                                <CatalogList />
                            } />
                            <Route path='/search/:searchParams' element={
                                <>
                                    <HomePageImage />
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
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
import Footer from './components/Footer/Footer.jsx';


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
                                    <div className="trending-offers-container">
                                        <p className='trending-offers'>Trending Offers</p>
                                    </div>
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

                        <Footer />

                    </ProductProvider>
                </AuthProvider>
            </LoadingProvider>
        </>

    );
}

export default App;
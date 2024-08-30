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
import CheckoutPage from './components/CheckoutPage/CheckoutPage.jsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.jsx';
import UserOrders from './components/UserOrders/UserOrders.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.jsx';
import ChangePassword from './components/ChangePassword/ChangePassword.jsx';
import ChangeEmail from './components/ChangeEmail/ChangeEmail.jsx';
import { HeaderMenuProvider } from './contexts/HeaderMenuContext.jsx';
import Container from './components/Container/Container.jsx';
import { RouterProvider } from './contexts/RouterContext.jsx';
import { LikedProductsProvider } from './contexts/LikedProductsContext.jsx';
import HomePage from './components/HomePage/HomePage.jsx';

function App() {
    return (
        <>
            <HeaderMenuProvider>
                <LoadingProvider>
                    <AuthProvider>
                        <Header />
                        <Container>
                            <ProductProvider>
                                <RouterProvider>
                                    <LikedProductsProvider>
                                        <Routes>
                                            <Route path='/' element={<HomePage />} />
                                            <Route path='/cart' element={<Cart />} />
                                            <Route path='/checkout' element={<CheckoutPage />} />
                                            <Route path="/orders" element={<UserOrders />} />
                                            <Route path='/catalog/:category' element={<CatalogList />} />
                                            <Route path='/search/:searchParams' element={
                                                <>
                                                    <HomePageImage />
                                                    <SearchProductList />
                                                </>
                                            } />
                                            <Route element={<IsNotLoggedIn />}>
                                                <Route path='/login' element={<Login />} />
                                                <Route path='/register' element={<Register />} />
                                            </Route>
                                            <Route element={<IsLoggedIn />}>
                                                <Route path='/likes' element={<UserLikedProducts />} />
                                                <Route path='/logout' element={<Logout />} />
                                                <Route path='/profile/*' element={<ProfilePage />} />
                                                <Route path="/change-password" element={<ChangePassword />} />
                                                <Route path="/change-email" element={<ChangeEmail />} />
                                            </Route>
                                            <Route path='/products/:typeOfProduct/:productId' element={< ProductDetails />} />
                                            <Route path='*' element={<NotFoundPage />} />

                                        </Routes>

                                        <Footer />
                                    </LikedProductsProvider>
                                </RouterProvider>
                            </ProductProvider>
                        </Container>
                    </AuthProvider>
                </LoadingProvider>
            </HeaderMenuProvider>
        </>

    );
}

export default App;
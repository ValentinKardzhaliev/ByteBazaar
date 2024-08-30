import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faBackward } from "@fortawesome/free-solid-svg-icons";
import { characteristicsLogic } from "../../utils/characteristicsLogic";
import { addToCart, addToCartForGuest } from "../../services/cartService";
import { getAllLikedProductsForUser } from "../../services/likeService";
import { getProductByTypeAndId } from "../../services/productService";
import "./ProductDetails.css";
import AuthContext from "../../contexts/AuthContext";
import LikedProductsContext from "../../contexts/LikedProductsContext";
import ProductContext from "../../contexts/ProductContext";
import { RouterContext } from "../../contexts/RouterContext";


function ProductDetails() {
    const { user } = useContext(AuthContext);
    const { products } = useContext(ProductContext);
    const { handleLike, likedProducts } = useContext(LikedProductsContext);
    const { typeOfProduct, productId } = useParams();
    const [product, setProduct] = useState({});
    const [imagePath, setImagePath] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImagePath, setModalImagePath] = useState('');
    const [characteristics, setCharacteristics] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [placeOfImage, setPlaceOfImage] = useState(0);
    let route = useContext(RouterContext);

    let addProductToCart;

    if (likedProducts?.length === 0) {
        products.map((likedProduct) => likedProduct.isLiked = false);
    }

    if (user.token) {
        useEffect(() => {
            Promise.all([
                getProductByTypeAndId(typeOfProduct, productId),
                getAllLikedProductsForUser(user.token)
            ]).then(([product, likedResult]) => {
                setProduct(product);
                setCharacteristics(characteristicsLogic(product));
                setProductImages(product.images);
                setCurrentImages(product.images.slice(0, 5));

                if (product.images && product.images.length > 0) {
                    setImagePath(`https://bytebazaar.pythonanywhere.com/${product.images[0].image}`);
                }
                setIsLiked(likedResult.liked_products.some((likedProduct) => likedProduct._id === product._id));
            }).catch((err) => console.log(err));
        }, [typeOfProduct, productId, user.token]);

        addProductToCart = function () {
            addToCart(product._id, user.token).then(result => {
                alert('You have successfully added a product to your cart!')
                console.log(result);
            }).catch(err => console.log(err))
        }
    } else {
        useEffect(() => {
            getProductByTypeAndId(typeOfProduct, productId)
                .then((product) => {
                    setProduct(product);
                    setCharacteristics(characteristicsLogic(product));
                    setProductImages(product.images);
                    setCurrentImages(product.images.slice(0, 5));

                    if (product.images && product.images.length > 0) {
                        setImagePath(`https://bytebazaar.pythonanywhere.com/${product.images[0].image}`);
                    }
                })
                .catch((err) => console.log(err));
        }, [typeOfProduct, productId]);
        addProductToCart = function () {
            addToCartForGuest(product._id).then(result => {
                alert('You have successfully added a product to your cart!')
                console.log(result);
            }).catch(err => console.log(err))
        }

    }

    const handleLikeDetails = (e) => {
        handleLike(e, product);
        setIsLiked(prev => !prev);
    };

    function handleNext() {
        if (productImages.length > currentImages.length) {
            setCurrentImages(productImages.slice(placeOfImage + 1, placeOfImage + 6));
            setPlaceOfImage(prev => prev + 1);
        }
    }

    function changeImageWhenClick(e) {
        e.preventDefault();
        setImagePath(e.target.src);
    }

    function handlePrev() {
        let index = placeOfImage - 1;
        setCurrentImages(productImages.slice(index, index + 5));
        setPlaceOfImage(prev => prev - 1);
    }

    function openModal(modalImagePath) {
        setModalImagePath(modalImagePath);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleModalNext(e) {
        let indexOfModalImage;
        const imgElement = e.target.parentNode.parentNode.getElementsByTagName('img')[0];
        const splitedPath = imgElement.src.split('https://bytebazaar.pythonanywhere.com/');
        const currentModalImage = productImages.find((currentImage) => currentImage.image == splitedPath[1])
        productImages.forEach((image, i) => {
            if (image.image == currentModalImage.image) {
                indexOfModalImage = i;
            }
        })
        if (indexOfModalImage + 1 >= productImages.length) {
            indexOfModalImage = 0;
        } else {
            indexOfModalImage += 1;
        }
        setModalImagePath('https://bytebazaar.pythonanywhere.com/' + productImages[indexOfModalImage].image);
    }

    function handleModalPrev(e) {
        let indexOfModalImage;
        const imgElement = e.target.parentNode.parentNode.getElementsByTagName('img')[0];
        const splitedPath = imgElement.src.split('https://bytebazaar.pythonanywhere.com/');
        const currentModalImage = productImages.find((currentImage) => currentImage.image == splitedPath[1])
        productImages.forEach((image, i) => {
            if (image.image == currentModalImage.image) {
                indexOfModalImage = i;
            }
        })
        if (indexOfModalImage - 1 < 0) {
            indexOfModalImage = productImages.length - 1;
        } else {
            indexOfModalImage -= 1;
        }
        setModalImagePath('https://bytebazaar.pythonanywhere.com/' + productImages[indexOfModalImage].image);
    }

    const { images, name, _id, type, price, description, is_available, created_at, modified_at,
        ...productWithoutSpecificProperties } = product;

    const productKeys = Object.keys(productWithoutSpecificProperties);

    useEffect(() => {
        const handleViewFullCharacteristics = (e) => {
            e.preventDefault();
            const fullCharacteristicsSection = document.querySelector("#fullCharacteristics");
            const h2Element = fullCharacteristicsSection.querySelector("h1");
            const headerHeight = document.querySelector("header").offsetHeight;

            window.scrollTo({
                top: h2Element.offsetTop - headerHeight - 20,
                behavior: "smooth",
            });
        };

        const fullCharacteristicsLink = document.querySelector(".full-characteristics-link");
        fullCharacteristicsLink.addEventListener("click", handleViewFullCharacteristics);

        return () => {
            fullCharacteristicsLink.removeEventListener("click", handleViewFullCharacteristics);
        };
    }, []);


    return (
        <>
            <span id="pathProfile">
                <Link className='mainPage' to={'/'}>Main page</Link> {'>'} Details {'>'} {product.name}
            </span>
            <div className="product-details-page-container">
                <div className="product-images">
                    <div className="main-image-container" onClick={() => openModal(imagePath)}>
                        <img src={imagePath} alt="Product Image" id="main-image" />
                    </div>
                    <div className="image-slider">
                        {placeOfImage !== 0 ?
                            <i className="fa-solid fa-less-than" onClick={handlePrev}></i>
                            : <></>
                        }
                        {currentImages &&
                            currentImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={`https://bytebazaar.pythonanywhere.com/${image.image}`}
                                    alt={`Product Image`}
                                    onClick={(e) => changeImageWhenClick(e)}
                                />
                            ))}
                        {
                            currentImages[currentImages.length - 1] !== productImages[productImages.length - 1] ?
                                <i id='rightArrow' className="fa-solid fa-greater-than" onClick={handleNext} />
                                : <></>
                        }
                    </div>
                </div>

                <div className="product-details-detailsPage">
                    <h1 className="product-name-detailsPage">{product.name}</h1>
                    <h2 className="product-basic-detailsPage">Basic Characteristics</h2>
                    <div className="product-details-characteristics">

                        {Array.isArray(characteristics[typeOfProduct]) && characteristics[typeOfProduct].map((c, index) => (
                            <p key={index}>{c}</p>
                        ))}
                    </div>
                    <p align="right" className="price">
                        <a align="left" href="#fullCharacteristics" className="full-characteristics-link">
                            View Full Characteristics
                        </a>
                        Price: <span className="colorRedPrice">{product.price}$</span></p>
                    <hr className="characteristics-price-divider" />

                    <p className="items-container">
                        {user.token ? <div className="AddToFav">Add to favourites</div> : <div className="AddToFav">Add to cart</div>}

                        {user.token
                            ?
                            <>
                                {isLiked ? <svg className="heartMargin" onClick={(e) => handleLikeDetails(e)} width="48" height="43" viewBox="0 0 48 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M41.9009 4.39226L41.9001 4.39152C36.7304 -0.0439594 29.1466 0.823796 24.5366 5.61214C24.5365 5.61227 24.5364 5.6124 24.5362 5.61253C24.5361 5.61264 24.536 5.61274 24.5359 5.61285L24.0006 6.16823L23.4663 5.61392C23.4659 5.61354 23.4656 5.61315 23.4652 5.61276C18.8624 0.822867 11.27 -0.043313 6.10114 4.39152L6.10027 4.39226C0.285379 9.38906 -0.0131035 18.3297 5.18412 23.7392L5.18475 23.7398L21.0575 40.2408L21.0578 40.2411C22.6732 41.9196 25.3198 41.9196 26.9352 40.2411L26.9355 40.2408L42.808 23.7401C42.8081 23.74 42.8082 23.7399 42.8083 23.7398C48.0145 18.3302 47.7159 9.38909 41.9009 4.39226Z" fill="#C00000" stroke="#C00000" strokeWidth={2} />
                                </svg> :
                                    <svg className="heartMargin" onClick={(e) => handleLikeDetails(e)} width="48" height="43" viewBox="0 0 48 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.9009 4.39226L41.9001 4.39152C36.7304 -0.0439594 29.1466 0.823796 24.5366 5.61214C24.5365 5.61227 24.5364 5.6124 24.5362 5.61253C24.5361 5.61264 24.536 5.61274 24.5359 5.61285L24.0006 6.16823L23.4663 5.61392C23.4659 5.61354 23.4656 5.61315 23.4652 5.61276C18.8624 0.822867 11.27 -0.043313 6.10114 4.39152L6.10027 4.39226C0.285379 9.38906 -0.0131035 18.3297 5.18412 23.7392L5.18475 23.7398L21.0575 40.2408L21.0578 40.2411C22.6732 41.9196 25.3198 41.9196 26.9352 40.2411L26.9355 40.2408L42.808 23.7401C42.8081 23.74 42.8082 23.7399 42.8083 23.7398C48.0145 18.3302 47.7159 9.38909 41.9009 4.39226Z" stroke="#666666" strokeWidth={2} />
                                    </svg>
                                }
                                <button className="buy-button" onClick={addProductToCart}>Add to Cart</button>
                            </>
                            :
                            <button className="buy-button" onClick={addProductToCart}>Add to Cart</button>
                        }
                    </p>
                </div>
            </div>

            <hr className="characteristics-divider" />

            <div className="full-characteristics" id="fullCharacteristics">
                <h1>Full Characteristics</h1>
                <div className="characteristics-table">
                    <table className="product-table">
                        <tbody>
                            {productKeys.map((key, index) => (
                                <tr key={key} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                    <td>{key}</td>
                                    <td>
                                        {productWithoutSpecificProperties[key] === false ? <span><FontAwesomeIcon
                                            icon={faX}
                                            className="product-details-x-icon"
                                        /></span> :
                                            productWithoutSpecificProperties[key] === true ? <span><FontAwesomeIcon
                                                icon={faCheck}
                                                className="product-details-check-icon"
                                            /></span> :
                                                <span>{productWithoutSpecificProperties[key]}</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={modalImagePath} alt={`Product Image`} />
                    <div className="modal-navigation">
                        <span className="prev" onClick={(e) => handleModalPrev(e)}>&#10094;</span>
                        <span className="next" onClick={(e) => handleModalNext(e)}>&#10095;</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetails;
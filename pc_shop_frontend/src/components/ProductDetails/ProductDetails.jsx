import React, { useEffect, useState, useContext } from "react";
import { addToCart, addToCartForGuest } from "../../services/cartService";
import { getAllLikedProductsForUser, likeProduct } from "../../services/likeService";
import { getProductByTypeAndId } from "../../services/productService";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { characteristicsLogic } from "../../utils/characteristicsLogic";
import AuthContext from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCheck, faX } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
    window.scrollTo(0, 0);
    const { user } = useContext(AuthContext);

    const { typeOfProduct, productId } = useParams();
    const [product, setProduct] = useState({});
    const [imagePath, setImagePath] = useState("");
    const [isLiked, setIsLiked] = useState(false);

    let addProductToCart;

    if (user.token) {
        useEffect(() => {
            Promise.all([
                getProductByTypeAndId(typeOfProduct, productId),
                getAllLikedProductsForUser(user.token)
            ]).then(([productResult, likedResult]) => {
                setProduct(productResult);
                setProductImages(productResult.images);
                setCurrentImages(productResult.images.slice(0, 5));

                if (productResult.images && productResult.images.length > 0) {
                    setImagePath(`${productResult.images[0].image}`);
                }
                setIsLiked(likedResult.liked_products.some((likedProduct) => likedProduct._id === productResult._id));
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
                .then((result) => {
                    setProduct(result);
                    setProductImages(result.images);
                    setCurrentImages(result.images.slice(0, 5));

                    // Set imagePath to the first image in the product.images array
                    if (result.images && result.images.length > 0) {
                        setImagePath(`${result.images[0].image}`);
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

    const handleLike = () => {
        setIsLiked(prevIsLiked => !prevIsLiked)
        likeProduct(product._id, user.token).then(result => {
            console.log(result);
        }).catch(err => console.log(err));
    };

    const [productImages, setProductImages] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [placeOfImage, setPlaceOfImage] = useState(0);

    function handleNext() {
        if (productImages.length >= currentImages.length) {
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
    let characteristics = characteristicsLogic({ product });
    const { images, name, _id, type, price, description, is_available, created_at, modified_at,
        ...productWithoutSpecificProperties } = product;

    const productKeys = Object.keys(productWithoutSpecificProperties);

    useEffect(() => {
        // Event listener for the 'View Full Characteristics' link
        const handleViewFullCharacteristics = (e) => {
            e.preventDefault();
            const fullCharacteristicsSection = document.querySelector("#fullCharacteristics");
            const h2Element = fullCharacteristicsSection.querySelector("h2");
            const headerHeight = document.querySelector("header").offsetHeight;

            window.scrollTo({
                top: h2Element.offsetTop - headerHeight - 20,
                behavior: "smooth",
            });
        };

        // Adding the event listener when the component mounts
        const fullCharacteristicsLink = document.querySelector(".full-characteristics-link");
        fullCharacteristicsLink.addEventListener("click", handleViewFullCharacteristics);

        // Cleaning up the event listener when the component unmounts
        return () => {
            fullCharacteristicsLink.removeEventListener("click", handleViewFullCharacteristics);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <>
            <hr />
            <div className="product-details-page-container">
                <div className="product-images">
                    <div className="main-image-container">
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
                                    src={`${image.image}`}
                                    alt={`Product Image ${index}`}
                                    onClick={(e) => changeImageWhenClick(e)}
                                />
                            ))}
                        {
                            currentImages[currentImages.length - 1] !== productImages[productImages.length - 1] ?
                                <i className="fa-solid fa-greater-than" onClick={handleNext} />
                                : <></>
                        }
                    </div>
                </div>

                <div className="product-details-detailsPage">
                    <h1 className="product-name-detailsPage">{product.name}</h1>

                    <div className="characteristics">
                        <h2>Basic Characteristics</h2>
                        {characteristics[typeOfProduct].map((c, index) => <p key={index}>{c}</p>)}

                    </div>
                    <a href="#fullCharacteristics" className="full-characteristics-link">
                        View Full Characteristics
                    </a>
                    <hr className="characteristics-price-divider"/>

                    <p className="price-container">
                        <span className="price">Price: {product.price}$</span>
                        {user.token
                            ?
                            <>
                                <button className="buy-button" onClick={addProductToCart}>Add to Cart</button>


                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`like-button ${isLiked ? "liked" : ""}`}
                                    onClick={handleLike}
                                />

                            </>
                            :
                            <button className="buy-button" onClick={addProductToCart}>Add to Cart</button>
                        }
                    </p>
                </div>
            </div>

            <hr className="characteristics-divider" />

            <div className="full-characteristics" id="fullCharacteristics">

                <h2>Full Characteristics</h2>

                {/* <p><strong>Description: </strong>{product.description}</p> */}

                <div className="characteristics-table">
                    <table className="product-table">
                        <tbody>
                            {/* Iterating over all keys and displaying key-value pairs */}
                            {productKeys.map((key, index) => (
                                <tr key={key} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                    <td><strong>{key}</strong></td>
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
        </>
    );
}

export default ProductDetails;
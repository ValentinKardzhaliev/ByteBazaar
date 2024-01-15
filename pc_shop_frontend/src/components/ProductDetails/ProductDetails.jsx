import React, { useEffect, useState } from "react";
import { getProductByTypeAndId } from "../../services/productService";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
    window.scrollTo(0, 0);

    const { typeOfProduct, productId } = useParams();
    const [product, setProduct] = useState({});
    const [imagePath, setImagePath] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showLessThanIcon, setShowLessThanIcon] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [placeOfImage, setPlaceOfImage] = useState(0);

    // 0, 1, 2, 3, 4, 5, 6, 7, 8
    // 1, 2, 3, 4, 5
    useEffect(() => {
        getProductByTypeAndId(typeOfProduct, productId)
            .then((result) => {
                setProduct(result);
                setProductImages(result.images);
                setCurrentImages(result.images.slice(0, 5));

                // Set imagePath to the first image in the product.images array
                if (result.images && result.images.length > 0) {
                    setImagePath(`http://localhost:8000${result.images[0].image}`);
                }
            })
            .catch((err) => console.log(err));
    }, [typeOfProduct, productId]);

    function changeImage(index) {
        // Set the imagePath based on the selected index
        setImagePath(`http://localhost:8000${product.images[index].image}`);
    }

    function handleNext() {
        // Increment the currentIndex
        setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);

        if (productImages.length >= currentImages.length) {
            setCurrentImages(productImages.slice(placeOfImage + 1, placeOfImage + 6));
            setPlaceOfImage(prev => prev + 1);
        }

        // Change the image
        // changeImage(currentIndex);

    }
    function changeImageWhenClick(e) {
        e.preventDefault();
        setImagePath(e.target.src);
    }

    // function handlePrev() {
    //     // Decrement the currentIndex
    //     setCurrentIndex((prevIndex) => {
    //         const newIndex =
    //             prevIndex === 0 ? product.images.length - 1 : prevIndex - 1;
    //         setShowLessThanIcon(newIndex > 0);
    //         return newIndex;
    //     });

    //     // Change the image
    //     changeImage(currentIndex);
    // }
    function handleLessThan() {
        // Scroll to the first image and set currentIndex to 0
        // setCurrentIndex(0);
        // setShowLessThanIcon(false);
        // changeImage(0);
        setPlaceOfImage(placeOfImage => placeOfImage - 1);
        setCurrentImages(productImages.slice(placeOfImage, placeOfImage + 5));

    }

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
            <div className="container">
                <div className="product-images">
                    <img src={imagePath} alt="Product Image" id="main-image" />
                    <div className="image-slider">
                        {placeOfImage !== 0 ?
                            <i className="fa-solid fa-less-than" onClick={handleLessThan}></i>
                            : <></>
                        }
                        {currentImages &&
                            currentImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8000${image.image}`}
                                    alt={`Product Image ${index}`}
                                    onClick={(e) => changeImageWhenClick(e)}
                                />
                            ))}
                        {
                            currentImages[currentImages.length - 1] !== productImages[productImages.length - 1] ?
                                <i className="fa-solid fa-greater-than" onClick={handleNext}></i>
                                : <></>
                        }
                    </div>
                </div>

                <div className="product-details-detailsPage">
                    <h1 className="product-name-detailsPage">{product.name}</h1>

                    <div className="characteristics">
                        <h2>Basic Characteristics</h2>
                        <p>Intel Core i5-13400F</p>
                        <p>GeForce GTX 4060</p>
                        <p>16GB DDR4</p>
                        <p>1TB Gen4 PCIe NVMe SSD</p>
                    </div>
                    <a href="#fullCharacteristics" className="full-characteristics-link">
                        View Full Characteristics
                    </a>

                    <p className="price-container">
                        <span className="price">Price: {product.price}$</span>
                        <button className="buy-button">Add to Cart</button>
                    </p>
                </div>
            </div>

            <hr className="section-divider" />

            <div className="full-characteristics" id="fullCharacteristics">
                <h2>Full Characteristics</h2>
                <ul>
                    <li>
                        <strong>Material:</strong> High-quality fabric
                    </li>
                    <li>
                        <strong>Weight:</strong> 500g
                    </li>
                    {/* ... Add more characteristics as needed ... */}
                </ul>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id delectus odio
                    magnam minima tenetur numquam soluta! Impedit, explicabo, ipsum dolor facilis
                    nisi minima ab eveniet a quasi culpa rem voluptates!
                </p>
                {/* ... Add more content as needed ... */}
            </div>
        </>
    );
}

export default ProductDetails;

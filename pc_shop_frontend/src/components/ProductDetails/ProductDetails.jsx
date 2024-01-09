import React, { useEffect, useState } from "react";
import { getProductByTypeAndId } from "../../services/productService";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
    window.scrollTo(0, 0);

    const { typeOfProduct, productId } = useParams();
    const [product, setProduct] = useState({});
    const [imagePath, setImagePath] = useState("");

    useEffect(() => {
        getProductByTypeAndId(typeOfProduct, productId)
            .then((result) => {
                setProduct(result);

                // Set imagePath to the first image in the product.images array
                if (result.images && result.images.length > 0) {
                    setImagePath(`http://localhost:8000${result.images[0].image}`);
                }
            })
            .catch((err) => console.log(err));
    }, [typeOfProduct, productId]);

    function changeImage(imagePath) {
        setImagePath(imagePath);
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
    }, []);  // Empty dependency array means this effect runs once after the initial render

    return (
        <>
            <hr />
            <div className="container">
                <div className="product-images">
                    <img src={imagePath} alt="Product Image" id="main-image" />
                    <div className="image-slider">
                        {product.images && product.images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:8000${image.image}`}
                                alt={`Product Image ${index}`}
                                onClick={() => changeImage(`http://localhost:8000${image.image}`)}
                            />
                        ))}
                        <i class="fa-solid fa-greater-than"></i>
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
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Id delectus odio magnam minima tenetur numquam soluta! Impedit, explicabo,
                    ipsum dolor facilis nisi minima ab eveniet a quasi culpa rem voluptates!</p>
                {/* ... Add more content as needed ... */}
            </div>
        </>
    );
}

export default ProductDetails;
import React, { useContext, useEffect, useState } from "react";

import "./ProductCard.css";
import star from "../../assets/white_star.png";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContexts";

const Productcard = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {addToCart} = useContext(CartContext)
  const user = useContext(UserContext)    

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      setProducts(data.products || []); 
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  return (
    <section className="product_list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <article className="product_card" key={product.id}>
            <div className="product_image">
              {/* <NavLink to={`/product/${product.id}`}> */}
              <NavLink to={`/product/${product?._id}`}>
                <img
                src="https://e7.pngegg.com/pngimages/1008/303/png-clipart-shopping-cart-icon-product-return-shopping-cart-retail-supermarket-thumbnail.png" 
                  //src={`http://localhost:4000/api/products/${product?.images}`}
                  alt={product.title}
                />
              </NavLink>
            </div>

            <div className="product_details">
              <h3 className="product_price">${product?.price}</h3>
              <p className="product_title">{product?.model }</p>

              <footer className="align_center product_info_footer">
                <div className="align_center">
                  <p className="product_rating">
                    <img src={star} alt="Rating" /> {product?.rating}
                  </p>
                  <p className="product_review_count">
                    {product?.ratingCounts} reviews
                  </p>
                </div>

                {product?.stock > 0 ? (
                  <button className="add_to_cart" onClick={() => addToCart(product, 1)}>
                    <img src={basket} alt="Add to Cart" />
                  </button>
                ) : (
                  <p className="out_of_stock">Out of Stock</p>
                )}
              </footer>
            </div>
          </article>
        ))
      ) : (
        <p>No products available</p>
      )}
    </section>
  );
};

export default Productcard;
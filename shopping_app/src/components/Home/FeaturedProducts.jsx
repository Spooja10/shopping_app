import React from "react";

import "./FeaturedProducts.css";
import Productcard from "../Products/Productcard";
import useData from './../../hooks/useData';
import ProductCardSkeleton from "../Products/ProductCardSkeleton";



const FeaturedProducts = () => {
  const {data, error1, isLoading} = useData("/products/featured");
  const skeletons = [1, 2, 3]
  return (
    <section className="featured_products">
      <h2>Featured Products</h2>

      <div className="align_center featured_products_list">
        <Productcard />
        
        {/* {error1 && <em className='form_error'>{error1}</em>}
        { data.map(product => (
          <Productcard key={product.id} product={product} />
        ))}
        {isLoading && skeletons.map(n => <ProductCardSkeleton key={n}/>) }   */}
      </div>
    </section>
  );
};

export default FeaturedProducts;
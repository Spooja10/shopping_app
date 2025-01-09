import React from "react";

import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import useData from "../../hooks/useData";
import categoryImage from  '../../assets/star.png'
import { Link } from "react-router-dom";
//import ProductsList from './ProductsList';

const ProductsSidebar = ({ setSelectedCategory }) => {

  const { data: categories, error } = useData(
    "http://localhost:4000/api/categories"
  ); 

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>

      <div className="category_links">
        {error && <em className="form_error">{error}</em>}

        {categories && categories.map((category) => 
        <div className="category_item" key={category.name} onClick={() => setSelectedCategory(category.name)}>
           <img src={categoryImage} alt="img" width={20} height={20}/>
           <Link to={`/products?category=${category.name}`}>{category.name}</Link>
            {/* <Link to={category}>{category.name}</Link> */}
            
        </div>)}
      </div>

    </aside>

  );
};

export default ProductsSidebar;

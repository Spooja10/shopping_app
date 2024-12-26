// import React from 'react'

// import apiClient from '../../utils/api-client'
// import  './ProductsSidebar.css'
// import rocket from '../../assets/rocket.png'
// import rocket_1 from '../../assets/rocket.png'
// import rocket_2 from '../../assets/rocket.png'
// import rocket_3 from '../../assets/rocket.png'
// import rocket_4 from '../../assets/rocket.png'
// import LinkWithIcon from '../Navbar/LinkWithIcon'
// import useData from '../../Hooks/useData'

// const ProductsSidebar = () => {
//   // const category = [
//   //   { _id: 1, name: "Electronics", image: rocket},
//   //   { _id: 2, name: "Books", image: rocket_1},
//   //   { _id: 3, name: "Fashion", image: rocket_2},
//   //   { _id: 4, name: "Home & Garden", image: rocket_3},
//   //   { _id: 5, name: "Toys", image: rocket_4 },
//   // ];

//   const { data: categories, error } = useData('/api/products?category=Electronics');


//   return (
//     <aside className="products_sidebar">
//         <h2>Category</h2>

//         <div className="category_links">
//           {error && <em className='form_error '>{error}</em>}
//           {categories && categories.map(category => <LinkWithIcon
//             key={category._id}
//             id={category._id}
//             title={category.name}
//             link={`products?category=${category.name}`}  // Corrected API endpoint  Use backticks for template literals
//             //emoji={category.image}
//             emoji={`http://localhost:4000/category/${category.image}`}
//             sidebar={true}

           
//           />
//           )}
//             </div>
//     </aside>
//   )
// }

// export default ProductsSidebar;


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
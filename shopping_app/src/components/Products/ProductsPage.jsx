// import React from 'react'

// import './ProductsPage.css'
// import ProductsSidebar from './ProductsSidebar'
// import ProductsList from './ProductsList'

// const ProductsPage = () => {
//   return (
//     <section className="products_page">
//         <ProductsSidebar />

//         <ProductsList />
//     </section>
//   )
// }

// export default ProductsPage;


import React, { useState } from 'react';

import './ProductsPage.css'
import Productcard from './Productcard';
import ProductsSidebar from './ProductsSidebar';
import ProductsList from './ProductsList';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="products_page">
      
      <ProductsSidebar setSelectedCategory={setSelectedCategory} />
      <Productcard  selectedCategory={selectedCategory}/>
      {/* <ProductsList />    */}
      
    </div>
  );
};

export default ProductsPage;
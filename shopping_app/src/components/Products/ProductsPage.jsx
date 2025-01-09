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

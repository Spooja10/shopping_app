import React, { useEffect, useState } from 'react';

import apiClient from '../../utils/api-client';
import './ProductsList.css';
import Productcard from './Productcard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Common/Pagination';
//import useData from '../../Hooks/useData';

const ProductsList = () => {
  const [page, setPage] = useState(1) 
  const [products, setProducts] = useState([]);
  const [error1, setError1] = useState(" ");;
  const searchQuery = search.get("search")
  // const [search, setSearch] = useSearchParams();  // used for without refreshing page get all products after clicking on category list
  // const category = search.get("category");

  //const { isLoading} = useData("/products", {
  //    params:{
  //      search: searchQuery, 
  //      category,
  //      perPage: 10,
  //      page,
  //   },
  //  }, [searchQuery, category, page])

  //     useEffect( () => {
  //       setPage(1)
  //     }, [category])

  // const skeletons = [1,2,3,4,5,6,7,8];
  
  // const handlePageChange = page => {
  //   const currentParams = Object.fromEntries([...search])
  //   setSearch({...currentParams, page: parseInt(currentParams.page) + 1 })
  // }

  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, clientHeigth, scrollHeigth} = document.documentElement;
      if (scrollTop + clientHeigth >= scrollHeigth -1 && 
        !isLoading && data && page < data.totalPages) {
          console.log("reached to bottom!");
          setPage(prev => prev + 1)
      }
    }
      window.addEventListener("scroll", handleScroll)

      return () => window.removeEventListener("scroll", handleScroll)
  }, [data, isLoading])

  useEffect(() => {
      apiClient.get("/products")
      .then(res => setProducts(res.data.products))
      .catch(err => setError1(err.message))
  }, [])
  // Fetch products based on category or fetch all if no category is provided
  // const { data, error } = useData(category ? /products?category=${category} : '/products');

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>

        <select name="sort" className='products_sorting'>
          <option value="">Relevance</option>
          <option value="price desc">Price high to low</option>
          <option value="price asc">Price low to high</option>
          <option value="rate desc">Rate high to low</option>
          <option value="rate asc">Rate low to high</option>
        </select>
      </header>

      <div className="products_list">
        {error1 && <em className='form_error'>{error1}</em>}
    
        {isLoading && skeletons.map(n => <ProductCardSkeleton key={n}/>) }
        { products.map(product => (
          <Productcard 
            key={product.id}
            // id={product.id}
            // image={product.image}
            // title={`${product.brand} ${product.model}`}
            // price={product.price}
            // rating={product.rating}
            // ratingCounts={product.ratingCounts}
            // stock={product.stock}
            product={product}
          />
        ))}
      </div>
      {/* {products && <Pagination 
      totalPosts={products.totalProducts} 
      postsPerPage={2} 
      onClick={handlePageChange}
      currentpage={page}
      />} */}
    </section>
  );
};

export default ProductsList;

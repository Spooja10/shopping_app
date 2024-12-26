import React,{useEffect, useState} from 'react'
import apiClient from '../utils/api-client'

const useData = (endpoint, customConfig, deps) => {    // useData= (url)
    const [data, setData] = useState([])  // useState(null)
    const [error, setError] = useState(" ")
    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      setIsLoading(true)
      apiClient.get(endpoint, customConfig)    // get(url)
  //    .then(res => setData(res.data))
      .then(res => {
        if(endpoint === "/products" && data && data.products && customConfig.params.page !== 1 ) {
          setData(prev => ({
            ...prev, products: [...prev.products, ... res.data.products] }))
        } else {
          setData(res.data.categories);
        }
          setIsLoading(false);
        })
      .catch(err => setError (err.message), setIsLoading(false))
    }, deps ? deps : [])

    return{data, error, isLoading};
}

export default useData;

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useData = (url) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url);
//         setData(response.data.categories);  // Check this line carefully
//       } catch (err) {
//         setError('Failed to fetch data');
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, error };
// };

// export default useData;



// import React,{useEffect, useState} from 'react'
// import apiClient from '../utils/api-client'

// const useData = (url) => {
//     const [data, setData] = useState([])  // useState(null)
//     const [error, setError] = useState(" ")
  
//     useEffect(() => {
//       console.log(`Fetching data from: ${url}`);
//       apiClient.get(url)
//       .then(res => setData(res.data))
//       .catch(err => setError (err.message))
//     }, [])

//     return{data, error};
// }

// export default useData;


// export const useProductData = (url) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url);
//         setData(response.data.products);  // Check this line carefully
//       } catch (err) {
//         setError('Failed to fetch data');
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, error };
// };




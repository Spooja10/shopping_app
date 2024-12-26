// import React, { useState } from 'react'

// import './SingleProductPage.css'
// import QuantityInput from './QuantityInput';
// import { useParams } from 'react-router-dom';
// import useData from '../../hooks/useData';
// import Loader from '../Common/Loader';
// // demo - copied Product Object code in (118 vd) manually applied
// // const product = {
// //     id:1,
// //     title:"Product title",
// //     description:
// //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, corporis enim. Nam illum reprehenderit libero rerum quibusdam deleniti distinctio. Distinctio laudantium itaque illum? Distinctio vitae reprehenderit harum accusamus repudiandae cupiditate.",
// //     price: 999,
// //     images: [
// //         "https://via.placeholder.com/500x500?text=Product+Image+1",
// //         "https://via.placeholder.com/500x500?text=Product+Image+2",
// //         "https://via.placeholder.com/500x500?text=Product+Image+3",
// //         "https://via.placeholder.com/500x500?text=Product+Image+4",
// //     ],
// //     stock:10,
// // };
// //--------
// const SingleProductPage = () => {
//     const [selectedImage, setSelectedImage] = useState(0);
//     const {quantity, setQuantity} = useState(1) 
//     const {id} = useParams();

//     const {data: product, error, isLoading} = useData(`/products/${id}`)

//     return (
//     <section className="align_center single_product">
//       {error && <em className='form_error'>{error}</em>}
//       {isLoading && <Loader />}
//        {product && <><div className='align_center'>
//          <div className="single_product_thumbnails">
//             {product.images.map((image, index) => 
//               <img src={`http://localhost:4000/api/products/${image}`} alt={product.title} className={selectedImage === index ? 'selected_image' : ' '} onClick={() => setSelectedImage(index)} />)
//             }
//          </div>

//          <img src={`http:/localhost:4000/api/products/${product.images[selectedImage]}`} alt={product.title} className='single_product_display' />

//        </div>

//        <div className="single_product_details">
//           <h1 className='single_product_title'>{product.title}</h1>
//           <p className='single_product_description'>{product.description}</p>
//           <p className='single_product_price'>${product.price.toFixed(2)}</p>

//           <h2 className="quantity_title">Quantity:</h2>
//           <div className="alignt_center quantity_input">
//             <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
// {/* ----- placed this in "QuantityInput.jsx" component  -------
//             <button className='quantity_input_button' disabled> - </button>
//             <p className='quantity_input_count'> 1 </p>
//             <button className='quantity_input_button'> + </button> 
// */}
//           </div>

//           <button className="search_button add_cart"> Add to Cart</button>
//        </div> </>}
//     </section>
//   )
// }

// export default SingleProductPage;

import React, { useContext, useState } from 'react'

import { useParams } from 'react-router-dom';
import './SingleProductPage.css'
import QuantityInput from './QuantityInput';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContexts';
import { toast } from 'react-toastify';

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1); 
  const {addToCart} = useContext(CartContext)
  const user = useContext(UserContext)          // if user is not null then show add-to-cart button
  const { id } = useParams();

  // copied Product Object code in (118 vd) manually applied
const product = {
    id:1,
    title:"Product title",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, corporis enim. Nam illum reprehenderit libero rerum quibusdam deleniti distinctio. Distinctio laudantium itaque illum? Distinctio vitae reprehenderit harum accusamus repudiandae cupiditate.",
    price: 999,
    images: [
        "https://via.placeholder.com/500x500?text=Product+Image+1",
        "https://via.placeholder.com/500x500?text=Product+Image+2",
        "https://via.placeholder.com/500x500?text=Product+Image+3",
        "https://via.placeholder.com/500x500?text=Product+Image+4",
    ],
    stock:10,
};
//--------

  return (
      <section className="align_center single_product">
          <div className='align_center'>
              <div className="single_product_thumbnails">
                  {product.images.map((image, index) => (
                      <img
                          //key={product.id}
                          src={image}
                          alt={product.title}
                          className={selectedImage === index ? 'selected_image' : ''}
                          onClick={() => setSelectedImage(index)}
                      />
                  ))}
              </div>

              <img src={product.images[selectedImage]} alt={product.title} className='single_product_display' />
          </div>

          <div className="single_product_details">
              <h1 className='single_product_title'>{product.title}</h1>
              <p className='single_product_description'>{product.description}</p>
              <p className='single_product_price'>${product.price.toFixed(2)}</p>

              {/* {user && <>                     // if user is not null then show add-to-cart button */}
              <h2 className="quantity_title">Quantity:</h2>      
              <div className="align_center quantity_input">
                  <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
              </div>
{/* ----- placed this in "QuantityInput.jsx" component  -------
            <button className='quantity_input_button' disabled> - </button>
            <p className='quantity_input_count'> 1 </p>
            <button className='quantity_input_button'> + </button> 

              <button className="search_button add_cart" onClick={() => addToCart(product, quantity)}>Add to Cart</button>
*/}    
              <button className="search_button add_cart" 
                onClick={() => { if (quantity > 0 && quantity <= product.stock) {
                    addToCart(product, quantity);
                } else {
                    toast.error("Invalid quantity selected!");
                }
              }} > Add to Cart 
              </button>
              {/* </>             // if user is not null then show add-to-cart button   
              } */}
              
          </div>
      </section>
  );
};

export default SingleProductPage;

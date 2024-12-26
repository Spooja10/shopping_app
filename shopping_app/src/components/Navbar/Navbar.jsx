import React, { useContext, useEffect, useState } from 'react'

import './Navbar.css'
import LinkWithIcon from './LinkWithIcon'
import rocket from "../../assets/rocket.png"
import star from "../../assets/star.png"
import id_button from "../../assets/id_button.png"  
import memo from "../../assets/memo.png"
import order from "../../assets/package.png"
import locked from "../../assets/locked.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContexts'
import CartContext from '../../contexts/CartContext'
import { getSuggestionsAPI } from './../../services/productServices';
 
const Navbar = () => {
  const [search, setSearch] = useState(" ");
  const [suggestions, setSuggestions] = useState([ ])
  const naviagte = useNavigate()

  const user = useContext(UserContext)
  const {cart} = useContext(CartContext)

  const handleSubmit = e => {
   e.preventDefault()
   if(search.trim() !== " "){
      naviagte(`/products?search=${search.trim()}`)
   }
   setSuggestions([ ]);
  }
//------- getting error  -------------
  useEffect(() => {
       if(search.trim() !== " "){
         getSuggestionsAPI(search)
         .then(res => setSuggestions (res.data))
         .catch(err => console.log(err));
       } else{
         setSuggestions([ ])
       }
  }, [search])
  
  return (
    <nav className='align_center navbar'>
        <div className='align_center'>
           <h1 className='navbar_heading'>CartWish</h1>
           <form className='align_center navbar_form' onSubmit={handleSubmit}>
            <input type="text" className="navbar_search" placeholder='Search Products' value={search} onChange={e => setSearch(e.target.value)}/>
            <button type='submit' className='search_button'>Search</button>

            {suggestions.length > 0 && <ul className="search_result">
                  {suggestions.map(suggestion => 
               <li className="search_suggestion_link" key={suggestion._id}>
                  <Link to={`/products?search=${suggestion.title}`} 
                  onClick={() => {
                     setSearch(" ");
                     setSuggestions([ ])
                  }} >
                  {suggestion.title}</Link>
               </li>
               )}
            </ul>}
           </form>
        </div>
        
        <div className='align_center navbar_links'>
            <LinkWithIcon title="Home" link="/" emoji={rocket} />
            <LinkWithIcon title="Products" link="/products" emoji={star}/>
            {/* {!user && <>
            <LinkWithIcon title="Login" link="/login" emoji={id_button}/>
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo}/>
            </>}
            {user && <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order}/>
            <LinkWithIcon title="Logout" link="/logout" emoji={locked}/>

            <NavLink to="/cart" className='align_center'>Cart
               <p className='align_center cart_counts'>0</p>
            </NavLink> 
            </>} */}

            {!user && <>
            <LinkWithIcon title="Login" link="/login" emoji={id_button}/>
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo}/>
            </>}
         
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order}/>
            <LinkWithIcon title="Logout" link="/logout" emoji={locked}/>

            <NavLink to="/cart" className='align_center'>Cart
               <p className='align_center cart_counts'>{cart.length}</p>
            </NavLink> 
           
        </div>
    </nav>
  )
}

export default Navbar;
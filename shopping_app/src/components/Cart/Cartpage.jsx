import React, { useEffect, useState, useContext } from 'react'

import UserContext from '../../contexts/UserContexts'
import './CartPage.css'
import remove from '../../assets/remove.png'
import user from '../../assets/user.png'
import Table from '../Common/Table'
import QuantityInput from '../SingleProcduct/QuantityInput'
import CartContext from '../../contexts/CartContext'
import { checkOutAPI } from '../../services/orderServices'
import { toast } from 'react-toastify'

const Cartpage = () => {
   const [subTotal, setSubTotal] = useState(0)
   const userObj = useContext(UserContext);
   const {cart, removeFromCart, updateCart, setCart} = useContext(CartContext)
   
   const checkOut = () => {
    const oldCart = [...cart]
    setCart([])
    checkOutAPI().then(() => {
        toast.success("Order placed successfully")
    }).catch(() => {
        toast.error("something went wrong")
        setCart(oldCart)
    })
   }
   
   useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.product.price * item.quantity
        })
        setSubTotal(total)
   }, [cart])


  return (
    <section className='align_center cart_page'>
        <div className="align_center user_info">
            {/* <img src={http://localhost:4000/profile/${userObj?.profilePic}} alt="user prifile" /> */}
            <img src={user} alt="" />
            <div>
            <p className="user_name">Name: Harley</p>
                <p className="user_mail">Email: {userObj?.email}</p>
            </div>
        </div>

        <Table headings={["Item","Price","Quantity","Total","Remove"]} >  {/* place props & table component as table tag  */}
            <tbody>
                {cart.map(({product, quantity}) => 
                <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td className='align_center table_quantity_input'> 
                        <QuantityInput quantity={quantity} stock={product.stock} setQuantity={updateCart} cartPage={true} productId={product._id}/> 
                    </td>
                    <td>${quantity*product.price}</td>
                    <td><img src={remove} alt="remove icon" className='cart_remove_icon' onClick={() => removeFromCart(product._id)}/></td>
                </tr>
                )}
            </tbody>
        </Table>

        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>${subTotal}</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$5</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>${subTotal + 5}</td>
                </tr>
            </tbody>
        </table>

        <button className='search_button checkout_button'onClick={checkOut}>Checkout</button>
    </section>
  )
}

export default Cartpage;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // Asegúrate de importar addItem

import { useNavigate } from 'react-router-dom';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Calcular el total de la cantidad de todos los productos en el carrito
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        const cost = parseFloat(item.cost); // Convierte a número si no lo es
        return total + (item.quantity * cost);
    }, 0);
  };

  // Calcular el costo total de un artículo (planta) específico
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost); // Convierte a número si no lo es
    return item.quantity * cost;
  };

  // Función para continuar comprando
  const handleContinueShoppingCarrito = (e) => {
    onContinueShopping(e);
  };

  // Función para incrementar la cantidad de un artículo
  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1; // Aumenta la cantidad en 1
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  // Función para decrementar la cantidad de un artículo
  const handleDecrement = (item) => {
    if (item.quantity > 1) { // Evitar cantidades negativas
      const newQuantity = item.quantity - 1; // Disminuye la cantidad en 1
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }
  };

  // Función para eliminar un artículo
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));

  };

  // Función para agregar un artículo desde el carrito
  const handleAddItemFromCart = (item) => {
    // Esta función agregará el artículo al inventario (o a donde se necesite)
    dispatch(addItem(item));
    // Opcionalmente, podrías eliminar el artículo del carrito al agregarlo al inventario:
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-subtotal">
                Subtotal: ${calculateTotalCost(item)} {/* Mostrar subtotal */}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              {/* Botón para agregar el artículo desde el carrito */}
              <button className="cart-item-add" onClick={() => handleAddItemFromCart(item)}>Add to Inventory</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        {/* Mostrar el total del carrito */}
        Total Amount: ${calculateTotalAmount()}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShoppingCarrito}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

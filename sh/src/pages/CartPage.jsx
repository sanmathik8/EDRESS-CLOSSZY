// E:\clothing-store\sh\src\pages\CartPage.jsx
import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Import CartContext from the same 'pages' directory
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom'; // Keep Link for navigation

const CartWrapper = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 80vh;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const CartItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`;

const ItemInfo = styled.p`
  margin: 0.2rem 0;
  color: #555;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  color: #222;
  margin: 0;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #c82333;
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #e9ecef;
  border-radius: 1rem;
  text-align: right;
`;

const SummaryText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
`;

const CheckoutButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: background 0.2s ease;

  &:hover {
    background: #218838;
  }
`;

const EmptyCartText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #6c757d;
  margin-top: 5rem;
`;

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartWrapper>
      <PageTitle>Your Shopping Cart</PageTitle>
      {cartItems.length === 0 ? (
        <EmptyCartText>Your cart is empty!</EmptyCartText>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ItemImage src={item.img} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemInfo>Brand: {item.brand}</ItemInfo>
                <ItemInfo>Color: {item.colour}</ItemInfo>
                <ItemInfo>Size: {item.size}</ItemInfo>
                <ItemPrice>₹{item.price}</ItemPrice>
              </ItemDetails>
              <RemoveButton onClick={() => removeFromCart(index)}>Remove</RemoveButton>
            </CartItem>
          ))}
          <CartSummary>
            <SummaryText>Total: ₹{total.toFixed(2)}</SummaryText>
            <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
          </CartSummary>
        </>
      )}
    </CartWrapper>
  );
};

export default CartPage;
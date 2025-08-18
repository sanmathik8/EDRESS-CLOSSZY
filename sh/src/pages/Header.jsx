// E:\clothing-store\sh\src\pages\Header.jsx
import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import FaHeart
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import CartContext from the same 'pages' directory
import { CartContext } from './CartContext';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #ffffff; /* Clean white background */
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08); /* Softer, slightly more pronounced shadow */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
`;

const Logo = styled(Link)`
  font-family: 'Georgia', serif; /* A more elegant font choice */
  font-size: 1.8rem; /* Slightly larger for prominence */
  font-weight: bold;
  color: #333d42; /* Darker, sophisticated grey */
  text-decoration: none;
  letter-spacing: 0.5px; /* A little breathing room */
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 1.5rem; /* Space between icons */
  align-items: center;
`;

const IconLink = styled(Link)`
  position: relative;
  cursor: pointer;
  color: #333d42; /* Matches logo color */
  transition: color 0.2s ease, transform 0.2s ease;
  
  &:hover {
    color: #5a6d7a; /* Slightly lighter on hover */
    transform: translateY(-2px);
  }
`;

const StyledCartIcon = styled(FaShoppingCart)` 
  font-size: 1.8rem;
`;

const StyledHeartIcon = styled(FaHeart)` /* Styled for the heart icon */
  font-size: 1.8rem;
`;

const CartCount = styled(motion.div)`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e04f5f; /* A warm, inviting red */
  color: white;
  border-radius: 50%;
  width: 22px; /* Slightly larger for better visibility */
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem; /* Adjusted font size */
  font-weight: bold;
`;

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.length;

  return (
    <HeaderContainer>
      <Logo to="/">Closet Craft</Logo> {/* Changed from E-Commerce to Closet Craft */}
      <IconsContainer>
        {/* Favorites Icon */}
        <IconLink to="/favorites"> {/* You'll need to add a route for /favorites later */}
          <StyledHeartIcon />
        </IconLink>

        {/* Cart Icon */}
        <IconLink to="/cart">
          <StyledCartIcon />
          {cartCount > 0 && (
            <CartCount 
              key={cartCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {cartCount}
            </CartCount>
          )}
        </IconLink>
      </IconsContainer>
    </HeaderContainer>
  );
};

export default Header;
// E:\clothing-store\sh\src\pages\CategoryPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Import CartContext and Header from the same 'pages' directory
import { CartContext } from './CartContext'; 
import Header from './Header'; 

// --- Global Styles ---
// IMPORTANT: Ideally, this should be in your App.js or index.js
// to ensure it applies site-wide. If placed only here, it applies only to this page.
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    scroll-behavior: smooth;
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: white;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
    
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
  }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
  max-width: 1300px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-transform: capitalize;
  text-align: center;
  color: #333;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0 1rem;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-width: unset;
    width: 100%;
  }
`;

const BrandSelect = styled.select`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ColorSelect = styled.select`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const ItemCard = styled(motion.div)`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ItemCard}:hover & {
    transform: scale(1.02);
  }
`;

const ItemDetails = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ItemName = styled.h2`
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #333;
  line-height: 1.3;
`;

const ItemBrand = styled.p`
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  color: #222;
  font-size: 1.1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const ArrowButton = styled.button`
  padding: 0.7rem 1.2rem;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  color: #555;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    background: #ddd;
    color: #333;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PageButton = styled.button`
  padding: 0.7rem 1.2rem;
  border: none;
  background: ${(props) => (props.active ? '#333' : '#eee')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover:not(:active) {
    background: ${(props) => (props.active ? '#222' : '#ddd')};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
`;

const ModalImage = styled(motion.img)`
  max-width: 100%;
  max-height: 450px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  user-select: none;
  background-color: #f0f0f0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: #555;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: rotate(90deg);
    color: #333;
  }
`;

const ModalProductName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
`;
const ModalProductBrand = styled.p`
  color: #777;
  font-size: 1rem;
  margin-bottom: 1rem;
`;
const ModalProductPrice = styled.p`
  font-weight: bold;
  color: #222;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ModalProductDescription = styled.div`
  margin: 1.5rem 0;
  color: #444;
  line-height: 1.6;
`;

const SizeSelector = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

const SizeButton = styled.button`
  padding: 0.7rem 1.2rem;
  background: ${(props) => (props.active ? '#333' : '#eee')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: 1px solid ${(props) => (props.active ? '#333' : '#ddd')};
  cursor: pointer;
  border-radius: 0.7rem;
  font-size: 0.95rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover:not(:active) {
    background: ${(props) => (props.active ? '#222' : '#e0e0e0')};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  background: #333;
  color: #fff;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #555;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 5rem;
`;
const ErrorText = styled.p`
  color: red;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 5rem;
`;
const NoItemsText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 5rem;
`;

// --- CategoryPage Component ---
const CategoryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 16;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  const [colorList, setColorList] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
        });

        if (searchTerm) {
          params.append('searchTerm', searchTerm);
        }
        if (selectedBrand) {
          params.append('brand', selectedBrand);
        }
        if (selectedColor) {
          params.append('color', selectedColor);
        }

        const response = await fetch(
          `http://localhost:5000/api/category/${name}?${params.toString()}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Category "${name}" not found.`);
          }
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data); 
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);

        const filtersResponse = await fetch(`http://localhost:5000/api/category/${name}/filters`);
        if (filtersResponse.ok) {
          const { brands, colours } = await filtersResponse.json();
          setBrandList(brands.filter(Boolean)); 
          setColorList(colours.filter(Boolean)); 
        } else {
          console.warn("Could not fetch brand and color list.");
        }

      } catch (err) {
        setError(err.message);
        setData([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name, currentPage, searchTerm, selectedBrand, selectedColor]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size!');
      return;
    }
    addToCart(selectedProduct, selectedSize); 
    setSelectedProduct(null); 
    setSelectedSize(null);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size!');
      return;
    }
    addToCart(selectedProduct, selectedSize);
    navigate('/cart');
  };

  const handleImageClick = () => {
    setRotation((prev) => prev + 360); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1); 
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <>
      <GlobalStyle /> 
      <Header /> 
      <PageWrapper>
        <PageTitle>{name}</PageTitle>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={`Search in ${name}...`}
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <BrandSelect value={selectedBrand} onChange={handleBrandChange}>
            <option value="">All Brands</option>
            {brandList.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </BrandSelect>

          <ColorSelect value={selectedColor} onChange={handleColorChange}>
            <option value="">All Colors</option>
            {colorList.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </ColorSelect>
        </FilterBar>

        {loading && <LoadingText>Loading {name} items...</LoadingText>}
        {error && <ErrorText>{error}</ErrorText>}
        {!loading && !error && data.length === 0 && (
          <NoItemsText>No matching items found.</NoItemsText>
        )}

        {!loading && !error && data.length > 0 && (
          <ContentContainer>
            <ItemGrid>
              {data.map((item) => (
                <ItemCard
                  key={item._id.$oid || item.p_id || item.name} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    setSelectedProduct(item);
                    setSelectedSize(null);
                    setRotation(0);
                  }}
                >
                  {item.img && <ItemImage src={item.img} alt={item.name || 'Product'} />}
                  <ItemDetails>
                    <ItemName>{item.name || 'Unnamed Product'}</ItemName>
                    {item.brand && <ItemBrand>Brand: {item.brand}</ItemBrand>}
                    {item.colour && <ItemBrand>Color: {item.colour}</ItemBrand>}
                    {item.price && <ItemPrice>₹{item.price}</ItemPrice>}
                  </ItemDetails>
                </ItemCard>
              ))}
            </ItemGrid>

            <PaginationContainer>
              <ArrowButton
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </ArrowButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
                )
                .map((page, idx, arr) => (
                  <React.Fragment key={page}>
                    {idx > 0 && page - arr[idx - 1] > 1 && <span>...</span>}
                    <PageButton
                      onClick={() => setCurrentPage(page)}
                      active={page === currentPage}
                    >
                      {page}
                    </PageButton>
                  </React.Fragment>
                ))}

              <ArrowButton
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </ArrowButton>
            </PaginationContainer>
          </ContentContainer>
        )}

        <AnimatePresence>
          {selectedProduct && (
            <ModalOverlay 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)} 
            >
              <ModalContent 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()} 
              >
                <CloseButton onClick={() => setSelectedProduct(null)}>&times;</CloseButton>

                {selectedProduct.img && (
                  <ModalImage
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    onClick={handleImageClick}
                    animate={{ rotate: rotation }}
                    transition={{ type: 'spring', stiffness: 120 }}
                  />
                )}

                <ModalProductName>{selectedProduct.name || 'Unnamed Product'}</ModalProductName>
                {selectedProduct.brand && (
                  <ModalProductBrand>Brand: {selectedProduct.brand}</ModalProductBrand>
                )}
                {selectedProduct.colour && (
                  <ModalProductBrand>Color: {selectedProduct.colour}</ModalProductBrand>
                )}
                {selectedProduct.price && (
                  <ModalProductPrice>₹{selectedProduct.price}</ModalProductPrice>
                )}

                <ModalProductDescription
                  dangerouslySetInnerHTML={{
                    __html: selectedProduct.description || 'No description available.',
                  }}
                />

                <SizeSelector>
                  {availableSizes.map((size) => (
                    <SizeButton
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      active={selectedSize === size}
                    >
                      {size}
                    </SizeButton>
                  ))}
                </SizeSelector>

                <ButtonContainer>
                  <ActionButton onClick={handleAddToCart}>Add to Cart</ActionButton>
                  <ActionButton onClick={handleBuyNow}>Buy Now</ActionButton>
                </ButtonContainer>
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </PageWrapper>
    </>
  );
};

export default CategoryPage;
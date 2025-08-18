import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #fdfcfb, #e2d1c3);
    font-family: 'Playfair Display', serif;
  }
`;

const Flower = styled(motion.img)`
  position: absolute;
  width: 100px;
  opacity: 0.25;
  z-index: 0;
  pointer-events: none;
  animation: float 8s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const Wrapper = styled.div`
  padding: 5rem 2rem;
  max-width: 1600px;
  margin: auto;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #111;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`;

const Card = styled(motion.div)`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 1.8rem 1.2rem;
  text-align: center;
  color: #222;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.35);
  }
`;

const QuoteSection = styled(motion.div)`
  max-width: 550px;
  margin: 5rem auto 2rem auto;
  padding: 3.8rem 3.2rem;
  text-align: center;
  color: #0e0708ff;
  line-height: 1.5;
  font-size: 1.7rem;
  position: relative;
  z-index: 2;
  font-family:'Lora', serif;

  &::before, &::after {
    content: '“';
    font-weight: 900;
    font-size: 5.5rem;
    color: #734646ff;
    position: absolute;
    opacity: 0.9;
    line-height: 0;
  }

  &::after {
    content: '“';
    bottom: -15px;
    right: 25px;
    transform: rotate(190deg);
  }

  &::before {
    top: -15px;
    left: 25px;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 2.8rem 2rem;
    max-width: 90%;
  }
`;

const CategoryShowcase = () => {
  const categories = [
    "blouse", "cotton", "crop", "dupatta",
     "embroidered", "ethnic", "floral", 
     "jacket", "jeans", "jumpsuit", 
     "kurta", "lehenga", "motifs", "palazzos", 
     "printed", "saree", "shorts", "silk", 
     "skirt", "sweatshirt", "top", "trousers", "unstitched"
  ];

  const flowers = [
    "https://www.svgrepo.com/show/438976/flower-orange-organic.svg",
    "https://www.svgrepo.com/show/362097/flower.svg",
    "https://www.svgrepo.com/show/267577/flower-sunflower.svg",
    "https://www.svgrepo.com/show/438972/flower-green.svg",
    "https://www.svgrepo.com/show/398525/tulip.svg"
  ];

  const flowerPositions = [
    { top: '10%', left: '5%', rotate: '0deg' },
    { top: '20%', right: '8%', rotate: '20deg' },
    { bottom: '12%', left: '10%', rotate: '-15deg' },
    { bottom: '20%', right: '15%', rotate: '10deg' },
    { top: '5%', right: '30%', rotate: '-20deg' },
  ];

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Title>Discover Our Styles</Title>

        {flowerPositions.map((pos, i) => (
          <Flower
            key={i}
            src={flowers[i % flowers.length]}
            style={{ ...pos }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1, rotate: pos.rotate }}
            transition={{ duration: 1.5, delay: i * 0.3 }}
          />
        ))}

        <Grid>
          {categories.map((item, index) => (
            <Link key={item} to={`/category/${item}`} style={{ textDecoration: 'none' }}>
              <Card
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.03 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Card>
            </Link>
          ))}
        </Grid>

        <QuoteSection
          initial={{ opacity: 0, x: 170 }}
          animate={{ opacity: 1, x: 650 }}
          transition={{ duration: 1 }}
          style={{ position: 'absolute', right: '12rem', top: '13rem', width: '300px' }}
        >
          Craft your closet with our clothes
        </QuoteSection>
      </Wrapper>
    </>
  );
};

export default CategoryShowcase;

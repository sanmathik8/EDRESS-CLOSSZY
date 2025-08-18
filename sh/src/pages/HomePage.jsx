import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import Lenis from '@studio-freight/lenis';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Playfair Display', serif;
    background-color: #fdfdfd; /* Light background */
    color: #111; /* Dark text for contrast */
  }
  #root, .smooth-scroll {
    height: 100%;
    background-color: #fdfdfd; /* Light background */
  }
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem 2rem;
  z-index: 10001;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #fefbfbff;
    }
  }
`;

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
`;

const Background = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.5); /* Light overlay */
    z-index: 1;
  }
`;

const Content = styled(motion.div)`
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
  color: black;
`;

const ImageOverlay = styled(motion.img)`
  position: relative;
  max-width: 400px;
  width: 100%;
  height: auto;
  z-index: 2;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const Loader = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #fdfdfd; /* Light loader background */
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  z-index: 9999;
`;

const ExploreNowContainer = styled.div`
  position: fixed;
  top: 55%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 5;
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 300px;
  font-family: 'Playfair Display', serif;
  animation: floatIn 1s ease-out;
  opacity: 0.95;

  @keyframes floatIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 0.95;
      transform: translate(-50%, -50%);
    }
  }
`;

const StartButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f6ebebff;
  }
`;

const ScrollIndicator = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  background: #111;
  z-index: 10000;
`;

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const fabricY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const floralY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const laceY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const scrollWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  if (loading) return <Loader>Loading Fashion...</Loader>;

  return (
    <div className="smooth-scroll" style={{ scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh' }}>
      <GlobalStyle />
      <ScrollIndicator style={{ width: scrollWidth }} />

      <NavBar>
        <NavLinks>
          <a href="/explore">Explore</a>
          {!user && <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>}
          <a href="/about">About Us</a>

          {user && (
            <div style={{ position: 'relative' }} ref={menuRef}>
              <FaUserCircle
                size={28}
                style={{ cursor: 'pointer' }}
                onClick={() => setShowUserMenu(prev => !prev)}
              />
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  background: 'white',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  zIndex: 10000,
                  minWidth: '160px'
                }}>
                  <p style={{ marginBottom: '0.5rem' }}>👋 {user.name || user.email}</p>
                  <a href="/cart" style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>🛒 My Cart</a>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      background: 'black',
                      color: 'white',
                      padding: '0.5rem',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </NavLinks>
      </NavBar>

      {/* Section 1 */}
      <Section>
        <Background style={{ backgroundImage: `url('https://w0.peakpx.com/wallpaper/1009/703/HD-wallpaper-fabric-abstract-pattern-fabric-textures-geometric-ornaments-fabric-patterns-fabric-backgrounds.jpg')`, y: fabricY }} />
        <Content initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <ImageOverlay
            src="https://img.freepik.com/free-photo/portrait-beautiful-cute-brunette-woman-model-casual-summer-dress-with-no-makeup-isolated-white-full-length_158538-23330.jpg"
            alt="Header Girl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          <h1>Elegance in Every Thread</h1>
          <p>Welcome to the world where every fabric tells a story.</p>
        </Content>
      </Section>

      {/* Section 2 */}
      <Section>
        <Background style={{ backgroundImage: `url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?fm=jpg&q=60&w=3000')`, y: floralY }} />
        <Content initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <ImageOverlay
             src="https://cdn.pixabay.com/photo/2021/09/15/12/34/woman-6626742_1280.jpg"
            alt="Content Girl 1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          <h2>Celebrating Individuality</h2>
          <p>Our fashion reflects every woman’s vibrant story.</p>
        </Content>
      </Section>

      {/* Section 3 */}
      <Section>
        <Background style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/035/977/673/non_2x/ai-generated-close-up-of-white-lace-fabric-with-flowers-background-and-texture-a-delicate-and-intricate-texture-of-lace-ai-generated-free-photo.jpg')`, y: laceY }} />
        <Content initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <br></br><br></br><br></br><ImageOverlay
            src="https://img.freepik.com/free-photo/happy-lady-stylish-skirt-boater-posing-pink-wall_197531-23653.jpg?semt=ais_hybrid&w=740"
            alt="Dress Maker"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          /><h1></h1><br></br><br></br>
          <h2>Crafted with Passion</h2>
          <p>Every stitch made with precision and care.</p>
        </Content>
      </Section>

      {/* CTA Box */}
      <ExploreNowContainer>
        <Background
          style={{
            backgroundImage: `url('https://media.istockphoto.com/id/1314690855/vector/ice-cream-sprinkles-seamless-pattern-on-pink-background.jpg')`,
            y: laceY,
            opacity: 0.2,
            top: 65,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <h2>Explore Our Collection</h2>
        <p>Discover the elegance that suits your style.</p>
        <StartButton onClick={() => navigate('/explore')}>Start Now</StartButton>
      </ExploreNowContainer>
    </div>
  );
};

export default HomePage;

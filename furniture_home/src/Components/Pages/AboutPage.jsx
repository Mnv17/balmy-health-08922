import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import './AboutPage.css';

const heroImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908532/about_hero_image_1782248771376_fy9ovf.jpg';
const philImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908530/about_philosophy_image_1782248784901_w29lbe.jpg';
const servImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908531/about_services_image_1782248817184_a3uk5a.jpg';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export function AboutPage() {
  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <div className="about-page-wrapper">
        
        {/* Hero Section */}
        <motion.section 
          className="about-hero-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
        >
          <div className="about-hero-text">
            <h1 className="about-hero-title">ABOUT<br/>US</h1>
            <p className="about-hero-subtitle">
              Luxurious Interior and Industrial Design.
              <br/><br/>
              Modern Elegance: Designs featuring clean lines, neutral palettes, and high-quality materials.
            </p>
          </div>
          <div className="about-hero-images">
            <img src={heroImg} alt="Modern living room" className="about-img-main" />
            <div className="about-img-secondary">
              <img src={philImg} alt="Luxurious armchair" />
              <div className="about-philosophy-card">
                <h3>Our Philosophy</h3>
                <p>At Furniture Home, we believe in creating luxurious, personalized environments that reflect our clients' tastes and lifestyles.</p>
              </div>
            </div>
          </div>
        </motion.section>


        {/* Services Section */}
        <motion.section 
          className="services-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
        >
          <div className="services-left">
            <h2 className="services-title">Our Services</h2>
            <p className="services-desc">
              At Furniture Home, we offer a comprehensive range of services to bring your interior design vision to life. Each service is tailored to meet the unique needs of our clients, ensuring a seamless and satisfying experience.
            </p>
            <img src={servImg} alt="Interior Design Setup" className="services-img" />
          </div>

          <div className="services-right">
            <div className="service-item">
              <h3>Space Planning</h3>
              <p>We create efficient layouts to maximize the use of space. Every design is crafted with attention to detail to ensure comfort and ease of use.</p>
            </div>
            <div className="service-item">
              <h3>Interior Design</h3>
              <p>From concept development to final installation, we handle all aspects of interior decoration, ensuring every detail aligns with the client's vision.</p>
            </div>
            <div className="service-item">
              <h3>Custom Furniture Design</h3>
              <p>We design and craft unique furniture pieces tailored to specific client needs, creating items that are not only beautiful but also functional.</p>
            </div>
            <div className="service-item">
              <h3>Project Management</h3>
              <p>We oversee the entire design process, ensuring projects are completed on time and within budget. Our team is committed to delivering the best results.</p>
            </div>
          </div>
        </motion.section>

        {/* Connect Section */}
        <motion.section 
          className="connect-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
        >
          <button className="connect-pill">Vimeo</button>
          <button className="connect-pill filled">Facebook</button>
          <button className="connect-pill">Pinterest</button>
          <button className="connect-pill">Instagram</button>
          <button className="connect-pill filled">Twitter</button>
          <button className="connect-pill filled">Linkedin</button>
          <button className="connect-pill">Youtube</button>
        </motion.section>

      </div>
      <Footer />
    </motion.div>
  );
}

import { Navbar } from '../navbar';
import { Hero } from '../Hero';
import { Arrivals } from '../Arrivals';
import { CustomizeSection } from '../CustomizeSection';
import { ProductGrid } from '../ProductGrid';
import { SustainableSection } from '../SustainableSection';
import { RoomsGrid } from '../RoomsGrid';
import { Footer } from '../footer';
import { motion } from 'framer-motion';
import './HomePage.css';

export function HomePage() {
  return (
    <motion.div 
      className="homepage-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />
      <Arrivals />
      <CustomizeSection />
      <ProductGrid />
      <SustainableSection />
      <RoomsGrid />
      <Footer />
    </motion.div>
  );
}
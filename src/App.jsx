import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Departments from './components/Departments';
import Methodology from './components/Methodology';
import Portfolio from './components/Portfolio';
import TicketPortal from './components/TicketPortal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      {/* Background Glowing Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      <Navbar />
      <main>
        <Hero />
        <Departments />
        <Methodology />
        <Portfolio />
        <TicketPortal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

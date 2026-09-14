import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import About from './components/About'
import Process from './components/Process'
import TechStack from './components/TechStack'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import BrandMoment from './components/BrandMoment'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <About />
        <Process />
        <TechStack />
        <Portfolio />
        <Testimonials />
        <BrandMoment />
        <CTA />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}

export default App

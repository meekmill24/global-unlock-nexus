import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import Services from "@/components/Services";
import Credits from "@/components/Credits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductCatalog />
      <Services />
      <Credits />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

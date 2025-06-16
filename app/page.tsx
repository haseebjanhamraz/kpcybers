import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import TestimonialsSection from '@/components/testimonials-section';
import PortfolioSection from '@/components/portfolio-section';
import FloatingContact from '@/components/floating-contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FloatingContact />
      <Footer />
    </main>
  );
}
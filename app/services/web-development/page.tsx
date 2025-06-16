import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingContact from '@/components/floating-contact';
import ServiceHero from '@/components/service-hero';
import ServiceProcess from '@/components/service-process';
import ServicePricing from '@/components/service-pricing';
import ServiceCaseStudies from '@/components/service-case-studies';

const processSteps = [
  {
    step: 1,
    title: 'Discovery & Planning',
    description: 'We analyze your requirements, target audience, and business goals to create a comprehensive project plan.',
    duration: '1-2 weeks'
  },
  {
    step: 2,
    title: 'Design & Wireframing',
    description: 'Creating user-friendly designs and wireframes that align with your brand and user expectations.',
    duration: '2-3 weeks'
  },
  {
    step: 3,
    title: 'Development',
    description: 'Our developers build your website using modern technologies, ensuring clean, maintainable code.',
    duration: '4-8 weeks'
  },
  {
    step: 4,
    title: 'Testing & QA',
    description: 'Comprehensive testing across devices and browsers to ensure flawless functionality.',
    duration: '1-2 weeks'
  },
  {
    step: 5,
    title: 'Deployment & Launch',
    description: 'Smooth deployment to production servers with performance optimization and monitoring setup.',
    duration: '1 week'
  },
  {
    step: 6,
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance, updates, and technical support to keep your website running perfectly.',
    duration: 'Ongoing'
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'PKR 50,000',
    description: 'Perfect for small businesses and startups',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '3 months support',
      'Free hosting for 1 year'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: 'PKR 120,000',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 15 pages',
      'Advanced animations',
      'CMS integration',
      'E-commerce ready',
      'Advanced SEO',
      '6 months support',
      'Free hosting for 1 year',
      'Social media integration'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom Quote',
    description: 'For large-scale applications',
    features: [
      'Unlimited pages',
      'Custom functionality',
      'Third-party integrations',
      'Advanced security',
      'Performance optimization',
      '12 months support',
      'Dedicated server',
      'Priority support'
    ],
    popular: false
  }
];

const caseStudies = [
  {
    title: 'E-Commerce Platform',
    client: 'TechMart Pakistan',
    description: 'Built a comprehensive e-commerce platform that increased online sales by 300%',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    results: ['300% increase in sales', '50% faster loading time', '95% customer satisfaction'],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    title: 'Healthcare Portal',
    client: 'MediCare Solutions',
    description: 'Developed a patient management system that streamlined operations',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    results: ['60% reduction in paperwork', '40% faster patient processing', '99.9% uptime'],
    technologies: ['React', 'Express.js', 'PostgreSQL', 'AWS']
  }
];

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServiceHero />
      <ServiceProcess steps={processSteps} />
      <ServiceCaseStudies caseStudies={caseStudies} />
      <ServicePricing plans={pricingPlans} />
      <FloatingContact />
      <Footer />
    </main>
  );
}
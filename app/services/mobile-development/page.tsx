import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingContact from '@/components/floating-contact';
import MobileServiceHero from '@/components/mobile-service-hero';
import ServiceProcess from '@/components/service-process';
import ServicePricing from '@/components/service-pricing';
import ServiceCaseStudies from '@/components/service-case-studies';

const processSteps = [
  {
    step: 1,
    title: 'Requirements Analysis',
    description: 'We analyze your app requirements, target audience, and platform preferences to create a detailed project roadmap.',
    duration: '1-2 weeks'
  },
  {
    step: 2,
    title: 'UI/UX Design',
    description: 'Creating intuitive and engaging mobile app designs that provide excellent user experience across all devices.',
    duration: '2-3 weeks'
  },
  {
    step: 3,
    title: 'Development & Coding',
    description: 'Building your mobile app using React Native or native technologies, ensuring optimal performance and functionality.',
    duration: '6-12 weeks'
  },
  {
    step: 4,
    title: 'Testing & QA',
    description: 'Comprehensive testing on multiple devices and platforms to ensure bug-free performance and smooth user experience.',
    duration: '2-3 weeks'
  },
  {
    step: 5,
    title: 'App Store Deployment',
    description: 'Preparing and submitting your app to Google Play Store and Apple App Store with all necessary optimizations.',
    duration: '1-2 weeks'
  },
  {
    step: 6,
    title: 'Maintenance & Updates',
    description: 'Ongoing maintenance, feature updates, and technical support to keep your app running smoothly.',
    duration: 'Ongoing'
  }
];

const pricingPlans = [
  {
    name: 'Basic App',
    price: 'PKR 150,000',
    description: 'Perfect for simple mobile applications',
    features: [
      'Cross-platform development',
      'Basic UI/UX design',
      'Up to 10 screens',
      'Basic functionality',
      'App store submission',
      '3 months support',
      'Source code included'
    ],
    popular: false
  },
  {
    name: 'Professional App',
    price: 'PKR 350,000',
    description: 'Ideal for feature-rich applications',
    features: [
      'Advanced cross-platform development',
      'Custom UI/UX design',
      'Up to 25 screens',
      'Advanced features & integrations',
      'Push notifications',
      'API integrations',
      '6 months support',
      'App store optimization',
      'Analytics integration'
    ],
    popular: true
  },
  {
    name: 'Enterprise App',
    price: 'Custom Quote',
    description: 'For complex enterprise applications',
    features: [
      'Native or hybrid development',
      'Custom architecture',
      'Unlimited screens',
      'Advanced security features',
      'Third-party integrations',
      'Backend development',
      '12 months support',
      'Dedicated project manager',
      'Priority support'
    ],
    popular: false
  }
];

const caseStudies = [
  {
    title: 'Food Delivery App',
    client: 'QuickEats Pakistan',
    description: 'Developed a comprehensive food delivery app with real-time tracking and payment integration',
    image: 'https://images.pexels.com/photos/4393665/pexels-photo-4393665.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    results: ['200% increase in orders', '4.8 star rating on app stores', '50,000+ downloads in first month'],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io']
  },
  {
    title: 'Healthcare Management App',
    client: 'MediCare Mobile',
    description: 'Built a patient management and telemedicine app for healthcare providers',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    results: ['80% reduction in appointment scheduling time', '95% user satisfaction', 'HIPAA compliant'],
    technologies: ['Flutter', 'Firebase', 'WebRTC', 'Stripe']
  }
];

export default function MobileDevelopmentPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <MobileServiceHero />
      <ServiceProcess steps={processSteps} />
      <ServiceCaseStudies caseStudies={caseStudies} />
      <ServicePricing plans={pricingPlans} />
      <FloatingContact />
      <Footer />
    </main>
  );
}
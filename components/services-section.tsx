"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Smartphone, 
  Globe, 
  Network, 
  Settings, 
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users
} from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies',
    features: ['Responsive Design', 'Modern Frameworks', 'Performance Optimized', 'SEO Ready'],
    href: '/services/web-development',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android',
    features: ['Cross-Platform', 'Native Performance', 'UI/UX Design', 'App Store Ready'],
    href: '/services/mobile-development',
    color: 'from-emerald-600 to-emerald-800',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
  },
  {
    icon: Globe,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence',
    features: ['SEO Optimization', 'Social Media', 'Content Strategy', 'Analytics'],
    href: '/services/digital-marketing',
    color: 'from-purple-600 to-purple-800',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    icon: Network,
    title: 'Networking Solutions',
    description: 'Enterprise networking infrastructure and security solutions',
    features: ['Network Design', 'Security Setup', 'Maintenance', '24/7 Support'],
    href: '/services/networking',
    color: 'from-orange-600 to-orange-800',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    icon: Settings,
    title: 'CMS Development',
    description: 'Custom content management systems tailored to your business needs',
    features: ['Custom CMS', 'Easy Management', 'Scalable', 'Secure'],
    href: '/services/cms-development',
    color: 'from-teal-600 to-teal-800',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20'
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick turnaround times without compromising quality'
  },
  {
    icon: Shield,
    title: 'Secure Solutions',
    description: 'Enterprise-grade security in all our implementations'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced professionals with proven track records'
  }
];

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We offer comprehensive digital solutions to help your business thrive in the digital age. 
            From web development to digital marketing, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className={`group relative overflow-hidden border-2 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:scale-105 ${service.bgColor}`}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <CardHeader className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  asChild 
                  variant="ghost" 
                  className="w-full group/btn hover:bg-accent/50"
                >
                  <Link href={service.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose KP Cybers?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
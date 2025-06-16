"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Smartphone, Zap, Users, Shield, Globe, Star } from 'lucide-react';
import Link from 'next/link';

const mobileAppData = {
  title: 'Mobile App Development',
  subtitle: 'Native and cross-platform mobile applications for iOS and Android',
  description: 'We create powerful, user-friendly mobile applications that engage your audience and drive business growth. Our expert team develops both native and cross-platform apps using cutting-edge technologies like React Native and Flutter.',
  features: [
    {
      icon: Smartphone,
      title: 'Cross-Platform Development',
      description: 'Build once, deploy everywhere with React Native and Flutter'
    },
    {
      icon: Zap,
      title: 'Native Performance',
      description: 'Optimized performance that feels native on both iOS and Android'
    },
    {
      icon: Users,
      title: 'User-Centric Design',
      description: 'Intuitive interfaces designed for mobile-first user experience'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with data encryption and secure APIs'
    },
    {
      icon: Globe,
      title: 'App Store Ready',
      description: 'Complete app store submission and optimization services'
    },
    {
      icon: Star,
      title: 'Post-Launch Support',
      description: 'Ongoing maintenance, updates, and feature enhancements'
    }
  ]
};

export default function MobileServiceHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent">
                {mobileAppData.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {mobileAppData.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {mobileAppData.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-emerald-600 to-blue-500 hover:from-emerald-700 hover:to-blue-600 text-white px-8 py-6 text-lg group"
            >
              <Link href="/contact">
                Start Your App Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg border-2 hover:bg-accent"
            >
              View App Portfolio
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileAppData.features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
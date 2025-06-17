"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Code, CaseSensitiveIcon as Responsive, Zap, Shield, Search, Users } from 'lucide-react';
import Link from 'next/link';

const digitalMarketingData = {
  title: 'Digital Marketing',
  subtitle: 'Custom digital marketing solutions to grow your business',
  description: 'We create custom digital marketing solutions to grow your business. Our expert team uses cutting-edge technologies to deliver solutions that are fast, secure, and scalable.',
  features: [
    {
      icon: Code,
      title: 'Modern Technologies',
      description: 'Built with latest frameworks like React, Next.js, and Node.js'
    },
    {
      icon: Responsive,
      title: 'Responsive Design',
      description: 'Perfect viewing experience across all devices and screen sizes'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Optimized for speed with 90+ PageSpeed scores'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliable hosting solutions'
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      description: 'Built-in SEO best practices for better search rankings'
    },
    {
      icon: Users,
      title: 'User-Focused',
      description: 'Intuitive user experience and accessibility compliance'
    }
  ]
};

export default function DigitalMarketingServiceHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                {digitalMarketingData.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {digitalMarketingData.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {digitalMarketingData.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8 py-6 text-lg group"
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-2 hover:bg-accent"
            >
              View Portfolio
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalMarketingData.features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200 dark:hover:border-blue-800"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
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
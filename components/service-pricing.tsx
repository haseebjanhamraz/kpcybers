"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useServices } from '@/hooks/useServices';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isfeatured: boolean;
}

interface ServicePricingProps {
  plans: PricingPlan[];
}

const getPackageKey = (planName: string, category: string) => {
  const name = planName.toLowerCase().replace(/\s+/g, '-');
  const cat = category.toLowerCase().replace(/\s+/g, '-');
  return `${cat}-${name}`;
};

export default function ServicePricing({ plans: initialPlans }: ServicePricingProps) {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await useServices();
        if (Array.isArray(result)) {
          setLoading(false);
          return;
        }
        const { plans: fetchedPlans } = result as { plans: PricingPlan[] };
        if (fetchedPlans && fetchedPlans.length > 0) {
          setPlans(fetchedPlans); // Assuming first service's plans
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load pricing plans');
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Determine the service category based on the current URL or context
  const getServiceCategory = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('web-development')) return 'web';
      if (path.includes('mobile-development')) return 'mobile';
      if (path.includes('digital-marketing')) return 'digital';
      if (path.includes('networking')) return 'networking';
      if (path.includes('cms-development')) return 'cms';
    }
    return 'web'; // default
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          Loading pricing plans...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Transparent <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Choose the perfect plan for your project. All packages include our standard features
              and quality guarantee. Need something custom? Let's talk!
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => {
              const packageKey = getPackageKey(plan.name, getServiceCategory());

              return (
                <Card
                  key={plan.name}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${plan.isfeatured
                    ? 'border-2 border-blue-600 shadow-xl scale-105'
                    : 'border-2 hover:border-blue-200 dark:hover:border-blue-800'
                    }`}
                >
                  {/* Popular Badge */}
                  {plan.isfeatured && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-center py-2">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">Most Popular</span>
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  )}

                  <CardHeader className={`text-center ${plan.isfeatured ? 'pt-12' : 'pt-6'}`}>
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      {plan.price !== 'Custom Quote' && (
                        <span className="text-muted-foreground ml-2">one-time</span>
                      )}
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 pb-8">
                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full ${plan.isfeatured
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                        }`}
                    >
                      <Link href={plan.price === 'Custom Quote' ? '/contact' : `/checkout?package=${packageKey}`}>
                        {plan.price === 'Custom Quote' ? 'Get Quote' : 'Get Started'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Information */}
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every business is unique. If our standard packages don't fit your specific needs,
              we'd love to create a custom solution tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 hover:bg-accent"
              >
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>

          {/* Guarantee Section */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                30-day money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
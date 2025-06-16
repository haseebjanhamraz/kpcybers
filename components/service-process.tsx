"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface ServiceProcessProps {
  steps: ProcessStep[];
}

export default function ServiceProcess({ steps }: ServiceProcessProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We follow a proven methodology to ensure your project is delivered on time, 
              within budget, and exceeds your expectations.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-emerald-500 transform -translate-x-1/2" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={step.step}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step Content */}
                  <div className="flex-1 max-w-lg">
                    <Card className="relative bg-background/50 backdrop-blur-sm border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl group">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-3 py-1">
                            Step {step.step}
                          </Badge>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{step.duration}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                          {step.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step Number (Center) */}
                  <div className="relative z-10 lg:mx-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{step.step}</span>
                    </div>
                    
                    {/* Completion Indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 max-w-lg hidden lg:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              Ready to start your project with our proven process?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 border-2 border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Free consultation & project estimate</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
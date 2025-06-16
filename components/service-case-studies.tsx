"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp, Users, Clock } from 'lucide-react';

interface CaseStudy {
  title: string;
  client: string;
  description: string;
  image: string;
  results: string[];
  technologies: string[];
}

interface ServiceCaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function ServiceCaseStudies({ caseStudies }: ServiceCaseStudiesProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Success <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              See how we've helped businesses like yours achieve their goals through innovative 
              solutions and strategic implementation.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {caseStudies.map((study, index) => (
              <Card 
                key={study.title}
                className="group overflow-hidden border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-2">
                      {study.client}
                    </Badge>
                    <h3 className="text-white font-bold text-xl">{study.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {study.description}
                  </p>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />
                      Key Results
                    </h4>
                    <div className="space-y-2">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          <span className="text-sm text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button variant="outline" className="w-full group/btn">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                    View Full Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">200%</div>
                <div className="text-muted-foreground">Average ROI Increase</div>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Be Our Next Success Story?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
            >
              <a href="/contact">Start Your Project Today</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
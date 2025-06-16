"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Khan',
    company: 'TechStart Solutions',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    rating: 5,
    text: 'KP Cybers delivered an exceptional website that exceeded our expectations. Their attention to detail and professional approach made the entire process smooth and efficient.',
  },
  {
    name: 'Fatima Ali',
    company: 'Green Valley Restaurant',
    image: 'https://images.pexels.com/photos/3307758/pexels-photo-3307758.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    rating: 5,
    text: 'Outstanding digital marketing services! Our online presence has grown significantly since working with KP Cybers. Highly recommend their expertise.',
  },
  {
    name: 'Muhammad Hassan',
    company: 'Hassan Enterprises',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    rating: 5,
    text: 'The mobile app they developed for our business is fantastic. User-friendly interface and robust functionality. Great team to work with!',
  },
  {
    name: 'Sarah Ahmad',
    company: 'Creative Studio',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    rating: 5,
    text: 'Professional, reliable, and innovative. KP Cybers transformed our digital infrastructure completely. Their networking solutions are top-notch.',
  },
  {
    name: 'Usman Shah',
    company: 'Shah Trading Co.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    rating: 5,
    text: 'Excellent CMS development service. Easy to manage our content and the system is very intuitive. Great support team as well.',
  },
  {
    name: 'Ayesha Malik',
    company: 'Malik Consultancy',
    image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    rating: 5,
    text: 'KP Cybers provided comprehensive digital solutions that helped us scale our business. Their expertise and dedication are commendable.',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView.desktop >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - itemsPerView.desktop : prev - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)` 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <Card className="h-full bg-background/50 backdrop-blur-sm border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="h-8 w-8 text-blue-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-600/20 group-hover:ring-blue-600/40 transition-all"
                        />
                        <div>
                          <div className="font-semibold text-foreground">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {Array.from({ 
                length: Math.ceil(testimonials.length / itemsPerView.desktop) 
              }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerView.desktop) === i
                      ? 'bg-blue-600 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to join our satisfied clients?
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
          >
            <a href="/contact">Start Your Project</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Modern e-commerce solution with advanced features and seamless user experience.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Healthcare Management System',
    category: 'CMS Development',
    description: 'Comprehensive healthcare management system for hospitals and clinics.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['React', 'Express.js', 'PostgreSQL', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Food Delivery Mobile App',
    category: 'Mobile Development',
    description: 'Cross-platform mobile app for food delivery with real-time tracking.',
    image: 'https://images.pexels.com/photos/4393665/pexels-photo-4393665.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['React Native', 'Firebase', 'Google Maps', 'Push Notifications'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Digital Marketing Campaign',
    category: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategy that increased ROI by 300%.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Corporate Network Infrastructure',
    category: 'Networking',
    description: 'Enterprise-grade network infrastructure setup for a 500+ employee company.',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['Cisco', 'Security Protocols', 'VPN', '24/7 Monitoring'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Real Estate Portal',
    category: 'Web Development',
    description: 'Modern real estate platform with advanced search and virtual tours.',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const categories = ['All', 'Web Development', 'Mobile Development', 'Digital Marketing', 'CMS Development', 'Networking'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our latest projects and see how we've helped businesses achieve their digital goals 
            through innovative solutions and cutting-edge technology.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600' 
                  : 'hover:bg-accent'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className="group overflow-hidden border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                  hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {item.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" className="px-3">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="px-3">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Interested in seeing more of our work?
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
          >
            <a href="/portfolio">View Full Portfolio</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
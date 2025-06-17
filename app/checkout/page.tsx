"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  CreditCard, 
  User, 
  Building, 
  Phone, 
  Mail,
  Calendar,
  FileText,
  Shield,
  Star
} from 'lucide-react';
import Link from 'next/link';

const servicePackages = {
  'web-starter': {
    name: 'Web Development - Starter',
    price: 'PKR 50,000',
    originalPrice: 'PKR 65,000',
    description: 'Perfect for small businesses and startups',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '3 months support',
      'Free hosting for 1 year'
    ],
    deliveryTime: '2-3 weeks',
    category: 'Web Development'
  },
  'web-professional': {
    name: 'Web Development - Professional',
    price: 'PKR 120,000',
    originalPrice: 'PKR 150,000',
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
    deliveryTime: '4-6 weeks',
    category: 'Web Development'
  },
  'mobile-basic': {
    name: 'Mobile App - Basic',
    price: 'PKR 150,000',
    originalPrice: 'PKR 180,000',
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
    deliveryTime: '6-8 weeks',
    category: 'Mobile Development'
  },
  'mobile-professional': {
    name: 'Mobile App - Professional',
    price: 'PKR 350,000',
    originalPrice: 'PKR 420,000',
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
    deliveryTime: '10-12 weeks',
    category: 'Mobile Development'
  }
};

const steps = [
  { id: 1, title: 'Package Selection', icon: FileText },
  { id: 2, title: 'Project Details', icon: Building },
  { id: 3, title: 'Contact Information', icon: User },
  { id: 4, title: 'Payment & Confirmation', icon: CreditCard }
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    // Project Details
    projectTitle: '',
    projectDescription: '',
    requirements: '',
    timeline: '',
    budget: '',
    
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    
    // Additional Services
    additionalServices: [] as string[],
    
    // Payment
    paymentMethod: 'bank-transfer'
  });

  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam && servicePackages[packageParam as keyof typeof servicePackages]) {
      setSelectedPackage(packageParam);
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Order submitted:', { selectedPackage, formData });
    // Here you would typically send the data to your backend
    alert('Thank you! Your order has been submitted. We will contact you within 24 hours.');
  };

  const currentPackage = selectedPackage ? servicePackages[selectedPackage as keyof typeof servicePackages] : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Complete Your <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Order</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Just a few steps to get your project started
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center space-x-4 mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center space-x-2 ${
                      currentStep >= step.id 
                        ? 'text-blue-600' 
                        : 'text-muted-foreground'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-muted-foreground'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="hidden sm:block font-medium">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-muted-foreground/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <steps[currentStep - 1].icon className="h-5 w-5 text-blue-600" />
                      <span>{steps[currentStep - 1].title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Step 1: Package Selection */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Choose Your Package</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(servicePackages).map(([key, pkg]) => (
                              <Card 
                                key={key}
                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                  selectedPackage === key 
                                    ? 'border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                                    : 'border hover:border-blue-300'
                                }`}
                                onClick={() => setSelectedPackage(key)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <Badge className="mb-2">{pkg.category}</Badge>
                                      <h4 className="font-semibold">{pkg.name}</h4>
                                    </div>
                                    {selectedPackage === key && (
                                      <CheckCircle className="h-5 w-5 text-blue-600" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-blue-600">{pkg.price}</span>
                                    <span className="text-sm text-muted-foreground line-through">{pkg.originalPrice}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Project Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Project Title</label>
                              <Input
                                placeholder="Enter your project title"
                                value={formData.projectTitle}
                                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Project Description</label>
                              <Textarea
                                placeholder="Describe your project in detail..."
                                rows={4}
                                value={formData.projectDescription}
                                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Specific Requirements</label>
                              <Textarea
                                placeholder="Any specific features, integrations, or requirements..."
                                rows={3}
                                value={formData.requirements}
                                onChange={(e) => handleInputChange('requirements', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Preferred Timeline</label>
                                <select 
                                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                                  value={formData.timeline}
                                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                                >
                                  <option value="">Select timeline</option>
                                  <option value="asap">ASAP (Rush order)</option>
                                  <option value="1-month">Within 1 month</option>
                                  <option value="2-months">Within 2 months</option>
                                  <option value="3-months">Within 3 months</option>
                                  <option value="flexible">Flexible</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Additional Budget (Optional)</label>
                                <Input
                                  placeholder="PKR 0"
                                  value={formData.budget}
                                  onChange={(e) => handleInputChange('budget', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Contact Information */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">First Name</label>
                              <Input
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Last Name</label>
                              <Input
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Email Address</label>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Phone Number</label>
                              <Input
                                type="tel"
                                placeholder="+92 300 1234567"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Company Name (Optional)</label>
                              <Input
                                placeholder="Your Company"
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Website (Optional)</label>
                              <Input
                                placeholder="https://yourwebsite.com"
                                value={formData.website}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Payment & Confirmation */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                          <div className="space-y-4">
                            <Card className="border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <input 
                                    type="radio" 
                                    id="bank-transfer" 
                                    name="payment" 
                                    checked={formData.paymentMethod === 'bank-transfer'}
                                    onChange={() => handleInputChange('paymentMethod', 'bank-transfer')}
                                  />
                                  <label htmlFor="bank-transfer" className="flex-1">
                                    <div className="font-medium">Bank Transfer (Recommended)</div>
                                    <div className="text-sm text-muted-foreground">
                                      50% advance payment, 50% on completion
                                    </div>
                                  </label>
                                  <Badge className="bg-emerald-600">Most Popular</Badge>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="border">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <input 
                                    type="radio" 
                                    id="consultation" 
                                    name="payment" 
                                    checked={formData.paymentMethod === 'consultation'}
                                    onChange={() => handleInputChange('paymentMethod', 'consultation')}
                                  />
                                  <label htmlFor="consultation" className="flex-1">
                                    <div className="font-medium">Free Consultation First</div>
                                    <div className="text-sm text-muted-foreground">
                                      Schedule a free consultation to discuss your project
                                    </div>
                                  </label>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                            Our Guarantee
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 30-day money-back guarantee</li>
                            <li>• Free revisions until you're satisfied</li>
                            <li>• Dedicated project manager</li>
                            <li>• Regular progress updates</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className="flex items-center space-x-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </Button>

                      {currentStep < 4 ? (
                        <Button
                          onClick={handleNext}
                          disabled={currentStep === 1 && !selectedPackage}
                          className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 flex items-center space-x-2"
                        >
                          <span>Next</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 flex items-center space-x-2"
                        >
                          <span>Submit Order</span>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-2">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentPackage ? (
                      <>
                        <div>
                          <Badge className="mb-2">{currentPackage.category}</Badge>
                          <h3 className="font-semibold">{currentPackage.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {currentPackage.description}
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h4 className="font-medium">Included Features:</h4>
                          <ul className="space-y-1">
                            {currentPackage.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-emerald-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Package Price:</span>
                            <span className="line-through text-muted-foreground">{currentPackage.originalPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Discounted Price:</span>
                            <span className="font-bold text-blue-600">{currentPackage.price}</span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Delivery Time:</span>
                            <span>{currentPackage.deliveryTime}</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400">
                            <Star className="h-4 w-4" />
                            <span className="text-sm font-medium">Limited Time Offer!</span>
                          </div>
                          <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
                            Save {parseInt(currentPackage.originalPrice.replace(/[^\d]/g, '')) - parseInt(currentPackage.price.replace(/[^\d]/g, ''))} PKR with this package
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Select a package to see the summary</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
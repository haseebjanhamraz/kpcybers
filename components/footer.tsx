import Link from 'next/link';
import { Code, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KP</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                KP Cybers
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Leading digital solutions provider in Peshawar, offering comprehensive web development, 
              digital marketing, and networking services to businesses across KPK.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <Link href="/services/web-development" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Web Development
              </Link>
              <Link href="/services/mobile-development" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mobile App Development
              </Link>
              <Link href="/services/digital-marketing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Digital Marketing
              </Link>
              <Link href="/services/networking" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Networking Solutions
              </Link>
              <Link href="/services/cms-development" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                CMS Development
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Peshawar, KPK, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">info@kpcybers.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and tech insights.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" className="text-sm" />
              <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 KP Cybers. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
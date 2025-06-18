"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun, Code, Smartphone, Globe, Network, Settings } from 'lucide-react';
import Image from 'next/image';
const services = [
  { name: 'Web Development', href: '/services/web-development', icon: Code },
  { name: 'Mobile App Development', href: '/services/mobile-app-development', icon: Smartphone },
  { name: 'Digital Marketing', href: '/services/digital-marketing', icon: Globe },
  { name: 'Networking Solutions', href: '/services/networking-solutions', icon: Network },
  { name: 'CMS Development', href: '/services/cms-development', icon: Settings },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-background/80 backdrop-blur-md shadow-lg border-b'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            {theme === 'dark' ? (
              <Image src="/KPC-logo-white-ver.png" alt="KP Cybers" width={75} height={75} className='mt-4 mr-3' />
            ) : (
              <Image src="/KPC-logo.png" alt="KP Cybers" width={100} height={100} />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-blue-600 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-foreground hover:text-blue-600 transition-colors">
                Services
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent transition-colors"
                    >
                      <service.icon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{service.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/about" className="text-foreground hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 px-0"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <div className="hidden md:block">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="w-9 px-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link href="/" className="text-lg font-medium hover:text-blue-600 transition-colors">
                    Home
                  </Link>
                  <div className="space-y-2">
                    <span className="text-lg font-medium">Services</span>
                    <div className="pl-4 space-y-2">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <service.icon className="w-4 h-4" />
                          <span>{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link href="/about" className="text-lg font-medium hover:text-blue-600 transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-medium hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-500 mt-6">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
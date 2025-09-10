import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

import { 
  Sprout, 
  BarChart3, 
  Shield, 
  Zap, 
  Eye, 
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Leaf
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const scrollStep = 1; // pixels per frame
    const scrollSpeed = 30; // milliseconds per frame

    const autoScroll = () => {
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        
        if (scrollLeft + clientWidth >= scrollWidth) {
          // Reset to beginning when reaching the end
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollStep;
        }
      }
    };

    const intervalId = setInterval(autoScroll, scrollSpeed);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Monitor crop health, soil conditions, and weather patterns with live data visualization.',
      color: 'text-primary'
    },
    {
      icon: Eye,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations based on machine learning analysis of your farm data.',
      color: 'text-success'
    },
    {
      icon: Target,
      title: 'Precision Agriculture',
      description: 'Optimize resource usage with precise mapping and targeted interventions.',
      color: 'text-warning'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Early warning systems for pest, disease, and weather-related threats.',
      color: 'text-destructive'
    }
  ];

  const benefits = [
    'Increase crop yields by up to 25%',
    'Reduce water usage by 30%',
    'Lower operational costs by 20%',
    'Minimize environmental impact',
    'Real-time monitoring and alerts',
    'Data-driven decision making'
  ];

  const stats = [
    { value: '10,000+', label: 'Acres Monitored', icon: Leaf },
    { value: '95%', label: 'Accuracy Rate', icon: Target },
    { value: '500+', label: 'Active Farms', icon: Users },
    { value: '25%', label: 'Yield Increase', icon: TrendingUp }
  ];

  const testimonials = [
    {
      name: 'Adanna E',
      role: 'Agricultural Extension Officer',
      location: 'Ebonyi State, Nigeria',
      content: 'AgriShield AI has changed the way we respond to pest outbreaks. The satellite maps and risk alerts help us guide farmers early—saving both crops and income.',
      rating: 5,
      avatar: '🌍'
    },
    {
      name: 'Marcus H.',
      role: 'AgriTech Consultant',
      location: 'USA',
      content: 'This platform is a game-changer. The precision with which AgriShield AI detects climate stress is something we\'ve never had before at scale.',
      rating: 5,
      avatar: '🚜'
    },
    {
      name: 'Abdullahi F',
      role: 'Project Lead, Women in Agriculture Initiative',
      location: 'Nigeria',
      content: 'Our cooperative uses AgriShield AI to assess soil health before planting. It\'s easy to use, even in rural areas, and the WhatsApp bot is perfect for our farmers.',
      rating: 5,
      avatar: '👩‍🌾'
    },
    {
      name: 'Jamal C',
      role: 'Agriculture Researcher',
      location: 'USA',
      content: 'AgriShield AI bridges AI and agronomy beautifully. Their integration with Hugging Face models makes risk summaries feel like talking to an expert agronomist.',
      rating: 5,
      avatar: '🔬'
    },
    {
      name: 'Ngozi O',
      role: 'Farm Owner & Agri-Cooperative Chair',
      location: 'Delta State, Nigeria',
      content: 'Before AgriShield, we relied on guesswork. Now we get real-time NDVI maps and drought warnings, our maize yield has improved dramatically.',
      rating: 5,
      avatar: '🌾'
    },
    {
      name: 'Avery J.',
      role: 'Director',
      location: 'USA',
      content: 'The way AgriShield combines weather data, satellite insights, and AI summaries into a single dashboard is unmatched. It\'s the future of sustainable farming.',
      rating: 5,
      avatar: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AgriIntel™</h1>
                <p className="text-xs text-muted-foreground">Powered by Shield AI Solutions</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-primary hover:bg-primary/90"
            >
              Launch Platform
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Star className="w-3 h-3 mr-1" />
            Next-Generation Farm Intelligence
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent">
            Transform Your Farm with AI-Powered Intelligence
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Revolutionize your agricultural operations with real-time monitoring, predictive analytics, 
            and intelligent recommendations. Make data-driven decisions that maximize yield while 
            minimizing environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/map')}
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center glass border-0 shadow-elegant hover-lift">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Farming</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides everything you need to optimize your farm operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass border-0 shadow-primary hover-lift group">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-background to-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Choose AgriIntel™?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of farmers who have transformed their operations with our 
              intelligent farming platform. Experience measurable improvements in yield, 
              efficiency, and sustainability.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="mt-8 bg-success hover:bg-success/90"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Card className="glass border-0 shadow-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Farm Performance Dashboard</span>
                </CardTitle>
                <CardDescription>Real-time insights at your fingertips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                    <span className="text-sm font-medium">Crop Health</span>
                    <Badge className="bg-success/20 text-success">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                    <span className="text-sm font-medium">Water Usage</span>
                    <Badge className="bg-warning/20 text-warning">Optimized</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm font-medium">Yield Forecast</span>
                    <Badge className="bg-primary/20 text-primary">+25%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Some Feedback</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Users who have enhanced their operations with AgriIntel™
          </p>
        </div>
        
        <div 
          ref={scrollRef}
          className="overflow-x-auto pb-4 scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex space-x-6 w-max">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass border-0 shadow-elegant hover-lift w-80 flex-shrink-0">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-success/10 to-primary/10 border-y border-border/50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the agricultural revolution. Start your free trial today and experience 
            the power of AI-driven farm intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              <Sprout className="mr-2 h-5 w-5" />
              Launch Platform Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/map')}
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">AgriIntel™</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Powered by Shield AI Solutions | Advanced Farm Intelligence Platform
            </p>
            <p className="text-xs text-muted-foreground">
              © 2023 Shield AI Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

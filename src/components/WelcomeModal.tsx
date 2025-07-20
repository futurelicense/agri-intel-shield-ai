import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, BarChart3, Shield, Bot, ChevronRight } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onStartTour }) => {
  const features = [
    {
      icon: Sprout,
      title: 'Real-time Monitoring',
      description: 'Live weather, soil, and crop health data from satellites and sensors'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Performance metrics, trends, and predictive insights for better decisions'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'AI-powered risk analysis for pests, diseases, and weather threats'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get personalized recommendations and expert agricultural advice'
    }
  ];

  const handleGetStarted = () => {
    onClose();
    onStartTour();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="bg-gradient-primary p-6 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sprout className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  Welcome to AgriIntel™
                </DialogTitle>
                <p className="text-white/90 text-sm mt-1">
                  Your comprehensive farm monitoring and analytics platform
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">
              Monitor, Analyze, and Optimize Your Farm
            </h3>
            <p className="text-muted-foreground">
              Leverage cutting-edge technology and AI to make data-driven agricultural decisions
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-muted/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">New User</Badge>
              <h4 className="font-medium text-sm">Ready to get started?</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Take a quick tour to familiarize yourself with the platform's features and capabilities.
            </p>
          </div>

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-sm"
            >
              Explore on my own
            </Button>
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-primary text-sm"
            >
              Take the tour
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
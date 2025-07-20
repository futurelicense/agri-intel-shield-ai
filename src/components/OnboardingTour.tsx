import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to AgriIntel™',
    description: 'Your comprehensive farm monitoring and analytics platform. Let us show you around!',
    target: '.tour-welcome',
    position: 'bottom'
  },
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    description: 'Get a quick overview of your farm\'s current status, alerts, and key metrics at a glance.',
    target: '.tour-executive',
    position: 'bottom'
  },
  {
    id: 'monitoring',
    title: 'Real-time Monitoring',
    description: 'Monitor weather conditions, soil health, and crop status with live data from satellites and sensors.',
    target: '.tour-monitoring',
    position: 'bottom'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Dive deep into performance metrics, trends, and predictive insights for data-driven decisions.',
    target: '.tour-analytics',
    position: 'bottom'
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: 'Get personalized recommendations and ask questions about your farm using our AI-powered chatbot.',
    target: '.tour-chatbot',
    position: 'left'
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowTour(true);
      setCurrentStep(0);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setShowTour(false);
    onClose();
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!showTour) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
      
      {/* Tour Card */}
      <div className="fixed z-[60] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Card className="w-96 border-primary/20 shadow-elegant">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{currentTourStep.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {currentStep + 1} of {tourSteps.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {currentTourStep.description}
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSkip}
                className="text-xs"
              >
                Skip Tour
              </Button>
              
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  size="sm"
                  className="bg-gradient-primary"
                >
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < tourSteps.length - 1 && (
                    <ChevronRight className="h-4 w-4 ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
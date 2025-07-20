import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Info } from 'lucide-react';

interface HelpTooltipProps {
  content: string;
  variant?: 'info' | 'help';
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ 
  content, 
  variant = 'help', 
  side = 'top',
  className = '' 
}) => {
  const Icon = variant === 'info' ? Info : HelpCircle;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className={`inline-flex items-center justify-center ${className}`}>
            <Icon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
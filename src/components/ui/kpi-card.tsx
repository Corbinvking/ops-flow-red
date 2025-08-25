import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'border-border',
  success: 'border-success/20 bg-success/5',
  warning: 'border-warning/20 bg-warning/5',
  danger: 'border-danger/20 bg-danger/5',
};

const trendStyles = {
  up: 'text-success',
  down: 'text-danger',
  neutral: 'text-foreground-muted',
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  variant = 'default'
}) => {
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : 
                   trend?.direction === 'down' ? TrendingDown : Minus;

  return (
    <Card className={cn(
      'card p-4 hover:shadow-lg transition-all duration-300',
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground-muted mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold font-space-grotesk text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {trend && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-sm',
              trendStyles[trend.direction]
            )}>
              <TrendIcon className="h-3 w-3" />
              <span className="font-medium">
                {Math.abs(trend.value)}%
              </span>
              <span className="text-foreground-subtle">vs last period</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-surface-elevated">
          <Icon className="h-5 w-5 text-foreground-muted" />
        </div>
      </div>
    </Card>
  );
};
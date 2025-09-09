import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, DollarSign, Plus, BarChart3, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DealNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const DealNav = ({ currentView, onViewChange }: DealNavProps) => {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-[#22C55E]">DEAL</span>
          <span className="text-muted-foreground">FLOW</span>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <Button 
            variant={currentView === 'overview' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('overview')}
          >
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>

          <Button 
            variant={currentView === 'deals' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('deals')}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Active Deals
          </Button>

          <Button 
            variant={currentView === 'new-deal' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('new-deal')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>

          <Button 
            variant={currentView === 'analytics' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('analytics')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>

          <Button 
            variant={currentView === 'investors' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('investors')}
          >
            <Users className="h-4 w-4 mr-2" />
            Investors
          </Button>
        </div>

        <div className="flex items-center ml-auto">
          <div className="relative w-60">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9"
            />
            <kbd className="pointer-events-none absolute right-2 top-2.5 h-5 select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              Ctrl+K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealNav;

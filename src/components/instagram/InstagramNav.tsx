import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Users, Plus, BarChart3, Target, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InstagramNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const InstagramNav = ({ currentView, onViewChange }: InstagramNavProps) => {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-[#E1306C]">INSTAGRAM</span>
          <span className="text-muted-foreground">SEEDING</span>
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
            variant={currentView === 'creators' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('creators')}
          >
            <Users className="h-4 w-4 mr-2" />
            Browse Creators
          </Button>

          <Button 
            variant={currentView === 'campaign-builder' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('campaign-builder')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Build Campaign
          </Button>

          <Button 
            variant={currentView === 'campaigns' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('campaigns')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            View Campaigns
          </Button>

          <Button 
            variant={currentView === 'targeting' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('targeting')}
          >
            <Target className="h-4 w-4 mr-2" />
            Targeting
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

export default InstagramNav;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, HelpCircle, Target, Users, BarChart3, Zap, Plus } from "lucide-react";
import InstagramNav from '@/components/instagram/InstagramNav';
import CampaignBuilder from '@/components/instagram/CampaignBuilder';
import CreatorDatabase from '@/components/instagram/CreatorDatabase';
import CampaignManagement from '@/components/instagram/CampaignManagement';
import TargetingTools from '@/components/instagram/TargetingTools';

const Instagram = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  if (currentView === 'campaign-builder') {
    return (
      <div>
        <InstagramNav currentView={currentView} onViewChange={setCurrentView} />
        <CampaignBuilder />
      </div>
    );
  }

  if (currentView === 'creators') {
    return (
      <div>
        <InstagramNav currentView={currentView} onViewChange={setCurrentView} />
        <CreatorDatabase />
      </div>
    );
  }

  if (currentView === 'campaigns') {
    return (
      <div>
        <InstagramNav currentView={currentView} onViewChange={setCurrentView} />
        <CampaignManagement />
      </div>
    );
  }

  if (currentView === 'targeting') {
    return (
      <div>
        <InstagramNav currentView={currentView} onViewChange={setCurrentView} />
        <TargetingTools />
      </div>
    );
  }

  return (
    <div>
      <InstagramNav currentView={currentView} onViewChange={setCurrentView} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-end mb-4 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search
                <kbd className="px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted border border-border rounded">
                  Ctrl+K
                </kbd>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsHelpOpen(true)}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
            <h1 className="text-6xl font-bebas text-gradient mb-6 tracking-wider">
              INSTAGRAM SEEDING
            </h1>
            <h2 className="text-4xl font-bebas text-foreground mb-4 tracking-wide">
              CAMPAIGN BUILDER
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E1306C] to-[#E1306C]/60 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
              &gt; Internal operator dashboard for campaign management and creator analytics
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white h-14 px-8 text-lg"
              onClick={() => setCurrentView('campaign-builder')}
            >
              <Plus className="h-5 w-5 mr-2" />
              BUILD CAMPAIGN
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 text-lg border-[#E1306C]/20 hover:bg-[#E1306C]/10"
              onClick={() => setCurrentView('creators')}
            >
              <Users className="h-5 w-5 mr-2" />
              BROWSE CREATORS
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 text-lg border-[#E1306C]/20 hover:bg-[#E1306C]/10"
              onClick={() => setCurrentView('campaigns')}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              VIEW CAMPAIGNS
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#E1306C]/20 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-[#E1306C]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Algorithms</h3>
              <p className="text-zinc-400">
                AI-powered creator matching based on genre, territory, and performance data
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#E1306C]/20 rounded-lg mb-4">
                <Target className="h-6 w-6 text-[#E1306C]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Budget Optimization</h3>
              <p className="text-zinc-400">
                Maximize reach within budget using cost-per-view analysis and efficiency scoring
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#E1306C]/20 rounded-lg mb-4">
                <Users className="h-6 w-6 text-[#E1306C]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Creator Database</h3>
              <p className="text-zinc-400">
                Performance tracking and analytics for continuous algorithm improvement
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#E1306C]/20 rounded-lg mb-4">
                <BarChart3 className="h-6 w-6 text-[#E1306C]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Campaign Analytics</h3>
              <p className="text-zinc-400">
                Track actual performance vs predictions to improve future recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instagram;
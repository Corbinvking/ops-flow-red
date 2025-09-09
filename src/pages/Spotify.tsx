import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import SpotifyNav from '@/components/spotify/SpotifyNav';
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Activity,
  Plus,
  Zap,
  Music2,
  Database,
  Eye,
  BarChart3,
  TrendingDown,
  Users
} from "lucide-react";
import NewCampaign from '@/components/spotify/campaign/NewCampaign';
import PlaylistsPage from '@/components/spotify/playlists/PlaylistsPage';
import CampaignsPage from '@/components/spotify/campaigns/CampaignsPage';

const Spotify = () => {
  const [currentView, setCurrentView] = useState('overview');

  // Mock data - will be replaced with Airtable data
  const stats = {
    totalPlaylists: 185,
    totalReach: 29000000,
    activeCampaigns: 24,
    totalCampaigns: 32,
    algorithmAccuracy: 95.0
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (currentView === 'new-campaign') {
    return (
      <div>
        <SpotifyNav currentView={currentView} onViewChange={setCurrentView} />
        <NewCampaign />
      </div>
    );
  }

  if (currentView === 'playlists') {
    return (
      <div>
        <SpotifyNav currentView={currentView} onViewChange={setCurrentView} />
        <PlaylistsPage />
      </div>
    );
  }

  if (currentView === 'campaigns') {
    return (
      <div>
        <SpotifyNav currentView={currentView} onViewChange={setCurrentView} />
        <CampaignsPage />
      </div>
    );
  }

  if (currentView === 'vendors') {
    return (
      <div>
        <SpotifyNav currentView={currentView} onViewChange={setCurrentView} />
        <PlaylistsPage />
      </div>
    );
  }

  if (currentView === 'clients') {
    return (
      <div>
        <SpotifyNav currentView={currentView} onViewChange={setCurrentView} />
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">Client Management</h1>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SpotifyNav currentView={currentView} onViewChange={setCurrentView} />
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center pt-16 pb-8">
          <h1 className="text-6xl font-bebas text-[#FF6B4B] mb-6 tracking-wider">
            SPOTIFY PLAYLISTING
          </h1>
          <h2 className="text-4xl font-bebas text-foreground mb-4 tracking-wide">
            CAMPAIGN BUILDER
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B4B] to-[#FF6B4B]/60 mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
            &gt; Internal operator dashboard for campaign management and playlist analytics
          </p>
        </section>

        {/* Action Buttons */}
        <section className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-4xl mx-auto">
            <Button 
              className="bg-[#FF6B4B] hover:bg-[#FF6B4B]/90 text-white h-14 px-8 text-lg"
              onClick={() => setCurrentView('new-campaign')}
            >
              <Plus className="h-5 w-5 mr-2" />
              BUILD CAMPAIGN
            </Button>
            <Button 
              variant="outline" 
              className="h-14 px-8 text-lg border-[#FF6B4B]/20 hover:bg-[#FF6B4B]/10"
              onClick={() => setCurrentView('vendors')}
            >
              <Database className="h-5 w-5 mr-2" />
              BROWSE PLAYLISTS
            </Button>
            <Button 
              variant="outline"
              className="h-14 px-8 text-lg border-[#FF6B4B]/20 hover:bg-[#FF6B4B]/10"
              onClick={() => setCurrentView('campaigns')}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              VIEW CAMPAIGNS
            </Button>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B4B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#FF6B4B]/20 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-[#FF6B4B]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Algorithms</h3>
              <p className="text-zinc-400">
                AI-powered playlist matching based on genre, territory, and performance data
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B4B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#FF6B4B]/20 rounded-lg mb-4">
                <Target className="h-6 w-6 text-[#FF6B4B]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Budget Optimization</h3>
              <p className="text-zinc-400">
                Maximize reach within budget using cost-per-stream analysis and efficiency scoring
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B4B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#FF6B4B]/20 rounded-lg mb-4">
                <Users className="h-6 w-6 text-[#FF6B4B]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Playlist Database</h3>
              <p className="text-zinc-400">
                Performance tracking and analytics for continuous algorithm improvement
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-zinc-900 p-6 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B4B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#FF6B4B]/20 rounded-lg mb-4">
                <Activity className="h-6 w-6 text-[#FF6B4B]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Campaign Analytics</h3>
              <p className="text-zinc-400">
                Track actual performance vs predictions to improve future recommendations
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Total Playlists</h3>
                  <Users className="h-4 w-4 text-[#FF6B4B]" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">
                    {stats.totalPlaylists}
                  </p>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-[#FF6B4B]" />
                    <span className="text-[#FF6B4B]">+12%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Total Reach</h3>
                  <TrendingUp className="h-4 w-4 text-[#FF6B4B]" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">
                    {formatNumber(stats.totalReach)}
                  </p>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-[#FF6B4B]" />
                    <span className="text-[#FF6B4B]">+8%</span>
                    <span className="text-muted-foreground">streams available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Active Campaigns</h3>
                  <Target className="h-4 w-4 text-[#FF6B4B]" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">
                    {stats.activeCampaigns}
                  </p>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-[#FF6B4B]" />
                    <span className="text-[#FF6B4B]">+15%</span>
                    <span className="text-muted-foreground">of {stats.totalCampaigns} total</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Algorithm Accuracy</h3>
                  <Zap className="h-4 w-4 text-[#FF6B4B]" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">
                    {stats.algorithmAccuracy}%
                  </p>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-[#FF6B4B]" />
                    <span className="text-[#FF6B4B]">+2%</span>
                    <span className="text-muted-foreground">prediction rate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Spotify;
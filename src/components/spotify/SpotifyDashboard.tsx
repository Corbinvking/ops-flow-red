import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Users,
  Play,
  List,
  Settings
} from 'lucide-react';

const SpotifyDashboard: React.FC = () => {
  // Mock data for UI demonstration
  const stats = {
    totalCampaigns: 24,
    activeCampaigns: 8,
    totalStreamsGoal: '2.4M',
    totalBudget: 125000,
    completedCampaigns: 12,
    totalVendors: 47,
    totalPlaylists: 156,
    totalReach: '890K',
    algorithmAccuracy: 95.0
  };

  const recentCampaigns = [
    {
      id: 1,
      name: 'Summer Vibes 2024',
      status: 'active',
      streamGoal: '500K',
      budget: 15000,
      progress: 75
    },
    {
      id: 2,
      name: 'Hip-Hop Launch',
      status: 'completed',
      streamGoal: '300K',
      budget: 12000,
      progress: 100
    },
    {
      id: 3,
      name: 'EDM Festival Promo',
      status: 'pending',
      streamGoal: '800K',
      budget: 25000,
      progress: 0
    }
  ];

  const topPlaylists = [
    {
      id: 1,
      name: 'Chill Vibes',
      genre: 'Electronic',
      dailyStreams: '45K',
      followers: '125K',
      status: 'active'
    },
    {
      id: 2,
      name: 'Hip-Hop Heat',
      genre: 'Hip-Hop',
      dailyStreams: '38K',
      followers: '98K',
      status: 'active'
    },
    {
      id: 3,
      name: 'Pop Hits Daily',
      genre: 'Pop',
      dailyStreams: '52K',
      followers: '156K',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Hero Section */}
      <section className="text-center pt-8 pb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          SPOTIFY PLAYLISTING
        </h1>
        <h2 className="text-2xl font-bold text-foreground mt-2">
          CAMPAIGN BUILDER
        </h2>
        <p className="text-muted-foreground mt-2">
          Internal operator dashboard for campaign management and playlist analytics
        </p>
      </section>

      {/* Action Buttons */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-4xl mx-auto">
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New Campaign
          </Button>
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            <List className="h-5 w-5" />
            View Playlists
          </Button>
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Manage Clients
          </Button>
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Campaign History
          </Button>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeCampaigns} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stream Goal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStreamsGoal}</div>
            <p className="text-xs text-muted-foreground">
              Combined target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalBudget / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              Allocated funds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Algorithm Accuracy</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.algorithmAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              Success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Campaigns
            </CardTitle>
            <CardDescription>
              Latest campaign activity and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(campaign.status)}`} />
                      <Badge variant="secondary" className="text-xs">
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                    <div>
                      <span className="font-medium">Goal:</span> {campaign.streamGoal}
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span> ${(campaign.budget / 1000).toFixed(0)}K
                    </div>
                    <div>
                      <span className="font-medium">Progress:</span> {campaign.progress}%
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(campaign.progress)}`}
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Playlists */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music2 className="h-5 w-5" />
              Top Performing Playlists
            </CardTitle>
            <CardDescription>
              Highest engagement playlists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPlaylists.map((playlist) => (
                <div key={playlist.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Play className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{playlist.name}</p>
                      <p className="text-xs text-muted-foreground">{playlist.genre}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{playlist.dailyStreams}</p>
                    <p className="text-xs text-muted-foreground">{playlist.followers} followers</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Vendor Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVendors}</div>
            <p className="text-sm text-muted-foreground">
              Active playlist curators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-success" />
              Total Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlaylists}</div>
            <p className="text-sm text-muted-foreground">
              Available for campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-warning" />
              Daily Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReach}</div>
            <p className="text-sm text-muted-foreground">
              Combined daily streams
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button size="lg" className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Campaign
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          View Analytics
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Manage Vendors
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Client Portal
        </Button>
      </div>
    </div>
  );
};

export default SpotifyDashboard;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Target, Users, Zap, Database, BarChart3, Search, HelpCircle, Plus, CheckCircle, History } from 'lucide-react';

const InstagramDashboard: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Mock data for UI demonstration
  const stats = {
    totalCreators: 1247,
    totalReach: '2.4M',
    algorithmAccuracy: 95
  };

  const featureCards = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Smart Algorithms",
      description: "AI-powered creator matching based on genre, territory, and performance data"
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Budget Optimization", 
      description: "Automated budget allocation for maximum reach and engagement"
    },
    {
      icon: <Users className="h-8 w-8 text-success" />,
      title: "Creator Database",
      description: "Access to 1000+ verified creators across all major platforms"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-warning" />,
      title: "Performance Analytics",
      description: "Real-time campaign tracking and ROI measurement"
    }
  ];

  const recentCampaigns = [
    {
      id: '1',
      name: 'Summer Vibes Campaign',
      status: 'active',
      creators: 12,
      budget: 5000,
      reach: '450K'
    },
    {
      id: '2', 
      name: 'Hip-Hop Launch',
      status: 'completed',
      creators: 8,
      budget: 3000,
      reach: '280K'
    },
    {
      id: '3',
      name: 'EDM Festival Promo',
      status: 'pending',
      creators: 15,
      budget: 7500,
      reach: '620K'
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

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Instagram Campaign Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered creator matching and campaign management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsHelpOpen(true)}>
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCreators.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Available for campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReach}</div>
            <p className="text-xs text-muted-foreground">
              Combined audience size
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Algorithm Accuracy</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.algorithmAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              Campaign success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {featureCards.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                {feature.icon}
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Campaigns
          </CardTitle>
          <CardDescription>
            Latest campaign activity and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`} />
                  <div>
                    <h4 className="font-medium">{campaign.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {campaign.creators} creators • ${campaign.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">
                    {campaign.reach} reach
                  </Badge>
                  <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                    {campaign.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Button size="lg" className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Build New Campaign
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Browse Creators
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Quality Assurance
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Workflow Management
        </Button>
      </div>
    </div>
  );
};

export default InstagramDashboard;

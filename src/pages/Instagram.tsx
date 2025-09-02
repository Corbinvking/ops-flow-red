import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Instagram, 
  Users, 
  Target, 
  Zap, 
  BarChart3,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const Instagram: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Instagram className="h-8 w-8 text-pink-500" />
              Instagram Campaign Builder
            </h1>
            <p className="text-muted-foreground mt-2">
              AI-powered creator matching and campaign management from seedstorm-builder
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search Creators
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+5 new this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Algorithm Accuracy</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% improvement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4M</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Builder */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-pink-500" />
                Campaign Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 text-center border-2 border-dashed border-border rounded-lg">
                <Instagram className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Instagram Campaign Builder</h3>
                <p className="text-muted-foreground mb-4">
                  This tab integrates with the seedstorm-builder repository for AI-powered creator matching, 
                  campaign building, and performance tracking.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">AI Matching</Badge>
                  <Badge variant="outline">Creator Database</Badge>
                  <Badge variant="outline">Campaign Analytics</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Find Creators
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Manage Tags
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Repository Info */}
        <Card>
          <CardHeader>
            <CardTitle>Repository Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  This tab integrates with the <strong>seedstorm-builder</strong> repository from GitHub
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">AI Matching</Badge>
                  <Badge variant="secondary">Creator Database</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Repository
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Instagram;
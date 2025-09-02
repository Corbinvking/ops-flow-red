import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Music, 
  Play, 
  Pause, 
  SkipForward,
  BarChart3,
  Plus,
  Filter,
  Clock
} from 'lucide-react';

const SoundCloud: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Cloud className="h-8 w-8 text-orange-500" />
              SoundCloud Queue Manager
            </h1>
            <p className="text-muted-foreground mt-2">
              Advanced queue management and campaign automation from artist-spark
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter Queue
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Track
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Queue Length</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+23 new tracks</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">3 completed today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
              <p className="text-xs text-muted-foreground">Avg per track</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.7%</div>
              <p className="text-xs text-muted-foreground">+5.2% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queue Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-orange-500" />
                Queue Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 text-center border-2 border-dashed border-border rounded-lg">
                <Cloud className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">SoundCloud Queue Manager</h3>
                <p className="text-muted-foreground mb-4">
                  This tab integrates with the artist-spark repository for advanced queue management, 
                  campaign automation, and track processing.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">Queue Management</Badge>
                  <Badge variant="outline">Campaign Automation</Badge>
                  <Badge variant="outline">Track Processing</Badge>
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
                <Play className="h-4 w-4 mr-2" />
                Start Processing
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Pause className="h-4 w-4 mr-2" />
                Pause Queue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <SkipForward className="h-4 w-4 mr-2" />
                Skip Track
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Manage Filters
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
                  This tab integrates with the <strong>artist-spark</strong> repository from GitHub
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Queue Management</Badge>
                  <Badge variant="secondary">Campaign Automation</Badge>
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

export default SoundCloud;
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Image,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

// Mock data (will be replaced with real data integration later)
const mockCampaignStats = {
  totalCampaigns: 24,
  activeCampaigns: 8,
  completedCampaigns: 16,
  averageEngagement: '4.8%',
  totalReach: '1.2M',
  pendingApprovals: 12
};

const mockRecentCampaigns = [
  {
    id: 1,
    name: 'Summer Collection Launch',
    status: 'active',
    progress: 75,
    engagement: '5.2%',
    reach: '250K',
    posts: 12
  },
  {
    id: 2,
    name: 'Brand Awareness Campaign',
    status: 'scheduled',
    progress: 30,
    engagement: '4.7%',
    reach: '180K',
    posts: 8
  },
  {
    id: 3,
    name: 'Product Review Series',
    status: 'completed',
    progress: 100,
    engagement: '6.1%',
    reach: '320K',
    posts: 15
  }
];

const CampaignManagementDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Campaign Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCampaignStats.activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              {mockCampaignStats.totalCampaigns} total campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCampaignStats.averageEngagement}</div>
            <p className="text-xs text-muted-foreground">
              Across all campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCampaignStats.totalReach}</div>
            <p className="text-xs text-muted-foreground">
              Combined audience reached
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>Quick actions for campaign operations</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Schedule Posts</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Approvals</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>Overview of your latest campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentCampaigns.map(campaign => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{campaign.name}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      campaign.status === 'active' ? 'default' :
                      campaign.status === 'scheduled' ? 'secondary' : 'outline'
                    }>
                      {campaign.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {campaign.posts} posts
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{campaign.engagement}</p>
                  <p className="text-xs text-muted-foreground">Engagement Rate</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Content waiting for review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{mockCampaignStats.pendingApprovals}</p>
                  <p className="text-sm text-muted-foreground">Posts to review</p>
                </div>
              </div>
              <Button>Review All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Overall campaign health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{mockCampaignStats.completedCampaigns}</p>
                  <p className="text-sm text-muted-foreground">Completed campaigns</p>
                </div>
              </div>
              <Button variant="outline">View Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignManagementDashboard;
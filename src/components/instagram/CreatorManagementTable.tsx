import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Star,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal
} from 'lucide-react';

// Mock data (will be replaced with real data integration later)
const mockCreators = [
  {
    id: 1,
    name: 'Sarah Johnson',
    handle: '@sarahjcreates',
    followers: '125K',
    engagement: '4.8%',
    posts: 12,
    status: 'active',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Mike Chen',
    handle: '@mikeexplores',
    followers: '89K',
    engagement: '5.2%',
    posts: 8,
    status: 'pending',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Emma Davis',
    handle: '@emmastyle',
    followers: '256K',
    engagement: '3.9%',
    posts: 15,
    status: 'completed',
    rating: 4.8
  }
];

const CreatorManagementTable: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Creator Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              890 total in network
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">
              Based on campaign performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8%</div>
            <p className="text-xs text-muted-foreground">
              Across all creators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Creator Table */}
      <Card>
        <CardHeader>
          <CardTitle>Creator Network</CardTitle>
          <CardDescription>Manage your Instagram creators and influencers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCreators.map(creator => (
              <div key={creator.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-sm text-muted-foreground">{creator.handle}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-sm font-medium">{creator.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{creator.engagement}</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{creator.posts}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <Badge variant={
                    creator.status === 'active' ? 'default' :
                    creator.status === 'pending' ? 'secondary' : 'outline'
                  }>
                    {creator.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Creator Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Average performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span>Likes Rate</span>
                </div>
                <p className="font-medium">4.2%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span>Comment Rate</span>
                </div>
                <p className="font-medium">1.8%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <span>Share Rate</span>
                </div>
                <p className="font-medium">0.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Highest rated creators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCreators
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map(creator => (
                  <div key={creator.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">{creator.handle}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{creator.rating}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorManagementTable;
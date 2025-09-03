import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Activity,
  Music,
  Play,
  Heart,
  Share2,
  Plus
} from 'lucide-react';

const SoundCloudDashboard: React.FC = () => {
  // Mock data for UI demonstration
  const stats = [
    {
      title: "New Submissions",
      value: "12",
      description: "Pending review",
      icon: FileText,
      change: "45 total",
      changeType: "neutral" as const,
    },
    {
      title: "Today's Queue",
      value: "8",
      description: "Tracks to support",
      icon: Calendar,
      change: "5 completed",
      changeType: "neutral" as const,
    },
    {
      title: "Active Members",
      value: "247",
      description: "Total members",
      icon: Users,
      change: "+12",
      changeType: "positive" as const,
    },
    {
      title: "Health Issues",
      value: "3",
      description: "Need attention",
      icon: AlertTriangle,
      change: "-2",
      changeType: "positive" as const,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "submission",
      title: "New submission from BeatMaker_X",
      description: "Electronic - Deep House track submitted",
      time: "2 minutes ago",
      status: "new",
    },
    {
      id: 2,
      type: "approval",
      title: "Track approved for support",
      description: "Hip-Hop track scheduled for tomorrow",
      time: "15 minutes ago",
      status: "approved",
    },
    {
      id: 3,
      type: "inquiry",
      title: "New membership inquiry",
      description: "Producer from London applying to join",
      time: "1 hour ago",
      status: "pending",
    },
    {
      id: 4,
      type: "complaint",
      title: "Complaint resolved",
      description: "Member issue about missing support",
      time: "2 hours ago",
      status: "resolved",
    },
  ];

  const queueItems = [
    {
      id: 1,
      artist: "BeatMaker_X",
      track: "Deep House Vibes",
      genre: "Electronic",
      priority: "high",
      status: "pending",
      submitted: "2 min ago"
    },
    {
      id: 2,
      artist: "HipHop_Producer",
      track: "Urban Flow",
      genre: "Hip-Hop",
      priority: "medium",
      status: "approved",
      submitted: "15 min ago"
    },
    {
      id: 3,
      artist: "EDM_Creator",
      track: "Festival Energy",
      genre: "EDM",
      priority: "low",
      status: "processing",
      submitted: "1 hour ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'resolved': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">SoundCloud Artist Support Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage artist submissions, queue, and member support
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Music className="h-4 w-4 mr-2" />
            Preview Tool
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Submission
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center mt-2">
                <span className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest submissions, approvals, and system updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Queue Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Queue Management
            </CardTitle>
            <CardDescription>
              Current tracks in processing queue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queueItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Music className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.track}</p>
                      <p className="text-xs text-muted-foreground">{item.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {item.genre}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {item.status}
                    </Badge>
                    <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Member Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage artist memberships, profiles, and support levels
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Members
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Health Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor system health, performance metrics, and alerts
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Health
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-warning" />
              Inquiries & Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Handle member inquiries, complaints, and support requests
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Inquiries
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap gap-4">
        <Button size="lg" className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Process Queue
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Support Artists
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default SoundCloudDashboard;

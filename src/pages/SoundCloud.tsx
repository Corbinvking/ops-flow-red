import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SoundCloudNav from '@/components/soundcloud/SoundCloudNav';
import SubmitTrack from '@/components/soundcloud/SubmitTrack';
import MemberPortal from '@/components/soundcloud/MemberPortal';
import Analytics from '@/components/soundcloud/Analytics';
import Members from '@/components/soundcloud/Members';
import { 
  FileText,
  Clock,
  Users,
  AlertTriangle,
  MessageSquare,
  Activity,
  BarChart3,
  CheckCircle,
  Settings,
  Plus
} from "lucide-react";

const SoundCloud: React.FC = () => {
  const [currentView, setCurrentView] = useState('overview');

  // Mock data - will be replaced with Airtable data
  const stats = {
    newSubmissions: {
      count: 2,
      total: 21,
      label: "Pending review"
    },
    todaysQueue: {
      count: 8,
      completed: 5,
      label: "Tracks to support"
    },
    activeMembers: {
      count: 247,
      change: "+12",
      label: "Total members"
    },
    healthIssues: {
      count: 3,
      change: "-2",
      label: "Need attention"
    }
  };

  const recentActivity = [
    {
      type: "submission",
      user: "BeatMaker_X",
      description: "Electronic - Deep House track submitted",
      timeAgo: "2 minutes ago"
    },
    {
      type: "approval",
      description: "Hip-Hop track scheduled for tomorrow",
      timeAgo: "15 minutes ago"
    }
  ];

  if (currentView === 'submit-track') {
    return (
      <div>
        <SoundCloudNav currentView={currentView} onViewChange={setCurrentView} />
        <SubmitTrack />
      </div>
    );
  }

  if (currentView === 'member-dashboard') {
    return (
      <div>
        <SoundCloudNav currentView={currentView} onViewChange={setCurrentView} />
        <MemberPortal />
      </div>
    );
  }

  if (currentView === 'analytics') {
    return (
      <div>
        <SoundCloudNav currentView={currentView} onViewChange={setCurrentView} />
        <Analytics />
      </div>
    );
  }

  if (currentView === 'members') {
    return (
      <div>
        <SoundCloudNav currentView={currentView} onViewChange={setCurrentView} />
        <Members />
      </div>
    );
  }

  return (
    <div>
      <SoundCloudNav currentView={currentView} onViewChange={setCurrentView} />
      <div className="min-h-screen bg-background p-6">
        {/* Welcome Header */}
        <div className="rounded-lg bg-gradient-to-r from-red-800 to-orange-700 p-8 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to your Dashboard</h1>
          <p className="text-white/90">Manage your SoundCloud Groups efficiently with real-time insights and controls.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* New Submissions */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  New Submissions
                </h3>
                <span className="text-4xl font-bold">{stats.newSubmissions.count}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{stats.newSubmissions.label}</span>
                <Badge variant="outline">{stats.newSubmissions.total} total</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Today's Queue */}
          <Card className="bg-card/50 backdrop-blur border-red-600/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Queue
                </h3>
                <span className="text-4xl font-bold">{stats.todaysQueue.count}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{stats.todaysQueue.label}</span>
                <Badge variant="secondary">{stats.todaysQueue.completed} completed</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Active Members */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Members
                </h3>
                <span className="text-4xl font-bold">{stats.activeMembers.count}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{stats.activeMembers.label}</span>
                <Badge variant="success">{stats.activeMembers.change}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Health Issues */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Health Issues
                </h3>
                <span className="text-4xl font-bold">{stats.healthIssues.count}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{stats.healthIssues.label}</span>
                <Badge variant="destructive">{stats.healthIssues.change}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">Latest updates across your dashboard</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className={`rounded-full p-2 ${
                      activity.type === 'submission' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                    }`}>
                      {activity.type === 'submission' ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      {activity.user && (
                        <p className="font-medium">New submission from {activity.user}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="default"
                  onClick={() => setCurrentView('submit-track')}
                >
                  <FileText className="h-4 w-4" />
                  Review New Submissions
                  <Badge className="ml-auto">2</Badge>
                </Button>
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="outline"
                  onClick={() => setCurrentView('member-dashboard')}
                >
                  <Clock className="h-4 w-4" />
                  Check Today's Queue
                  <Badge variant="secondary" className="ml-auto">8</Badge>
                </Button>
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="outline"
                  onClick={() => setCurrentView('members')}
                >
                  <MessageSquare className="h-4 w-4" />
                  Handle Inquiries
                </Button>
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="outline"
                  onClick={() => setCurrentView('analytics')}
                >
                  <Settings className="h-4 w-4" />
                  Configure Settings
                  <Badge variant="destructive" className="ml-auto">3</Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoundCloud;
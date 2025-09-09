import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Music, 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target
} from "lucide-react";

const MemberDashboard: React.FC = () => {
  const recentTracks = [
    {
      id: 1,
      title: "Summer Vibes",
      plays: 12500,
      likes: 450,
      comments: 32,
      shares: 18,
      progress: 75
    },
    {
      id: 2,
      title: "Night Drive",
      plays: 8300,
      likes: 280,
      comments: 24,
      shares: 12,
      progress: 45
    },
    {
      id: 3,
      title: "Ocean Dreams",
      plays: 15200,
      likes: 620,
      comments: 48,
      shares: 25,
      progress: 90
    }
  ];

  const insights = [
    {
      title: "Best Performing Time",
      value: "2PM - 6PM",
      description: "Peak engagement window",
      icon: Clock,
      color: "text-primary"
    },
    {
      title: "Top Genre",
      value: "Electronic",
      description: "Most successful category",
      icon: Music,
      color: "text-warning"
    },
    {
      title: "Target Audience",
      value: "18-24",
      description: "Primary age group",
      icon: Target,
      color: "text-success"
    },
    {
      title: "Growth Rate",
      value: "+24%",
      description: "Month over month",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <insight.icon className={`h-5 w-5 ${insight.color}`} />
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Tracks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tracks</CardTitle>
          <CardDescription>Performance overview of your latest submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentTracks.map(track => (
              <div key={track.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Music className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{track.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          {track.plays.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {track.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {track.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          {track.shares}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant={track.progress > 70 ? "default" : "secondary"}>
                    {track.progress}% Complete
                  </Badge>
                </div>
                <Progress value={track.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Engagement Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Analytics Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Audience Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Growth Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberDashboard;
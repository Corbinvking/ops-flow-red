import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Music2, 
  Users, 
  BarChart3, 
  Clock, 
  Calendar,
  Heart,
  MessageSquare,
  Share2,
  Download,
  TrendingUp,
  Activity
} from "lucide-react";

const MemberPortal = () => {
  // Mock data - will be replaced with Airtable data
  const trackStats = {
    totalTracks: 12,
    totalPlays: 25000,
    avgEngagement: 4.2,
    recentSubmissions: 3
  };

  const recentTracks = [
    {
      id: 1,
      title: "Summer Vibes",
      plays: 12500,
      likes: 450,
      comments: 32,
      shares: 85,
      status: "promoted",
      growth: "+15%"
    },
    {
      id: 2,
      title: "Night Drive",
      plays: 8300,
      likes: 320,
      comments: 28,
      shares: 64,
      status: "active",
      growth: "+8%"
    },
    {
      id: 3,
      title: "Midnight Dreams",
      plays: 4200,
      likes: 180,
      comments: 15,
      shares: 35,
      status: "pending",
      growth: "-"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Member Portal</h1>
          <p className="text-muted-foreground">Track your music performance and promotion status</p>
        </div>
        <Button className="bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white gap-2">
          <Music2 className="h-4 w-4" />
          Submit New Track
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tracks</p>
                <h3 className="text-2xl font-bold">{trackStats.totalTracks}</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <Music2 className="h-4 w-4 text-[#FF7F50]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Plays</p>
                <h3 className="text-2xl font-bold">{trackStats.totalPlays.toLocaleString()}</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-[#FF7F50]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                <h3 className="text-2xl font-bold">{trackStats.avgEngagement}%</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <Activity className="h-4 w-4 text-[#FF7F50]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent Submissions</p>
                <h3 className="text-2xl font-bold">{trackStats.recentSubmissions}</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#FF7F50]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Track Performance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Track Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentTracks.map(track => (
              <div key={track.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{track.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge
                        variant={
                          track.status === 'promoted' ? 'success' :
                          track.status === 'active' ? 'secondary' :
                          'outline'
                        }
                      >
                        {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                      </Badge>
                      {track.growth !== '-' && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {track.growth}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>

                <div className="grid grid-cols-4 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{track.plays.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Plays</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{track.likes.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{track.comments}</div>
                      <div className="text-xs text-muted-foreground">Comments</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{track.shares}</div>
                      <div className="text-xs text-muted-foreground">Shares</div>
                    </div>
                  </div>
                </div>

                <Progress value={
                  track.status === 'promoted' ? 100 :
                  track.status === 'active' ? 65 :
                  30
                } className="h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Promotion History */}
      <Card>
        <CardHeader>
          <CardTitle>Promotion History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Calendar className="h-8 w-8 text-[#FF7F50]" />
              <div className="flex-1">
                <h4 className="font-semibold">Summer Vibes - Promotion Campaign</h4>
                <p className="text-sm text-muted-foreground">Campaign completed with 12.5K plays achieved</p>
              </div>
              <Badge variant="success">Completed</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Calendar className="h-8 w-8 text-[#FF7F50]" />
              <div className="flex-1">
                <h4 className="font-semibold">Night Drive - Promotion Campaign</h4>
                <p className="text-sm text-muted-foreground">Campaign in progress - 65% complete</p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Calendar className="h-8 w-8 text-[#FF7F50]" />
              <div className="flex-1">
                <h4 className="font-semibold">Midnight Dreams - Promotion Campaign</h4>
                <p className="text-sm text-muted-foreground">Campaign scheduled to start next week</p>
              </div>
              <Badge variant="outline">Scheduled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberPortal;

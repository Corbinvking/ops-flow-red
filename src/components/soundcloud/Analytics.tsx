import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  Music2,
  Heart,
  Share2,
  Download,
  Clock,
  Calendar
} from "lucide-react";

const Analytics = () => {
  // Mock data - will be replaced with Airtable data
  const overallStats = {
    totalPlays: 125000,
    avgEngagement: 4.2,
    totalTracks: 85,
    activePromos: 12
  };

  const topGenres = [
    { name: "Electronic", percentage: 85, count: 35 },
    { name: "Hip-Hop", percentage: 75, count: 28 },
    { name: "Indie", percentage: 65, count: 22 }
  ];

  const topTerritories = [
    { name: "United States", percentage: 45, count: "56.2K" },
    { name: "United Kingdom", percentage: 25, count: "31.2K" },
    { name: "Germany", percentage: 15, count: "18.7K" },
    { name: "Canada", percentage: 15, count: "18.7K" }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Plays</p>
                <h3 className="text-2xl font-bold">{overallStats.totalPlays.toLocaleString()}</h3>
                <p className="text-sm text-[#FF7F50]">+12.5% vs last period</p>
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
                <h3 className="text-2xl font-bold">{overallStats.avgEngagement}%</h3>
                <p className="text-sm text-[#FF7F50]">+0.8% vs last period</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-[#FF7F50]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tracks</p>
                <h3 className="text-2xl font-bold">{overallStats.totalTracks}</h3>
                <p className="text-sm text-[#FF7F50]">+5 new this period</p>
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
                <p className="text-sm text-muted-foreground">Active Promotions</p>
                <h3 className="text-2xl font-bold">{overallStats.activePromos}</h3>
                <p className="text-sm text-[#FF7F50]">+3 vs last period</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-[#FF7F50]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Genre Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Genre Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topGenres.map(genre => (
                <div key={genre.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{genre.name}</span>
                    <span className="text-muted-foreground">{genre.count} tracks</span>
                  </div>
                  <Progress value={genre.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">{genre.percentage}% of total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographical Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTerritories.map(territory => (
                <div key={territory.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{territory.name}</span>
                    <span className="text-muted-foreground">{territory.count} plays</span>
                  </div>
                  <Progress value={territory.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">{territory.percentage}% of total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-[#FF7F50]" />
                  <div>
                    <div className="text-2xl font-bold">8.5K</div>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-[#FF7F50]" />
                  <div>
                    <div className="text-2xl font-bold">2.3K</div>
                    <p className="text-sm text-muted-foreground">Total Shares</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-[#FF7F50]" />
                  <div>
                    <div className="text-2xl font-bold">1.8K</div>
                    <p className="text-sm text-muted-foreground">Downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#FF7F50]" />
                  <div>
                    <div className="text-2xl font-bold">4:25</div>
                    <p className="text-sm text-muted-foreground">Avg. Listen Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

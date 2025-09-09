import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users,
  Building2,
  Target,
  Clock,
  Calendar
} from "lucide-react";

const DealAnalytics = () => {
  // Mock data - will be replaced with Airtable data
  const overallStats = {
    totalDeals: 45,
    totalValue: "125M",
    avgDealSize: "2.8M",
    activeInvestors: 85
  };

  const dealsByStage = [
    { name: "Initial Review", percentage: 35, count: 15 },
    { name: "Due Diligence", percentage: 25, count: 12 },
    { name: "Term Sheet", percentage: 20, count: 10 },
    { name: "Closing", percentage: 20, count: 8 }
  ];

  const dealsByIndustry = [
    { name: "Technology", percentage: 45, value: "$56.2M" },
    { name: "Healthcare", percentage: 25, value: "$31.2M" },
    { name: "Finance", percentage: 15, value: "$18.7M" },
    { name: "Retail", percentage: 15, value: "$18.7M" }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Deal Analytics</h1>
          <p className="text-muted-foreground">Track deal performance and insights</p>
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
                <p className="text-sm text-muted-foreground">Total Deals</p>
                <h3 className="text-2xl font-bold">{overallStats.totalDeals}</h3>
                <p className="text-sm text-[#22C55E]">+8 vs last period</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-[#22C55E]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <h3 className="text-2xl font-bold">${overallStats.totalValue}</h3>
                <p className="text-sm text-[#22C55E]">+$15M vs last period</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-[#22C55E]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <h3 className="text-2xl font-bold">${overallStats.avgDealSize}</h3>
                <p className="text-sm text-[#22C55E]">+$0.3M vs last period</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-[#22C55E]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Investors</p>
                <h3 className="text-2xl font-bold">{overallStats.activeInvestors}</h3>
                <p className="text-sm text-[#22C55E]">+12 vs last period</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-[#22C55E]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Stage Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Deal Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealsByStage.map(stage => (
                <div key={stage.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{stage.name}</span>
                    <span className="text-muted-foreground">{stage.count} deals</span>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">{stage.percentage}% of total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Value by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealsByIndustry.map(industry => (
                <div key={industry.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{industry.name}</span>
                    <span className="text-muted-foreground">{industry.value}</span>
                  </div>
                  <Progress value={industry.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">{industry.percentage}% of total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#22C55E]" />
                  <div>
                    <div className="text-2xl font-bold">45 days</div>
                    <p className="text-sm text-muted-foreground">Avg Time to Close</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#22C55E]" />
                  <div>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#22C55E]" />
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Avg Investors/Deal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#22C55E]" />
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-sm text-muted-foreground">Deals Closing Soon</p>
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

export default DealAnalytics;

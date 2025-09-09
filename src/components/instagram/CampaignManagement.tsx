import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Plus, MoreHorizontal, Calendar, Users, BarChart3, DollarSign } from "lucide-react";

const CampaignManagement = () => {
  // Mock data - will be replaced with Airtable data
  const campaigns = [
    {
      id: 1,
      name: "Summer Collection Launch",
      status: "active",
      progress: 65,
      budget: "$5,000",
      spent: "$3,250",
      reach: "125K",
      engagement: "4.2%",
      creators: 8,
      startDate: "2024-03-01",
      endDate: "2024-03-31"
    },
    {
      id: 2,
      name: "Spring Lifestyle Series",
      status: "completed",
      progress: 100,
      budget: "$3,000",
      spent: "$3,000",
      reach: "89K",
      engagement: "3.8%",
      creators: 5,
      startDate: "2024-02-01",
      endDate: "2024-02-28"
    },
    {
      id: 3,
      name: "Product Launch Campaign",
      status: "scheduled",
      progress: 0,
      budget: "$7,500",
      spent: "$0",
      reach: "0",
      engagement: "0%",
      creators: 12,
      startDate: "2024-04-01",
      endDate: "2024-04-30"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Campaign Management</h1>
          <p className="text-muted-foreground">Track and manage your Instagram seeding campaigns</p>
        </div>
        <Button className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-[#E1306C]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <h3 className="text-2xl font-bold">214K</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-[#E1306C]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                <h3 className="text-2xl font-bold">4.0%</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-[#E1306C]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <h3 className="text-2xl font-bold">$15.5K</h3>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-[#E1306C]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search campaigns..." className="pl-8" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Reach</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Creators</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map(campaign => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <div className="font-semibold">{campaign.name}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === 'active' ? 'success' :
                      campaign.status === 'completed' ? 'secondary' :
                      'outline'
                    }
                  >
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-[100px]">
                    <Progress value={campaign.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{campaign.progress}%</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{campaign.spent}</div>
                    <div className="text-muted-foreground">of {campaign.budget}</div>
                  </div>
                </TableCell>
                <TableCell>{campaign.reach}</TableCell>
                <TableCell>{campaign.engagement}</TableCell>
                <TableCell>{campaign.creators}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(campaign.startDate).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">to {new Date(campaign.endDate).toLocaleDateString()}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CampaignManagement;

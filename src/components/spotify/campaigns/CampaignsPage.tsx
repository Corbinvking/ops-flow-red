import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter,
  Plus,
  BarChart3,
  Target,
  Calendar,
  ArrowUpDown,
  MoreHorizontal,
  Music2
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  artist: string;
  targetStreams: number;
  currentStreams: number;
  budget: number;
  startDate: string;
  status: 'active' | 'completed' | 'paused';
  performance: 'high' | 'on-track' | 'under-performing';
}

const CampaignsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [performanceFilter, setPerformanceFilter] = useState('');

  // Mock data
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Vibes Promotion',
      artist: 'ElectroArtist',
      targetStreams: 100000,
      currentStreams: 75000,
      budget: 5000,
      startDate: '2024-02-01',
      status: 'active',
      performance: 'high'
    },
    {
      id: '2',
      name: 'Hip-Hop Revolution',
      artist: 'RapMaster',
      targetStreams: 200000,
      currentStreams: 150000,
      budget: 8000,
      startDate: '2024-01-15',
      status: 'active',
      performance: 'on-track'
    },
    {
      id: '3',
      name: 'Indie Dreams',
      artist: 'AcousticSoul',
      targetStreams: 50000,
      currentStreams: 20000,
      budget: 3000,
      startDate: '2024-02-10',
      status: 'active',
      performance: 'under-performing'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getProgressColor = (performance: Campaign['performance']) => {
    switch (performance) {
      case 'high': return 'bg-[#1DB954]';
      case 'on-track': return 'bg-yellow-500';
      case 'under-performing': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Campaign Management</h1>
          <p className="text-muted-foreground">Track and manage your active campaigns</p>
        </div>
        <Button className="bg-[#1DB954] hover:bg-[#1DB954]/90">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-muted-foreground">Active Campaigns</h3>
              <Target className="h-4 w-4 text-[#1DB954]" />
            </div>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'active').length}</div>
            <div className="text-sm text-muted-foreground">Currently running</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-muted-foreground">Total Streams</h3>
              <BarChart3 className="h-4 w-4 text-[#1DB954]" />
            </div>
            <div className="text-2xl font-bold">
              {formatNumber(campaigns.reduce((sum, c) => sum + c.currentStreams, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Across all campaigns</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-muted-foreground">Total Budget</h3>
              <Target className="h-4 w-4 text-[#1DB954]" />
            </div>
            <div className="text-2xl font-bold">
              ${formatNumber(campaigns.reduce((sum, c) => sum + c.budget, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Allocated budget</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="high">High Performing</SelectItem>
                <SelectItem value="on-track">On Track</SelectItem>
                <SelectItem value="under-performing">Under Performing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CAMPAIGN</TableHead>
                <TableHead>ARTIST</TableHead>
                <TableHead>PROGRESS</TableHead>
                <TableHead className="text-right">BUDGET</TableHead>
                <TableHead>START DATE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map(campaign => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.artist}</TableCell>
                  <TableCell className="w-[300px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{formatNumber(campaign.currentStreams)}</span>
                        <span className="text-muted-foreground">
                          {formatNumber(campaign.targetStreams)}
                        </span>
                      </div>
                      <Progress 
                        value={(campaign.currentStreams / campaign.targetStreams) * 100}
                        className={getProgressColor(campaign.performance)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${formatNumber(campaign.budget)}</TableCell>
                  <TableCell>{new Date(campaign.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      campaign.status === 'active' ? 'default' :
                      campaign.status === 'completed' ? 'secondary' : 'outline'
                    }>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Pause Campaign</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsPage;

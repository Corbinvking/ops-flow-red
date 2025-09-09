import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, MoreHorizontal, Music2, Users, BarChart3, Calendar } from "lucide-react";

const Members = () => {
  // Mock data - will be replaced with Airtable data
  const members = [
    {
      id: 1,
      name: "John Smith",
      handle: "@johnsmith",
      tracks: 8,
      totalPlays: "125K",
      avgEngagement: "4.2%",
      lastActive: "2024-03-15",
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      handle: "@sarahw",
      tracks: 12,
      totalPlays: "250K",
      avgEngagement: "3.8%",
      lastActive: "2024-03-14",
      status: "active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      handle: "@mikej",
      tracks: 5,
      totalPlays: "75K",
      avgEngagement: "4.5%",
      lastActive: "2024-03-10",
      status: "inactive"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Member Management</h1>
          <p className="text-muted-foreground">Manage and monitor member activity</p>
        </div>
        <Button className="bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <h3 className="text-2xl font-bold">247</h3>
                <p className="text-sm text-[#FF7F50]">+12 this month</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-[#FF7F50]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <h3 className="text-2xl font-bold">185</h3>
                <p className="text-sm text-[#FF7F50]">75% of total</p>
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
                <p className="text-sm text-muted-foreground">Total Tracks</p>
                <h3 className="text-2xl font-bold">1.2K</h3>
                <p className="text-sm text-[#FF7F50]">Avg 5 per member</p>
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
                <p className="text-sm text-muted-foreground">New This Week</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-[#FF7F50]">+15% vs last week</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-[#FF7F50]" />
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
                <Input placeholder="Search members..." className="pl-8" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="plays">Most Plays</SelectItem>
                <SelectItem value="engagement">Highest Engagement</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Member</TableHead>
              <TableHead>Tracks</TableHead>
              <TableHead>Total Plays</TableHead>
              <TableHead>Avg. Engagement</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map(member => (
              <TableRow key={member.id}>
                <TableCell>
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.handle}</div>
                  </div>
                </TableCell>
                <TableCell>{member.tracks}</TableCell>
                <TableCell>{member.totalPlays}</TableCell>
                <TableCell>{member.avgEngagement}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(member.lastActive).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={member.status === 'active' ? 'success' : 'secondary'}
                  >
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
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

export default Members;

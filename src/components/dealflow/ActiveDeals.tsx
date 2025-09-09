import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Plus, MoreHorizontal, DollarSign, Users, BarChart3, Calendar } from "lucide-react";

const ActiveDeals = () => {
  // Mock data - will be replaced with Airtable data
  const deals = [
    {
      id: 1,
      name: "Tech Startup Series A",
      company: "InnovateTech",
      stage: "Due Diligence",
      amount: "$5M",
      progress: 65,
      investors: 8,
      deadline: "2024-03-31",
      status: "active"
    },
    {
      id: 2,
      name: "E-commerce Seed Round",
      company: "ShopFlow",
      stage: "Term Sheet",
      amount: "$2M",
      progress: 85,
      investors: 5,
      deadline: "2024-03-25",
      status: "closing"
    },
    {
      id: 3,
      name: "SaaS Series B",
      company: "CloudSolutions",
      stage: "Initial Review",
      amount: "$10M",
      progress: 25,
      investors: 12,
      deadline: "2024-04-15",
      status: "active"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Active Deals</h1>
          <p className="text-muted-foreground">Track and manage ongoing investment opportunities</p>
        </div>
        <Button className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add New Deal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-[#22C55E]">+3 this month</p>
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
                <p className="text-sm text-muted-foreground">Total Pipeline</p>
                <h3 className="text-2xl font-bold">$45M</h3>
                <p className="text-sm text-[#22C55E]">+$12M vs last month</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-[#22C55E]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Investors</p>
                <h3 className="text-2xl font-bold">85</h3>
                <p className="text-sm text-[#22C55E]">+15 new this month</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-[#22C55E]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closing Soon</p>
                <h3 className="text-2xl font-bold">4</h3>
                <p className="text-sm text-[#22C55E]">Next 30 days</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-[#22C55E]" />
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
                <Input placeholder="Search deals..." className="pl-8" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="initial">Initial Review</SelectItem>
                <SelectItem value="diligence">Due Diligence</SelectItem>
                <SelectItem value="term">Term Sheet</SelectItem>
                <SelectItem value="closing">Closing</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closing">Closing</SelectItem>
                <SelectItem value="hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Deal</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Investors</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map(deal => (
              <TableRow key={deal.id}>
                <TableCell>
                  <div>
                    <div className="font-semibold">{deal.name}</div>
                    <div className="text-sm text-muted-foreground">{deal.company}</div>
                  </div>
                </TableCell>
                <TableCell>{deal.stage}</TableCell>
                <TableCell>{deal.amount}</TableCell>
                <TableCell>
                  <div className="w-[100px]">
                    <Progress value={deal.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{deal.progress}% complete</div>
                  </div>
                </TableCell>
                <TableCell>{deal.investors}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(deal.deadline).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      deal.status === 'closing' ? 'success' :
                      deal.status === 'active' ? 'secondary' :
                      'outline'
                    }
                  >
                    {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
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

export default ActiveDeals;

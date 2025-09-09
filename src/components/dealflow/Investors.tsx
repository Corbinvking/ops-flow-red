import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, MoreHorizontal, DollarSign, Users, BarChart3, Building2 } from "lucide-react";

const Investors = () => {
  // Mock data - will be replaced with Airtable data
  const investors = [
    {
      id: 1,
      name: "John Smith",
      firm: "Tech Ventures",
      type: "VC",
      investments: 12,
      totalInvested: "$5.5M",
      avgDealSize: "$450K",
      lastActive: "2024-03-15",
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      firm: "Angel Network",
      type: "Angel",
      investments: 8,
      totalInvested: "$2.8M",
      avgDealSize: "$350K",
      lastActive: "2024-03-14",
      status: "active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      firm: "Growth Capital",
      type: "PE",
      investments: 5,
      totalInvested: "$15M",
      avgDealSize: "$3M",
      lastActive: "2024-03-10",
      status: "inactive"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Investor Management</h1>
          <p className="text-muted-foreground">Track and manage investor relationships</p>
        </div>
        <Button className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add Investor
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investors</p>
                <h3 className="text-2xl font-bold">85</h3>
                <p className="text-sm text-[#22C55E]">+12 this month</p>
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
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <h3 className="text-2xl font-bold">$45M</h3>
                <p className="text-sm text-[#22C55E]">+$8M this month</p>
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
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-[#22C55E]">+3 this month</p>
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
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <h3 className="text-2xl font-bold">$850K</h3>
                <p className="text-sm text-[#22C55E]">+15% vs last month</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-[#22C55E]" />
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
                <Input placeholder="Search investors..." className="pl-8" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vc">VC</SelectItem>
                <SelectItem value="angel">Angel</SelectItem>
                <SelectItem value="pe">PE</SelectItem>
              </SelectContent>
            </Select>
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
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investors Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Investor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Investments</TableHead>
              <TableHead>Total Invested</TableHead>
              <TableHead>Avg Deal Size</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investors.map(investor => (
              <TableRow key={investor.id}>
                <TableCell>
                  <div>
                    <div className="font-semibold">{investor.name}</div>
                    <div className="text-sm text-muted-foreground">{investor.firm}</div>
                  </div>
                </TableCell>
                <TableCell>{investor.type}</TableCell>
                <TableCell>{investor.investments}</TableCell>
                <TableCell>{investor.totalInvested}</TableCell>
                <TableCell>{investor.avgDealSize}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(investor.lastActive).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={investor.status === 'active' ? 'success' : 'secondary'}
                  >
                    {investor.status.charAt(0).toUpperCase() + investor.status.slice(1)}
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

export default Investors;

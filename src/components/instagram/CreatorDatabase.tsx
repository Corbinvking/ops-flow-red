import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, MoreHorizontal, Star, Users, BarChart3, DollarSign } from "lucide-react";

const CreatorDatabase = () => {
  const [view, setView] = useState('grid');

  // Mock data - will be replaced with Airtable data
  const creators = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@lifestyle_sarah",
      followers: "125K",
      engagement: "3.8%",
      category: "Lifestyle",
      location: "Los Angeles, CA",
      rate: "$500",
      status: "available"
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mike.travels",
      followers: "89K",
      engagement: "4.2%",
      category: "Travel",
      location: "New York, NY",
      rate: "$350",
      status: "campaign"
    },
    {
      id: 3,
      name: "Emma Davis",
      handle: "@emma.fitness",
      followers: "250K",
      engagement: "5.1%",
      category: "Fitness",
      location: "Miami, FL",
      rate: "$800",
      status: "available"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Creator Database</h1>
          <p className="text-muted-foreground">Browse and manage your creator network</p>
        </div>
        <Button className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white gap-2">
          <Plus className="h-4 w-4" />
          Add New Creator
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search creators..." className="pl-8" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="campaign">In Campaign</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex justify-end gap-2 mb-6">
        <Button 
          variant={view === 'grid' ? 'secondary' : 'ghost'} 
          size="sm"
          onClick={() => setView('grid')}
        >
          Grid View
        </Button>
        <Button 
          variant={view === 'table' ? 'secondary' : 'ghost'} 
          size="sm"
          onClick={() => setView('table')}
        >
          Table View
        </Button>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map(creator => (
            <Card key={creator.id} className="group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground">{creator.handle}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Users className="h-4 w-4" />
                        Followers
                      </div>
                      <div className="font-semibold">{creator.followers}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <BarChart3 className="h-4 w-4" />
                        Engagement
                      </div>
                      <div className="font-semibold">{creator.engagement}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Star className="h-4 w-4" />
                      Category
                    </div>
                    <div className="font-semibold">{creator.category}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4" />
                      Rate per Post
                    </div>
                    <div className="font-semibold">{creator.rate}</div>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <Badge variant={creator.status === 'available' ? 'success' : 'secondary'}>
                      {creator.status === 'available' ? 'Available' : 'In Campaign'}
                    </Badge>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.map(creator => (
                <TableRow key={creator.id}>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{creator.name}</div>
                      <div className="text-sm text-muted-foreground">{creator.handle}</div>
                    </div>
                  </TableCell>
                  <TableCell>{creator.category}</TableCell>
                  <TableCell>{creator.followers}</TableCell>
                  <TableCell>{creator.engagement}</TableCell>
                  <TableCell>{creator.location}</TableCell>
                  <TableCell>{creator.rate}</TableCell>
                  <TableCell>
                    <Badge variant={creator.status === 'available' ? 'success' : 'secondary'}>
                      {creator.status === 'available' ? 'Available' : 'In Campaign'}
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
      )}
    </div>
  );
};

export default CreatorDatabase;

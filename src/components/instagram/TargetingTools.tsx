import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Users, BarChart3, Search, Filter, Globe, Hash } from "lucide-react";

const TargetingTools = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Targeting Tools</h1>
          <p className="text-muted-foreground">Analyze and optimize your campaign targeting</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="audience" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 gap-4 bg-muted p-1">
          <TabsTrigger value="audience" className="data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">
            Audience Analysis
          </TabsTrigger>
          <TabsTrigger value="hashtags" className="data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">
            Hashtag Research
          </TabsTrigger>
          <TabsTrigger value="locations" className="data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">
            Location Insights
          </TabsTrigger>
        </TabsList>

        {/* Audience Analysis */}
        <TabsContent value="audience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Age Range</p>
                        <h3 className="text-2xl font-bold">18-24</h3>
                        <p className="text-sm text-[#E1306C]">Primary</p>
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
                        <p className="text-sm text-muted-foreground">Gender Split</p>
                        <h3 className="text-2xl font-bold">65/35</h3>
                        <p className="text-sm text-[#E1306C]">F/M Ratio</p>
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
                        <p className="text-sm text-muted-foreground">Top Interest</p>
                        <h3 className="text-2xl font-bold">Fashion</h3>
                        <p className="text-sm text-[#E1306C]">42% Affinity</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Target className="h-4 w-4 text-[#E1306C]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <h3 className="text-2xl font-bold">4.2%</h3>
                        <p className="text-sm text-[#E1306C]">Avg Rate</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-[#E1306C]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label>Interest Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label>Age Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13-17">13-17</SelectItem>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35+">35+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label>Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mt-8">Analyze</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hashtag Research */}
        <TabsContent value="hashtags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hashtag Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search hashtags..." className="pl-8" />
                  </div>
                </div>
                <Button>Analyze</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Hash className="h-4 w-4 text-[#E1306C]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">#fashion</h4>
                        <p className="text-sm text-muted-foreground">850M posts</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                      <div className="text-lg font-semibold">4.2%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Hash className="h-4 w-4 text-[#E1306C]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">#style</h4>
                        <p className="text-sm text-muted-foreground">620M posts</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                      <div className="text-lg font-semibold">3.8%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Hash className="h-4 w-4 text-[#E1306C]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">#ootd</h4>
                        <p className="text-sm text-muted-foreground">450M posts</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                      <div className="text-lg font-semibold">4.5%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Location Insights */}
        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search locations..." className="pl-8" />
                  </div>
                </div>
                <Button>Analyze</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-[#E1306C]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Los Angeles</h4>
                        <p className="text-sm text-muted-foreground">12M tagged posts</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                      <div className="text-lg font-semibold">4.8%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-[#E1306C]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">New York</h4>
                        <p className="text-sm text-muted-foreground">15M tagged posts</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                      <div className="text-lg font-semibold">4.2%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-[#E1306C]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Miami</h4>
                        <p className="text-sm text-muted-foreground">8M tagged posts</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                      <div className="text-lg font-semibold">5.1%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TargetingTools;

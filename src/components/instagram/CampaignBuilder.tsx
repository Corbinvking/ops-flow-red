import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, Target, BarChart3, DollarSign, Calendar } from "lucide-react";

const CampaignBuilder = () => {
  const [currentStep, setCurrentStep] = useState('basics');

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Campaign Builder</h1>
          <p className="text-muted-foreground">Create and configure your Instagram seeding campaign</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Save as Draft
        </Button>
      </div>

      <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 gap-4 bg-muted p-1">
          <TabsTrigger value="basics" className="data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">
            Campaign Basics
          </TabsTrigger>
          <TabsTrigger value="targeting" className="data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">
            Targeting
          </TabsTrigger>
          <TabsTrigger value="creators" className="data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">
            Creator Selection
          </TabsTrigger>
          <TabsTrigger value="review" className="data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">
            Review & Launch
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input id="name" placeholder="Enter campaign name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Campaign Budget</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="budget" type="number" className="pl-8" placeholder="Enter budget" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter campaign description"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="reach">Reach</SelectItem>
                    <SelectItem value="traffic">Traffic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feed">Feed Post</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="reel">Reel</SelectItem>
                    <SelectItem value="igtv">IGTV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guidelines">Content Guidelines</Label>
                <Textarea 
                  id="guidelines" 
                  placeholder="Enter content guidelines for creators"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white"
              onClick={() => setCurrentStep('targeting')}
            >
              Next: Targeting
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Targeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="locations">Target Locations</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age-range">Age Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13-17">13-17</SelectItem>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45+">45+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creator Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min-followers">Minimum Followers</Label>
                  <Input id="min-followers" type="number" placeholder="Enter minimum followers" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engagement-rate">Minimum Engagement Rate</Label>
                  <Input id="engagement-rate" type="number" placeholder="Enter minimum rate %" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="creator-categories">Creator Categories</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('basics')}
            >
              Back to Basics
            </Button>
            <Button 
              className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white"
              onClick={() => setCurrentStep('creators')}
            >
              Next: Creator Selection
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Creator Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Based on your targeting criteria, here are the recommended creators for your campaign.
              </p>
              <div className="space-y-4">
                {/* Creator cards will be dynamically rendered here */}
                <div className="text-center text-muted-foreground py-12">
                  Loading creators...
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('targeting')}
            >
              Back to Targeting
            </Button>
            <Button 
              className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white"
              onClick={() => setCurrentStep('review')}
            >
              Next: Review & Launch
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Campaign Details</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> Summer Collection Launch</p>
                      <p><span className="text-muted-foreground">Budget:</span> $5,000</p>
                      <p><span className="text-muted-foreground">Duration:</span> 30 days</p>
                      <p><span className="text-muted-foreground">Objective:</span> Brand Awareness</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Targeting</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Locations:</span> United States</p>
                      <p><span className="text-muted-foreground">Age Range:</span> 18-34</p>
                      <p><span className="text-muted-foreground">Interests:</span> Fashion, Lifestyle</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Selected Creators</h3>
                  <div className="text-sm text-muted-foreground">
                    No creators selected yet
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Estimated Results</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">250K+</div>
                        <p className="text-sm text-muted-foreground">Estimated Reach</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">15K+</div>
                        <p className="text-sm text-muted-foreground">Estimated Engagement</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">$0.02</div>
                        <p className="text-sm text-muted-foreground">Est. Cost per Engagement</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('creators')}
            >
              Back to Creators
            </Button>
            <Button 
              className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white"
            >
              Launch Campaign
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignBuilder;
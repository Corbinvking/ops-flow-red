import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Building2, Target, Users, BarChart3, Calendar } from "lucide-react";

const NewDeal = () => {
  const [currentStep, setCurrentStep] = useState('basics');

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">New Deal</h1>
          <p className="text-muted-foreground">Create and configure a new investment opportunity</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Save Draft
        </Button>
      </div>

      <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 gap-4 bg-muted p-1">
          <TabsTrigger value="basics" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-white">
            Deal Basics
          </TabsTrigger>
          <TabsTrigger value="company" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-white">
            Company Info
          </TabsTrigger>
          <TabsTrigger value="terms" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-white">
            Deal Terms
          </TabsTrigger>
          <TabsTrigger value="review" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-white">
            Review & Launch
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Deal Name</Label>
                  <Input id="name" placeholder="Enter deal name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Deal Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seed">Seed Round</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B</SelectItem>
                      <SelectItem value="growth">Growth Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deal Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter deal description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="target">Target Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="target" className="pl-8" placeholder="Enter target amount" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimum">Minimum Investment</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="minimum" className="pl-8" placeholder="Enter minimum investment" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
              onClick={() => setCurrentStep('company')}
            >
              Next: Company Info
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea 
                  id="company-description" 
                  placeholder="Enter company description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stage">Company Stage</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="early">Early Stage</SelectItem>
                      <SelectItem value="growth">Growth Stage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter company location" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team">Team Size</Label>
                <Input id="team" type="number" placeholder="Enter team size" />
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
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
              onClick={() => setCurrentStep('terms')}
            >
              Next: Deal Terms
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deal Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="valuation">Pre-Money Valuation</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="valuation" className="pl-8" placeholder="Enter valuation" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equity">Equity Offered</Label>
                  <Input id="equity" placeholder="Enter equity percentage" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Investment Terms</Label>
                <Textarea 
                  id="terms" 
                  placeholder="Enter investment terms"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Investment Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="round-size">Round Size</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="round-size" className="pl-8" placeholder="Enter round size" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('company')}
            >
              Back to Company
            </Button>
            <Button 
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
              onClick={() => setCurrentStep('review')}
            >
              Next: Review
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deal Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Deal Details</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> Tech Startup Series A</p>
                      <p><span className="text-muted-foreground">Type:</span> Series A</p>
                      <p><span className="text-muted-foreground">Target:</span> $5,000,000</p>
                      <p><span className="text-muted-foreground">Minimum:</span> $50,000</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Company Info</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> InnovateTech</p>
                      <p><span className="text-muted-foreground">Industry:</span> Technology</p>
                      <p><span className="text-muted-foreground">Stage:</span> Early Stage</p>
                      <p><span className="text-muted-foreground">Location:</span> San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Deal Terms</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">$20M</div>
                        <p className="text-sm text-muted-foreground">Pre-Money Valuation</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">20%</div>
                        <p className="text-sm text-muted-foreground">Equity Offered</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">45 days</div>
                        <p className="text-sm text-muted-foreground">Time to Close</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Terms & Conditions</Label>
                  <div className="text-sm text-muted-foreground">
                    By launching this deal, you confirm that:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>All information provided is accurate and complete</li>
                      <li>You have the authority to represent this opportunity</li>
                      <li>You agree to our deal listing guidelines and policies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('terms')}
            >
              Back to Terms
            </Button>
            <Button 
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
            >
              Launch Deal
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewDeal;

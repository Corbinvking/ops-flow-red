import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music2, Link, FileText, Target, Users, BarChart3, Calendar } from "lucide-react";

const SubmitTrack = () => {
  const [currentStep, setCurrentStep] = useState('track');

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Submit Track</h1>
          <p className="text-muted-foreground">Submit your track for promotion consideration</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Save Draft
        </Button>
      </div>

      <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 gap-4 bg-muted p-1">
          <TabsTrigger value="track" className="data-[state=active]:bg-[#FF7F50] data-[state=active]:text-white">
            Track Details
          </TabsTrigger>
          <TabsTrigger value="promotion" className="data-[state=active]:bg-[#FF7F50] data-[state=active]:text-white">
            Promotion Goals
          </TabsTrigger>
          <TabsTrigger value="review" className="data-[state=active]:bg-[#FF7F50] data-[state=active]:text-white">
            Review & Submit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="track" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Track Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Track Title</Label>
                  <Input id="title" placeholder="Enter track title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist Name</Label>
                  <Input id="artist" placeholder="Enter artist name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="track-url">SoundCloud Track URL</Label>
                <div className="relative">
                  <Link className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="track-url" className="pl-8" placeholder="https://soundcloud.com/..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="hiphop">Hip-Hop</SelectItem>
                    <SelectItem value="indie">Indie</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Track Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell us about your track..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Enter tags separated by commas" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              className="bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white"
              onClick={() => setCurrentStep('promotion')}
            >
              Next: Promotion Goals
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="promotion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Promotion Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="objective">Primary Objective</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plays">Maximize Plays</SelectItem>
                    <SelectItem value="followers">Gain Followers</SelectItem>
                    <SelectItem value="engagement">Boost Engagement</SelectItem>
                    <SelectItem value="discovery">Increase Discovery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-24">18-24 years</SelectItem>
                      <SelectItem value="25-34">25-34 years</SelectItem>
                      <SelectItem value="35-44">35-44 years</SelectItem>
                      <SelectItem value="all">All Ages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="territory">Target Territory</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select territory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="similar-artists">Similar Artists</Label>
                <Input id="similar-artists" placeholder="Enter similar artists separated by commas" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific promotion preferences or requirements..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('track')}
            >
              Back to Track Details
            </Button>
            <Button 
              className="bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white"
              onClick={() => setCurrentStep('review')}
            >
              Next: Review
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Track Details</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Title:</span> Summer Vibes</p>
                      <p><span className="text-muted-foreground">Artist:</span> DJ Example</p>
                      <p><span className="text-muted-foreground">Genre:</span> Electronic</p>
                      <p><span className="text-muted-foreground">Tags:</span> summer, dance, electronic</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Promotion Goals</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Objective:</span> Maximize Plays</p>
                      <p><span className="text-muted-foreground">Target Audience:</span> 18-24 years</p>
                      <p><span className="text-muted-foreground">Territory:</span> United States</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Estimated Results</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">50K+</div>
                        <p className="text-sm text-muted-foreground">Estimated Plays</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">500+</div>
                        <p className="text-sm text-muted-foreground">Estimated Followers</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">4.5%</div>
                        <p className="text-sm text-muted-foreground">Engagement Rate</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <div className="text-sm text-muted-foreground">
                    By submitting this track, you confirm that:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>You own or have rights to distribute this content</li>
                      <li>The content complies with SoundCloud's terms of service</li>
                      <li>You agree to our promotion guidelines and policies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('promotion')}
            >
              Back to Promotion
            </Button>
            <Button 
              className="bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white"
            >
              Submit Track
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubmitTrack;

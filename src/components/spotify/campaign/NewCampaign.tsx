import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Music2, 
  Target, 
  DollarSign, 
  Calendar,
  Globe,
  Users,
  BarChart3
} from "lucide-react";

const NewCampaign = () => {
  const [formData, setFormData] = useState({
    trackUrl: '',
    artistName: '',
    genre: '',
    targetStreams: '',
    budget: '',
    startDate: '',
    territory: '',
    isExclusive: false
  });

  const genres = [
    "Electronic",
    "Hip-Hop",
    "Pop",
    "Rock",
    "R&B",
    "Jazz",
    "Classical",
    "Country",
    "Folk",
    "Metal"
  ];

  const territories = [
    "Global",
    "United States",
    "United Kingdom",
    "Europe",
    "Asia",
    "Latin America"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New Spotify Campaign</h1>
        <p className="text-muted-foreground">Configure your playlist campaign parameters</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Track Information</CardTitle>
            <CardDescription>Enter the details of the track to promote</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Track URL */}
            <div className="space-y-2">
              <Label htmlFor="trackUrl">Spotify Track URL</Label>
              <div className="relative">
                <Music2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="trackUrl"
                  placeholder="https://open.spotify.com/track/..."
                  className="pl-9"
                  value={formData.trackUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, trackUrl: e.target.value }))}
                />
              </div>
            </div>

            {/* Artist Name */}
            <div className="space-y-2">
              <Label htmlFor="artistName">Artist Name</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="artistName"
                  placeholder="Enter artist name"
                  className="pl-9"
                  value={formData.artistName}
                  onChange={(e) => setFormData(prev => ({ ...prev, artistName: e.target.value }))}
                />
              </div>
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select
                value={formData.genre}
                onValueChange={(value) => setFormData(prev => ({ ...prev, genre: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Goals</CardTitle>
            <CardDescription>Set your campaign targets and budget</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Target Streams */}
            <div className="space-y-2">
              <Label htmlFor="targetStreams">Target Streams</Label>
              <div className="relative">
                <BarChart3 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="targetStreams"
                  type="number"
                  placeholder="50000"
                  className="pl-9"
                  value={formData.targetStreams}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetStreams: e.target.value }))}
                />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Campaign Budget ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="1000"
                  className="pl-9"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  className="pl-9"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Territory */}
            <div className="space-y-2">
              <Label htmlFor="territory">Target Territory</Label>
              <Select
                value={formData.territory}
                onValueChange={(value) => setFormData(prev => ({ ...prev, territory: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select territory" />
                </SelectTrigger>
                <SelectContent>
                  {territories.map(territory => (
                    <SelectItem key={territory} value={territory}>{territory}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exclusive Switch */}
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="exclusive" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Exclusive Promotion
              </Label>
              <Switch
                id="exclusive"
                checked={formData.isExclusive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isExclusive: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-[#1DB954] hover:bg-[#1DB954]/90">
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewCampaign;

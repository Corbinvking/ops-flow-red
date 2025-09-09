import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Music, 
  Link, 
  Tag, 
  Globe, 
  Calendar,
  Target,
  DollarSign,
  AlertCircle
} from "lucide-react";

const SubmitTrack: React.FC = () => {
  const [formData, setFormData] = useState({
    trackUrl: '',
    title: '',
    genre: '',
    description: '',
    targetAudience: '',
    releaseDate: '',
    budget: '',
    isExclusive: false
  });

  const genres = [
    "Electronic",
    "Hip Hop",
    "Pop",
    "Rock",
    "R&B",
    "Jazz",
    "Classical",
    "Country",
    "Folk",
    "Metal"
  ];

  const audiences = [
    "18-24",
    "25-34",
    "35-44",
    "45+"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Track</CardTitle>
          <CardDescription>Submit your track for promotion and reach new audiences</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Track URL */}
            <div className="space-y-2">
              <Label htmlFor="trackUrl">SoundCloud Track URL</Label>
              <div className="relative">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="trackUrl"
                  placeholder="https://soundcloud.com/your-track"
                  className="pl-9"
                  value={formData.trackUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, trackUrl: e.target.value }))}
                />
              </div>
            </div>

            {/* Track Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Track Title</Label>
              <div className="relative">
                <Music className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  placeholder="Enter track title"
                  className="pl-9"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
            </div>

            {/* Genre & Target Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select
                  value={formData.targetAudience}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, targetAudience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target age group" />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map(audience => (
                      <SelectItem key={audience} value={audience}>{audience}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Track Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your track..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Release Date & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="releaseDate">Release Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="releaseDate"
                    type="date"
                    className="pl-9"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Promotion Budget</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="500"
                    className="pl-9"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
              </div>
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

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="submit" variant="gradient">
                Submit Track
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            Submission Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Track must be your original work or you must have rights to promote it</li>
            <li>• SoundCloud URL must be public and accessible</li>
            <li>• Track should be properly tagged and have artwork</li>
            <li>• Description should be clear and engaging</li>
            <li>• Higher budgets typically result in better promotion reach</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitTrack;
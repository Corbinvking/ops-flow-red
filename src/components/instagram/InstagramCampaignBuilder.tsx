import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Users, DollarSign, Eye } from 'lucide-react';

interface CampaignForm {
  campaign_name: string;
  total_budget: number;
  selected_genres: string[];
  campaign_type: string;
  post_type_preference: string[];
  territory_preferences: string[];
  content_type_preferences: string[];
}

const InstagramCampaignBuilder: React.FC = () => {
  const [formData, setFormData] = useState<CampaignForm>({
    campaign_name: '',
    total_budget: 5000,
    selected_genres: [],
    campaign_type: 'Audio Seeding',
    post_type_preference: ['Reel'],
    territory_preferences: [],
    content_type_preferences: []
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const MUSIC_GENRES = [
    'Hip Hop', 'Pop', 'Electronic', 'Rock', 'R&B', 'Country', 'Jazz', 'Classical'
  ];

  const POST_TYPES = ['Reel', 'Post', 'Story', 'IGTV', 'Carousel'];

  const TERRITORIES = ['US', 'UK', 'EU', 'Asia', 'Global'];

  const handleInputChange = (field: keyof CampaignForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      selected_genres: prev.selected_genres.includes(genre)
        ? prev.selected_genres.filter(g => g !== genre)
        : [...prev.selected_genres, genre]
    }));
  };

  const handlePostTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      post_type_preference: prev.post_type_preference.includes(type)
        ? prev.post_type_preference.filter(t => t !== type)
        : [...prev.post_type_preference, type]
    }));
  };

  const handleTerritoryToggle = (territory: string) => {
    setFormData(prev => ({
      ...prev,
      territory_preferences: prev.territory_preferences.includes(territory)
        ? prev.territory_preferences.filter(t => t !== territory)
        : [...prev.territory_preferences, territory]
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.campaign_name.trim()) {
        newErrors.campaign_name = 'Campaign name is required';
      }
      if (formData.total_budget <= 0) {
        newErrors.total_budget = 'Budget must be greater than 0';
      }
    }

    if (currentStep === 2) {
      if (formData.selected_genres.length === 0) {
        newErrors.selected_genres = 'Select at least one genre';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      // TODO: Integrate with UnifiedOps API
      console.log('Campaign created:', formData);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="campaign_name">Campaign Name</Label>
        <Input
          id="campaign_name"
          value={formData.campaign_name}
          onChange={(e) => handleInputChange('campaign_name', e.target.value)}
          placeholder="Enter campaign name"
          className={errors.campaign_name ? 'border-red-500' : ''}
        />
        {errors.campaign_name && (
          <p className="text-sm text-red-500 mt-1">{errors.campaign_name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="total_budget">Total Budget ($)</Label>
        <Input
          id="total_budget"
          type="number"
          value={formData.total_budget}
          onChange={(e) => handleInputChange('total_budget', Number(e.target.value))}
          placeholder="5000"
          className={errors.total_budget ? 'border-red-500' : ''}
        />
        {errors.total_budget && (
          <p className="text-sm text-red-500 mt-1">{errors.total_budget}</p>
        )}
      </div>

      <div>
        <Label htmlFor="campaign_type">Campaign Type</Label>
        <Select
          value={formData.campaign_type}
          onValueChange={(value) => handleInputChange('campaign_type', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Audio Seeding">Audio Seeding</SelectItem>
            <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
            <SelectItem value="Product Launch">Product Launch</SelectItem>
            <SelectItem value="Event Promotion">Event Promotion</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label>Music Genres</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {MUSIC_GENRES.map((genre) => (
            <Button
              key={genre}
              variant={formData.selected_genres.includes(genre) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleGenreToggle(genre)}
              className="justify-start"
            >
              {formData.selected_genres.includes(genre) && <Plus className="h-4 w-4 mr-2" />}
              {genre}
            </Button>
          ))}
        </div>
        {errors.selected_genres && (
          <p className="text-sm text-red-500 mt-1">{errors.selected_genres}</p>
        )}
      </div>

      <div>
        <Label>Post Types</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {POST_TYPES.map((type) => (
            <Button
              key={type}
              variant={formData.post_type_preference.includes(type) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePostTypeToggle(type)}
              className="justify-start"
            >
              {formData.post_type_preference.includes(type) && <Plus className="h-4 w-4 mr-2" />}
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label>Territory Preferences</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {TERRITORIES.map((territory) => (
            <Button
              key={territory}
              variant={formData.territory_preferences.includes(territory) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTerritoryToggle(territory)}
              className="justify-start"
            >
              {formData.territory_preferences.includes(territory) && <Plus className="h-4 w-4 mr-2" />}
              {territory}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Campaign Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Campaign Name</Label>
              <p className="font-medium">{formData.campaign_name}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Budget</Label>
              <p className="font-medium">${formData.total_budget.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Type</Label>
              <p className="font-medium">{formData.campaign_type}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Genres</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.selected_genres.map((genre) => (
                  <Badge key={genre} variant="secondary">{genre}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Estimated Reach</span>
              </div>
              <span className="font-medium">50K - 100K</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Expected Views</span>
              </div>
              <span className="font-medium">25K - 50K</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Create Instagram Campaign</h2>
        <p className="text-muted-foreground">
          Build targeted Instagram campaigns with AI-powered creator recommendations
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              stepNumber < step ? 'bg-primary text-primary-foreground' :
              stepNumber === step ? 'bg-primary text-primary-foreground' :
              'bg-muted text-muted-foreground'
            }`}>
              {stepNumber < step ? '✓' : stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                stepNumber < step ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Campaign Details'}
            {step === 2 && 'Targeting & Preferences'}
            {step === 3 && 'Review & Create'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {step < 3 ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Create Campaign
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramCampaignBuilder;

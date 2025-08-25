import React, { useState, useEffect } from 'react';
import { Plus, Send, Eye, ExternalLink, Mail, DollarSign, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockAPI } from '@/data/mockData';
import { Lead } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Visualizer: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: '',
    budget: '',
    referenceLinks: [''],
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const leadsResult = await mockAPI.getLeads();
        setLeads(leadsResult);
      } catch (error) {
        toast({
          title: 'Error loading leads',
          description: 'Failed to load visualizer data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, [toast]);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectDescription || !formData.budget) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const newLead = await mockAPI.createLead({
        name: formData.name,
        email: formData.email,
        projectDescription: formData.projectDescription,
        budget: formData.budget,
        referenceLinks: formData.referenceLinks.filter(link => link.trim()),
      });
      
      setLeads(prev => [newLead, ...prev]);
      setFormData({
        name: '',
        email: '',
        projectDescription: '',
        budget: '',
        referenceLinks: [''],
      });
      setIsDialogOpen(false);
      
      toast({
        title: 'Lead submitted',
        description: 'Thank you for your interest! We\'ll be in touch soon.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit lead. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const addReferenceLink = () => {
    setFormData(prev => ({
      ...prev,
      referenceLinks: [...prev.referenceLinks, '']
    }));
  };

  const updateReferenceLink = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      referenceLinks: prev.referenceLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const removeReferenceLink = (index: number) => {
    if (formData.referenceLinks.length > 1) {
      setFormData(prev => ({
        ...prev,
        referenceLinks: prev.referenceLinks.filter((_, i) => i !== index)
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'chip-success';
      case 'in_progress': return 'chip-primary';
      case 'contacted': return 'chip-warning';
      case 'rejected': return 'chip-danger';
      case 'new': return 'chip';
      default: return 'chip';
    }
  };

  const templates = [
    { id: 1, title: 'Music Video Visualizer', category: 'Video', preview: '/api/placeholder/300/200' },
    { id: 2, title: 'Album Art Animation', category: 'Animation', preview: '/api/placeholder/300/200' },
    { id: 3, title: 'Concert Visuals', category: 'Live', preview: '/api/placeholder/300/200' },
    { id: 4, title: 'Lyric Video Template', category: 'Video', preview: '/api/placeholder/300/200' },
    { id: 5, title: 'Audio Waveform', category: 'Animation', preview: '/api/placeholder/300/200' },
    { id: 6, title: 'Social Media Kit', category: 'Graphics', preview: '/api/placeholder/300/200' },
    { id: 7, title: 'Event Poster', category: 'Graphics', preview: '/api/placeholder/300/200' },
    { id: 8, title: 'Interactive Visualization', category: 'Interactive', preview: '/api/placeholder/300/200' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative py-16 px-8 text-center">
          <h1 className="text-5xl font-space-grotesk font-bold mb-6">
            Visual Content Studio
          </h1>
          <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your music into stunning visual experiences. From animated album covers to 
            immersive concert visuals, we bring your sound to life.
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="glow-hover">
                <Send className="h-5 w-5 mr-2" />
                Start Your Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tell Us About Your Project</DialogTitle>
                <DialogDescription>
                  Share your vision and we'll create something amazing together.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Project Description</label>
                  <Textarea
                    value={formData.projectDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                    placeholder="Describe your vision, style preferences, timeline, etc..."
                    className="min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Budget Range</label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$1,000 - $2,500">$1,000 - $2,500</SelectItem>
                      <SelectItem value="$2,500 - $5,000">$2,500 - $5,000</SelectItem>
                      <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="$25,000+">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Reference Links (Optional)</label>
                  <div className="space-y-2">
                    {formData.referenceLinks.map((link, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={link}
                          onChange={(e) => updateReferenceLink(index, e.target.value)}
                          placeholder="https://example.com/inspiration"
                        />
                        {formData.referenceLinks.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeReferenceLink(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addReferenceLink}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Reference
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Submit Project Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Templates Gallery */}
        <div className="lg:col-span-2">
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-2xl">Template Gallery</CardTitle>
              <CardDescription>
                Explore our collection of visual templates and creative solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="group cursor-pointer rounded-lg overflow-hidden bg-surface hover:bg-surface-elevated transition-all duration-300 interactive"
                  >
                    <div className="aspect-video bg-gradient-surface relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-foreground-muted group-hover:text-primary transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{template.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads & Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-lg">Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary font-space-grotesk">24</p>
                <p className="text-sm text-foreground-muted">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-success font-space-grotesk">98%</p>
                <p className="text-sm text-foreground-muted">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-warning font-space-grotesk">5</p>
                <p className="text-sm text-foreground-muted">Active Projects</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Leads */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Inquiries</CardTitle>
              <CardDescription>
                Latest project requests and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="p-3 rounded-lg bg-surface hover:bg-surface-elevated transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-foreground text-sm">{lead.name}</h5>
                        <p className="text-xs text-foreground-muted">{lead.email}</p>
                      </div>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-foreground-muted mb-2 line-clamp-2">
                      {lead.projectDescription}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-foreground-subtle">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {lead.budget}
                      </div>
                      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
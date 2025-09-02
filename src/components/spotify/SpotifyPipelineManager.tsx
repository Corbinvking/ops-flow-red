import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Music, 
  Mail, 
  Phone, 
  Calendar, 
  Target, 
  TrendingUp,
  Users,
  Play,
  Pause,
  SkipForward,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface PipelineItem {
  id: string;
  artist: string;
  track: string;
  contact: string;
  email: string;
  phone: string;
  stage: 'sourcing' | 'outreach' | 'confirmed' | 'scheduled' | 'published';
  owner: string;
  eta: string;
  notes: string;
  priority: 'low' | 'medium' | 'high';
  lastContact: string;
  nextFollowUp: string;
}

const SpotifyPipelineManager: React.FC = () => {
  const [pipelineItems, setPipelineItems] = useState<PipelineItem[]>([
    {
      id: '1',
      artist: 'Artist XYZ',
      track: 'New Single - "Summer Vibes"',
      contact: 'John Smith',
      email: 'john@artistxyz.com',
      phone: '+1 (555) 123-4567',
      stage: 'outreach',
      owner: 'Sarah Chen',
      eta: '2024-02-15',
      notes: 'Interested in playlist placement, prefers electronic/pop playlists',
      priority: 'high',
      lastContact: '2024-01-28',
      nextFollowUp: '2024-02-01'
    },
    {
      id: '2',
      artist: 'Producer ABC',
      track: 'EP - "Midnight Dreams"',
      contact: 'Mike Johnson',
      email: 'mike@producerabc.com',
      phone: '+1 (555) 987-6543',
      stage: 'confirmed',
      owner: 'Marcus Johnson',
      eta: '2024-02-20',
      notes: 'Confirmed for 3 playlists, needs artwork by Feb 18',
      priority: 'medium',
      lastContact: '2024-01-30',
      nextFollowUp: '2024-02-18'
    },
    {
      id: '3',
      artist: 'Singer DEF',
      track: 'Remix - "Original Song (DEF Remix)"',
      contact: 'Lisa Brown',
      email: 'lisa@singerdef.com',
      phone: '+1 (555) 456-7890',
      stage: 'sourcing',
      owner: 'Alex Rodriguez',
      eta: '2024-03-01',
      notes: 'New artist, building relationship, potential for long-term partnership',
      priority: 'low',
      lastContact: '2024-01-25',
      nextFollowUp: '2024-02-05'
    }
  ]);

  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterOwner, setFilterOwner] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = pipelineItems.filter(item => {
    const matchesStage = filterStage === 'all' || item.stage === filterStage;
    const matchesOwner = filterOwner === 'all' || item.owner === filterOwner;
    const matchesSearch = !searchQuery || 
      item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.track.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStage && matchesOwner && matchesSearch;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'sourcing': return 'bg-gray-500';
      case 'outreach': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'scheduled': return 'bg-purple-500';
      case 'published': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStageChange = (itemId: string, newStage: PipelineItem['stage']) => {
    setPipelineItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, stage: newStage } : item
      )
    );
  };

  const handlePriorityChange = (itemId: string, newPriority: PipelineItem['priority']) => {
    setPipelineItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, priority: newPriority } : item
      )
    );
  };

  const getPipelineStats = () => {
    const total = pipelineItems.length;
    const sourcing = pipelineItems.filter(item => item.stage === 'sourcing').length;
    const outreach = pipelineItems.filter(item => item.stage === 'outreach').length;
    const confirmed = pipelineItems.filter(item => item.stage === 'confirmed').length;
    const scheduled = pipelineItems.filter(item => item.stage === 'scheduled').length;
    const published = pipelineItems.filter(item => item.stage === 'published').length;
    
    return { total, sourcing, outreach, confirmed, scheduled, published };
  };

  const stats = getPipelineStats();

  const owners = [...new Set(pipelineItems.map(item => item.owner))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Pipeline Management</h2>
          <p className="text-muted-foreground">
            Track artist outreach and playlist placement from sourcing to publication
          </p>
        </div>
        <Button>
          <Music className="h-4 w-4 mr-2" />
          Add Artist
        </Button>
      </div>

      {/* Pipeline Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-sm text-muted-foreground">Sourcing</span>
            </div>
            <p className="text-2xl font-bold">{stats.sourcing}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-muted-foreground">Outreach</span>
            </div>
            <p className="text-2xl font-bold">{stats.outreach}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-muted-foreground">Confirmed</span>
            </div>
            <p className="text-2xl font-bold">{stats.confirmed}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-muted-foreground">Scheduled</span>
            </div>
            <p className="text-2xl font-bold">{stats.scheduled}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Published</span>
            </div>
            <p className="text-2xl font-bold">{stats.published}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search artists, tracks, or contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="stage-filter">Stage</Label>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="sourcing">Sourcing</SelectItem>
                  <SelectItem value="outreach">Outreach</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="owner-filter">Owner</Label>
              <Select value={filterOwner} onValueChange={setFilterOwner}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  {owners.map(owner => (
                    <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStageColor(item.stage)}`} />
                      <Badge variant="outline" className="capitalize">
                        {item.stage}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                      <Badge variant="secondary" className="capitalize">
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h3 className="font-medium mb-1">{item.artist}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.track}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{item.contact}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{item.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{item.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>ETA: {item.eta}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-3">
                    <strong>Notes:</strong> {item.notes}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Last Contact: {item.lastContact}</span>
                    <span>Next Follow-up: {item.nextFollowUp}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 ml-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.owner}</p>
                    <p className="text-xs text-muted-foreground">Owner</p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Select
                    value={item.stage}
                    onValueChange={(value: PipelineItem['stage']) => handleStageChange(item.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sourcing">Sourcing</SelectItem>
                      <SelectItem value="outreach">Outreach</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={item.priority}
                    onValueChange={(value: PipelineItem['priority']) => handlePriorityChange(item.id, value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpotifyPipelineManager;

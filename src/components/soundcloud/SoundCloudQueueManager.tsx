import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Clock, 
  Users, 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface QueueItem {
  id: string;
  trackInfo: string;
  client: string;
  service: string;
  goal: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'active' | 'paused' | 'completed';
  progress: number;
  estimatedTime: number;
  owner: string;
}

const SoundCloudQueueManager: React.FC = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: '1',
      trackInfo: 'New Hip Hop Single - Artist XYZ',
      client: 'Universal Music',
      service: 'Repost',
      goal: 'Increase reach by 50K',
      priority: 'high',
      status: 'active',
      progress: 75,
      estimatedTime: 120,
      owner: 'Sarah Chen'
    },
    {
      id: '2',
      trackInfo: 'Electronic EP - Producer ABC',
      client: 'Sony Music',
      service: 'Playlist Placement',
      goal: 'Generate 100K streams',
      priority: 'medium',
      status: 'pending',
      progress: 0,
      estimatedTime: 180,
      owner: 'Marcus Johnson'
    },
    {
      id: '3',
      trackInfo: 'Pop Remix - Singer DEF',
      client: 'Warner Music',
      service: 'Repost + Playlist',
      goal: 'Boost engagement 200%',
      priority: 'high',
      status: 'paused',
      progress: 45,
      estimatedTime: 240,
      owner: 'Alex Rodriguez'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = queueItems.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const matchesSearch = !searchQuery || 
      item.trackInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'paused': return 'bg-orange-500';
      case 'completed': return 'bg-blue-500';
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

  const handleStatusChange = (itemId: string, newStatus: QueueItem['status']) => {
    setQueueItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const handlePriorityChange = (itemId: string, newPriority: QueueItem['priority']) => {
    setQueueItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, priority: newPriority } : item
      )
    );
  };

  const moveItem = (itemId: string, direction: 'up' | 'down') => {
    setQueueItems(prev => {
      const currentIndex = prev.findIndex(item => item.id === itemId);
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newItems = [...prev];
      [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];
      return newItems;
    });
  };

  const getQueueStats = () => {
    const total = queueItems.length;
    const active = queueItems.filter(item => item.status === 'active').length;
    const pending = queueItems.filter(item => item.status === 'pending').length;
    const completed = queueItems.filter(item => item.status === 'completed').length;
    const paused = queueItems.filter(item => item.status === 'paused').length;
    
    return { total, active, pending, completed, paused };
  };

  const stats = getQueueStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Queue Management</h2>
          <p className="text-muted-foreground">
            Manage and prioritize SoundCloud campaign queue
          </p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          Start Queue
        </Button>
      </div>

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            <p className="text-2xl font-bold">{stats.active}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm text-muted-foreground">Paused</span>
            </div>
            <p className="text-2xl font-bold">{stats.paused}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search tracks or clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="priority-filter">Priority</Label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Auto-Prioritize
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Items */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                      <Badge variant="outline" className="capitalize">
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                      <Badge variant="secondary" className="capitalize">
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-1">{item.trackInfo}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Client: {item.client}</span>
                    <span>Service: {item.service}</span>
                    <span>Owner: {item.owner}</span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {item.estimatedTime}min
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveItem(item.id, 'up')}
                      disabled={index === 0}
                    >
                      <SkipBack className="h-3 w-3" />
                    </Button>
                    
                    {item.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(item.id, 'paused')}
                      >
                        <Pause className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(item.id, 'active')}
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveItem(item.id, 'down')}
                      disabled={index === filteredItems.length - 1}
                    >
                      <SkipForward className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Select
                    value={item.priority}
                    onValueChange={(value: QueueItem['priority']) => handlePriorityChange(item.id, value)}
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

export default SoundCloudQueueManager;

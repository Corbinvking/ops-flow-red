import React, { useState, useEffect } from 'react';
import { Plus, Upload, FileText, Download, Play, MoreVertical, Calendar, User, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockAPI } from '@/data/mockData';
import { Campaign, SCQueueItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

const SoundCloud: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [queue, setQueue] = useState<SCQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [campaignsResult, queueResult] = await Promise.all([
          mockAPI.getCampaigns(),
          mockAPI.getSCQueue(),
        ]);
        
        setCampaigns(campaignsResult.filter(c => c.service === 'soundcloud'));
        setQueue(queueResult);
      } catch (error) {
        toast({
          title: 'Error loading data',
          description: 'Failed to load SoundCloud data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) {
      toast({
        title: 'No items selected',
        description: 'Please select items to perform bulk actions.',
        variant: 'destructive',
      });
      return;
    }

    // Mock bulk action
    toast({
      title: 'Bulk action executed',
      description: `${action} applied to ${selectedIds.length} items`,
    });
    setSelectedIds([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'chip-success';
      case 'in_progress': return 'chip-primary';
      case 'failed': return 'chip-danger';
      default: return 'chip';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">SoundCloud Operations</h1>
          <p className="text-foreground-muted mt-1">
            Manage campaigns and automation queues for SoundCloud promotion.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Queue
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <Card className="card bg-primary/10 border-primary/20">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedIds.length} items selected
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => handleBulkAction('Mark Done')}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Done
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('Reschedule')}>
                  <Calendar className="h-4 w-4 mr-1" />
                  Reschedule
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedIds([])}>
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Campaigns */}
        <Card className="xl:col-span-2 card">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>
              Track progress of your SoundCloud promotion campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 rounded-lg bg-surface hover:bg-surface-elevated transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{campaign.name}</h4>
                      <p className="text-sm text-foreground-muted">{campaign.trackUrl}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Open Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        {campaign.targets?.reposts || 0}
                      </p>
                      <p className="text-xs text-foreground-muted">Reposts Target</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        {campaign.targets?.likes || 0}
                      </p>
                      <p className="text-xs text-foreground-muted">Likes Target</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        {campaign.targets?.comments || 0}
                      </p>
                      <p className="text-xs text-foreground-muted">Comments Target</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Progress</span>
                      <span className="font-medium text-foreground">{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <User className="h-3 w-3" />
                      {campaign.owner}
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Queue */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Automation Queue</CardTitle>
            <CardDescription>
              Scheduled actions and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queue.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedIds.includes(item.id) 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-surface hover:bg-surface-elevated'
                  }`}
                  onClick={() => {
                    if (selectedIds.includes(item.id)) {
                      setSelectedIds(prev => prev.filter(id => id !== item.id));
                    } else {
                      setSelectedIds(prev => [...prev, item.id]);
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getStatusColor(item.status)} variant="secondary">
                      {item.action}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground mb-1 truncate">
                    {item.trackUrl.split('/').pop()}
                  </p>
                  
                  {item.scheduledFor && (
                    <p className="text-xs text-foreground-muted">
                      Scheduled: {new Date(item.scheduledFor).toLocaleString()}
                    </p>
                  )}
                  
                  {item.completedAt && (
                    <p className="text-xs text-success">
                      Completed: {new Date(item.completedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SoundCloud;
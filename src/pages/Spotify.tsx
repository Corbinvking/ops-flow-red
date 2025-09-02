import React, { useState, useEffect } from 'react';
import { Plus, Grid, List, Filter, Calendar, User, Mail, Phone, MoreVertical, Music, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAirtableData, AIRTABLE_TABLES } from '@/hooks/useAirtableData';
import { useToast } from '@/hooks/use-toast';
import SpotifyPipelineManager from '@/components/spotify/SpotifyPipelineManager';
import { ViewSidebar } from '@/components/ops/ViewSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

const Spotify: React.FC = () => {
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [currentView, setCurrentView] = useState('overview');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterOwner, setFilterOwner] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();
  
  const { data: items, loading, updateRecord, error } = useAirtableData({ tableName: AIRTABLE_TABLES.SPOTIFY });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'chip-success';
      case 'scheduled': return 'chip-primary';
      case 'confirmed': return 'chip-warning';
      case 'outreach': return 'chip';
      case 'sourcing': return 'chip';
      default: return 'chip';
    }
  };

  const columns = [
    { id: 'sourcing', title: 'Sourcing', status: 'sourcing' },
    { id: 'outreach', title: 'Outreach', status: 'outreach' },
    { id: 'confirmed', title: 'Confirmed', status: 'confirmed' },
    { id: 'scheduled', title: 'Scheduled', status: 'scheduled' },
    { id: 'published', title: 'Published', status: 'published' },
  ];

  const filteredItems = items.filter(item => {
    if (filterOwner !== 'all' && item.fields['Owner'] !== filterOwner) return false;
    if (filterStatus !== 'all' && item.fields['Status'] !== filterStatus) return false;
    return true;
  });

  const owners = [...new Set(items.map(item => item.fields['Owner']).filter(Boolean))];

  const handleStatusChange = (itemId: string, newStatus: string) => {
    updateRecord(itemId, { 'Status': newStatus });
    toast({
      title: 'Status updated',
      description: `Item moved to ${newStatus}`,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <ViewSidebar
          service="sp"
          currentView={currentView}
          onViewChange={setCurrentView}
          viewCounts={{}}
        />
        
        <SidebarInset>
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            {currentView === 'overview' && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-space-grotesk font-bold">Spotify Pipeline</h1>
              <p className="text-foreground-muted mt-1">
                Track artist outreach and playlist placement from sourcing to publication.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg bg-surface p-1">
                <Button
                  variant={viewMode === 'board' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('board')}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Board
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  <List className="h-4 w-4 mr-2" />
                  Table
                </Button>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Artist
              </Button>
            </div>
          </div>

      {/* Filters */}
      <Card className="card">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-foreground-muted" />
              <span className="text-sm font-medium text-foreground-muted">Filters:</span>
            </div>
            
            <Select value={filterOwner} onValueChange={setFilterOwner}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Owners</SelectItem>
                {owners.map(owner => (
                  <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="sourcing">Sourcing</SelectItem>
                <SelectItem value="outreach">Outreach</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>

            {(filterOwner !== 'all' || filterStatus !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilterOwner('all');
                  setFilterStatus('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="card bg-primary/10 border-primary/20">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedIds.length} items selected
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <User className="h-4 w-4 mr-1" />
                  Assign Owner
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Set ETA
                </Button>
                <Button size="sm" variant="outline">
                  Move to Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {columns.map((column) => {
                         const columnItems = filteredItems.filter(item => item.fields['Status'] === column.status);
            
            return (
              <Card key={column.id} className="card">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{column.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {columnItems.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {columnItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-surface hover:bg-surface-elevated transition-colors cursor-pointer"
                      onClick={() => {
                        if (selectedIds.includes(item.id)) {
                          setSelectedIds(prev => prev.filter(id => id !== item.id));
                        } else {
                          setSelectedIds(prev => [...prev, item.id]);
                        }
                      }}
                    >
                                             {/* Artist/Track Info */}
                       <div className="flex items-start justify-between mb-2">
                         <div className="min-w-0 flex-1">
                           <h4 className="font-medium text-foreground text-sm line-clamp-1">
                             {item.fields['Campaign'] || '-'}
                           </h4>
                           <p className="text-xs text-foreground-muted line-clamp-1 mt-1">
                             {item.fields['Client'] || '-'}
                           </p>
                         </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-3 w-3" />
                              Create Outreach
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Music className="mr-2 h-3 w-3" />
                              Mark Published
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-3 w-3" />
                              Open Contact
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                                             {/* Contact Info */}
                       {(item.fields['Client'] || item.fields['Goal']) && (
                         <div className="space-y-1 mb-3">
                           {item.fields['Client'] && (
                             <div className="flex items-center gap-1 text-xs text-foreground-muted">
                               <User className="h-3 w-3" />
                               <span className="truncate">{item.fields['Client']}</span>
                             </div>
                           )}
                           {item.fields['Goal'] && (
                             <div className="flex items-center gap-1 text-xs text-foreground-muted">
                               <Target className="h-3 w-3" />
                               <span>Goal: {item.fields['Goal'].toLocaleString()}</span>
                             </div>
                           )}
                         </div>
                       )}

                      {/* Meta Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-foreground-muted">
                            <User className="h-3 w-3" />
                            {item.fields['Owner'] || '-'}
                          </div>
                          {item.fields['ETA'] && (
                            <span className="text-foreground-muted">
                              ETA: {new Date(item.fields['ETA']).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        
                        {item.fields['Notes'] && (
                          <p className="text-xs text-foreground-muted line-clamp-2 p-2 bg-surface-elevated rounded">
                            {item.fields['Notes']}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="card">
          <CardHeader>
            <CardTitle>Pipeline Table View</CardTitle>
            <CardDescription>
              Detailed view of all Spotify pipeline items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg bg-surface hover:bg-surface-elevated transition-colors">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedIds.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(prev => [...prev, item.id]);
                      } else {
                        setSelectedIds(prev => prev.filter(id => id !== item.id));
                      }
                    }}
                  />
                  
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Music className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                                         <div className="flex items-start justify-between mb-1">
                       <div>
                         <h4 className="font-medium text-foreground">{item.fields['Campaign'] || '-'}</h4>
                         <p className="text-sm text-foreground-muted">{item.fields['Client'] || '-'}</p>
                       </div>
                      <Badge className={getStatusColor(item.fields['Status'] || 'sourcing')}>
                        {item.fields['Status'] || 'sourcing'}
                      </Badge>
                    </div>
                    
                                         <div className="flex items-center gap-4 text-sm text-foreground-muted mt-2">
                       <span>{item.fields['Owner'] || '-'}</span>
                       {item.fields['Goal'] && (
                         <>
                           <span>•</span>
                           <span>Goal: {item.fields['Goal'].toLocaleString()}</span>
                         </>
                       )}
                       {item.fields['Status'] && (
                         <>
                           <span>•</span>
                           <span>Status: {item.fields['Status']}</span>
                         </>
                       )}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
        </>
      )}

            {currentView === 'pipeline' && (
              <SpotifyPipelineManager />
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Spotify;
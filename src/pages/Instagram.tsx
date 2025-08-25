import React, { useState, useEffect } from 'react';
import { Plus, Grid, List, Filter, Calendar, User, Tag, Eye, MoreVertical } from 'lucide-react';
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
import { mockAPI } from '@/data/mockData';
import { IGPost, Priority, Status } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Instagram: React.FC = () => {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterOwner, setFilterOwner] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsResult = await mockAPI.getIGPosts();
        setPosts(postsResult);
      } catch (error) {
        toast({
          title: 'Error loading posts',
          description: 'Failed to load Instagram data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [toast]);

  const handleStatusChange = async (postId: string, newStatus: Status) => {
    try {
      await mockAPI.updateIGPostStatus(postId, newStatus);
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, status: newStatus } : post
      ));
      toast({
        title: 'Post updated',
        description: `Post moved to ${newStatus.replace('_', ' ')}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post status',
        variant: 'destructive',
      });
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'urgent': return 'chip-danger';
      case 'high': return 'chip-warning';
      case 'medium': return 'chip-primary';
      case 'low': return 'chip';
      default: return 'chip';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'done': return 'chip-success';
      case 'in_progress': return 'chip-primary';
      case 'needs_qa': return 'chip-warning';
      case 'backlog': return 'chip';
      default: return 'chip';
    }
  };

  const columns = [
    { id: 'backlog', title: 'Backlog', status: 'backlog' as Status },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress' as Status },
    { id: 'needs_qa', title: 'Needs QA', status: 'needs_qa' as Status },
    { id: 'done', title: 'Done', status: 'done' as Status },
  ];

  const filteredPosts = posts.filter(post => {
    if (filterOwner !== 'all' && post.owner !== filterOwner) return false;
    if (filterPriority !== 'all' && post.priority !== filterPriority) return false;
    return true;
  });

  const owners = [...new Set(posts.map(post => post.owner))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">Instagram Content</h1>
          <p className="text-foreground-muted mt-1">
            Manage your Instagram content pipeline from ideation to publication.
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
            New Post
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

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            {(filterOwner !== 'all' || filterPriority !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilterOwner('all');
                  setFilterPriority('all');
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
                {selectedIds.length} posts selected
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <User className="h-4 w-4 mr-1" />
                  Assign Owner
                </Button>
                <Button size="sm" variant="outline">
                  <Tag className="h-4 w-4 mr-1" />
                  Set Priority
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Set Due Date
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnPosts = filteredPosts.filter(post => post.status === column.status);
            
            return (
              <Card key={column.id} className="card">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{column.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {columnPosts.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {columnPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-lg bg-surface hover:bg-surface-elevated transition-colors cursor-pointer"
                      onClick={() => {
                        if (selectedIds.includes(post.id)) {
                          setSelectedIds(prev => prev.filter(id => id !== post.id));
                        } else {
                          setSelectedIds(prev => [...prev, post.id]);
                        }
                      }}
                    >
                      {/* Post Preview */}
                      <div className="relative mb-3">
                        <div className="aspect-square rounded-lg bg-surface-elevated overflow-hidden">
                          {post.mediaUrl ? (
                            <img
                              src={post.mediaUrl}
                              alt="Post preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Eye className="h-8 w-8 text-foreground-muted" />
                            </div>
                          )}
                        </div>
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'in_progress')}>
                                Move to In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'needs_qa')}>
                                Move to Needs QA
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'done')}>
                                Move to Done
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                        {post.caption}
                      </p>

                      {/* Post Meta */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getPriorityColor(post.priority)}>
                            {post.priority}
                          </Badge>
                          {post.dueDate && (
                            <span className="text-xs text-foreground-muted">
                              Due {new Date(post.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-foreground-muted">
                            <User className="h-3 w-3" />
                            {post.owner}
                          </div>
                          
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3 text-foreground-muted" />
                              <span className="text-xs text-foreground-muted">
                                {post.tags.length}
                              </span>
                            </div>
                          )}
                        </div>
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
            <CardTitle>Posts Table View</CardTitle>
            <CardDescription>
              Detailed view of all Instagram posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 rounded-lg bg-surface hover:bg-surface-elevated transition-colors">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedIds.includes(post.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(prev => [...prev, post.id]);
                      } else {
                        setSelectedIds(prev => prev.filter(id => id !== post.id));
                      }
                    }}
                  />
                  
                  <div className="w-16 h-16 rounded-lg bg-surface-elevated overflow-hidden shrink-0">
                    {post.mediaUrl ? (
                      <img
                        src={post.mediaUrl}
                        alt="Post preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Eye className="h-6 w-6 text-foreground-muted" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground mb-1 line-clamp-1">
                      {post.caption}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-foreground-muted">
                      <span>{post.owner}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      {post.dueDate && (
                        <>
                          <span>•</span>
                          <span>Due {new Date(post.dueDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={getPriorityColor(post.priority)}>
                      {post.priority}
                    </Badge>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Instagram;
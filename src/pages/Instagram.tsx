import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ViewSidebar } from '@/components/ops/ViewSidebar';
import { Toolbar } from '@/components/ops/Toolbar';
import { KanbanBoard } from '@/components/ops/KanbanBoard';
import { DataTable } from '@/components/ops/DataTable';
import { BulkBar } from '@/components/ops/BulkBar';
import { RecordDrawer } from '@/components/ops/RecordDrawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Upload, 
  Download, 
  Zap,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import { useIGData } from '@/hooks/useIGData';

type ViewMode = 'operate' | 'data';

const Instagram: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('operate');
  const [currentView, setCurrentView] = useState('viwBoard');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const { posts, loading, updatePost, bulkUpdate } = useIGData(currentView);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchValue || 
      post.caption.toLowerCase().includes(searchValue.toLowerCase());
    const matchesOwner = !ownerFilter || post.owner === ownerFilter;
    const matchesPriority = !priorityFilter || post.priority === priorityFilter;
    
    return matchesSearch && matchesOwner && matchesPriority;
  });

  const kanbanColumns = [
    {
      id: 'backlog',
      title: 'Backlog',
      items: filteredPosts.filter(p => p.status === 'backlog'),
      color: 'chip'
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      items: filteredPosts.filter(p => p.status === 'in_progress'),
      color: 'chip-warning'
    },
    {
      id: 'needs_qa',
      title: 'Needs QA',
      items: filteredPosts.filter(p => p.status === 'needs_qa'),
      color: 'chip-danger'
    },
    {
      id: 'done',
      title: 'Done',
      items: filteredPosts.filter(p => p.status === 'done'),
      color: 'chip-success'
    }
  ];

  const tableColumns = [
    { 
      key: 'caption', 
      label: 'Caption', 
      sortable: true,
      render: (value: string) => (
        <div className="max-w-xs">
          <p className="line-clamp-2 text-sm">{value}</p>
        </div>
      )
    },
    { 
      key: 'mediaUrl', 
      label: 'Media', 
      render: (value: string) => (
        <img src={value} alt="Post" className="w-12 h-12 object-cover rounded" />
      )
    },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true }
  ];

  const handleStatusChange = (itemId: string, newStatus: string) => {
    updatePost(itemId, { status: newStatus as any });
  };

  const handleBulkAction = (action: string, value?: any) => {
    const updates: any = {};
    
    switch (action) {
      case 'set_status':
        updates.status = value;
        break;
      case 'assign_owner':
        updates.owner = value;
        break;
      case 'trigger_final_report':
        updates.sendFinalReport = true;
        break;
    }

    bulkUpdate(selectedIds, updates);
    setSelectedIds([]);
  };

  const handleRecordClick = (record: any) => {
    setSelectedRecord(record);
    setDrawerOpen(true);
  };

  const handleRecordSave = (updates: any) => {
    if (selectedRecord) {
      updatePost(selectedRecord.id, updates);
    }
  };

  const viewCounts = {
    viwBoard: posts.length,
    viwAllPosts: posts.length,
    viwDueSoon: posts.filter(p => {
      const dueDate = new Date(p.dueDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return dueDate <= tomorrow;
    }).length,
    viwCompleted: posts.filter(p => p.status === 'done').length
  };

  const owners = [...new Set(posts.map(p => p.owner))];
  const priorities = ['high', 'medium', 'low'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ViewSidebar
          service="ig"
          currentView={currentView}
          onViewChange={setCurrentView}
          viewCounts={viewCounts}
        />
        
        <SidebarInset>
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <Toolbar
              title="Instagram Content"
              description="Manage Instagram posts and content pipeline"
              mode={viewMode}
              onModeChange={setViewMode}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              recordCount={filteredPosts.length}
              selectedCount={selectedIds.length}
              filters={[
                {
                  key: 'owner',
                  label: 'Owner',
                  value: ownerFilter,
                  options: owners.map(owner => ({ value: owner, label: owner })),
                  onChange: setOwnerFilter
                },
                {
                  key: 'priority',
                  label: 'Priority',
                  value: priorityFilter,
                  options: priorities.map(priority => ({ value: priority, label: priority })),
                  onChange: setPriorityFilter
                }
              ]}
              actions={[
                { label: 'New Post', icon: Plus, onClick: () => {} },
                { label: 'Upload Assets', icon: Upload, onClick: () => {}, variant: 'outline' }
              ]}
            />

            {viewMode === 'operate' ? (
              <div className="space-y-6">
                {/* Automation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="card-glow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="h-5 w-5 text-primary" />
                        Final Report Automation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Trigger final report automation for completed posts
                      </p>
                      <Button 
                        size="sm" 
                        disabled={selectedIds.length === 0}
                        onClick={() => handleBulkAction('trigger_final_report')}
                      >
                        Trigger for {selectedIds.length}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-glow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Calendar className="h-5 w-5 text-warning" />
                        Due Today
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-warning mb-2">
                        {posts.filter(p => {
                          const today = new Date().toDateString();
                          return new Date(p.dueDate).toDateString() === today;
                        }).length}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Posts due today
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-glow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <AlertTriangle className="h-5 w-5 text-danger" />
                        High Priority
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-danger mb-2">
                        {posts.filter(p => p.priority === 'high' && p.status !== 'done').length}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        High priority pending
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <KanbanBoard
                  columns={kanbanColumns}
                  selectedIds={selectedIds}
                  onSelectionChange={setSelectedIds}
                  onItemClick={handleRecordClick}
                  onStatusChange={handleStatusChange}
                  service="ig"
                />
              </div>
            ) : (
              <DataTable
                data={filteredPosts}
                columns={tableColumns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                onItemClick={handleRecordClick}
              />
            )}
          </div>
        </SidebarInset>
      </div>

      <BulkBar
        selectedCount={selectedIds.length}
        onClear={() => setSelectedIds([])}
        onBulkAction={handleBulkAction}
        service="ig"
      />

      <RecordDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        record={selectedRecord}
        service="ig"
        onSave={handleRecordSave}
      />
    </SidebarProvider>
  );
};

export default Instagram;
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
  Play, 
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import { useSCData } from '@/hooks/useSCData';
import { getStatusColor } from '@/lib/ops';

type ViewMode = 'operate' | 'data';

const SoundCloud: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('operate');
  const [currentView, setCurrentView] = useState('viwActiveCampaigns');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { campaigns, loading, updateCampaign, bulkUpdate } = useSCData(currentView);

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = !searchValue || 
      campaign.trackInfo.toLowerCase().includes(searchValue.toLowerCase()) ||
      campaign.client.toLowerCase().includes(searchValue.toLowerCase());
    const matchesOwner = !ownerFilter || campaign.owner === ownerFilter;
    const matchesStatus = !statusFilter || campaign.status === statusFilter;
    
    return matchesSearch && matchesOwner && matchesStatus;
  });

  // Kanban columns for operate mode
  const kanbanColumns = [
    {
      id: 'active',
      title: 'Active',
      items: filteredCampaigns.filter(c => c.status === 'active'),
      color: 'chip-success'
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      items: filteredCampaigns.filter(c => c.status === 'in_progress'),
      color: 'chip-warning'
    },
    {
      id: 'complete',
      title: 'Complete',
      items: filteredCampaigns.filter(c => c.status === 'complete'),
      color: 'chip-success'
    },
    {
      id: 'cancelled',
      title: 'Cancelled',
      items: filteredCampaigns.filter(c => c.status === 'cancelled'),
      color: 'chip-danger'
    }
  ];

  // Table columns for data mode
  const tableColumns = [
    { key: 'trackInfo', label: 'Track Info', sortable: true },
    { key: 'client', label: 'Client', sortable: true },
    { key: 'service', label: 'Service', sortable: true },
    { key: 'goal', label: 'Goal', sortable: true },
    { key: 'remaining', label: 'Remaining', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true }
  ];

  const handleStatusChange = (itemId: string, newStatus: string) => {
    updateCampaign(itemId, { status: newStatus });
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
      case 'set_start_today':
        updates.startDate = new Date().toISOString().split('T')[0];
        break;
      case 'request_receipt':
        updates.receipts = 'requested';
        updates.notes = 'Receipt requested on ' + new Date().toLocaleDateString();
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
      updateCampaign(selectedRecord.id, updates);
    }
  };

  // View counts for sidebar
  const viewCounts = {
    viwActiveCampaigns: campaigns.filter(c => c.status === 'active').length,
    viwUpcoming: campaigns.filter(c => !c.startDate || new Date(c.startDate) > new Date()).length,
    viwNoReceipt: campaigns.filter(c => c.receipts === 'pending').length,
    viwAllCampaigns: campaigns.length
  };

  const owners = [...new Set(campaigns.map(c => c.owner))];
  const statuses = [...new Set(campaigns.map(c => c.status))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <ViewSidebar
          service="sc"
          currentView={currentView}
          onViewChange={setCurrentView}
          viewCounts={viewCounts}
        />
        
        <SidebarInset>
          {/* Header */}
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            <Toolbar
              title="SoundCloud Campaigns"
              description="Manage SoundCloud promotion campaigns and automation queue"
              mode={viewMode}
              onModeChange={setViewMode}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              recordCount={filteredCampaigns.length}
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
                  key: 'status',
                  label: 'Status',
                  value: statusFilter,
                  options: statuses.map(status => ({ value: status, label: status })),
                  onChange: setStatusFilter
                }
              ]}
              actions={[
                { label: 'New Campaign', icon: Plus, onClick: () => {} },
                { label: 'Import CSV', icon: Upload, onClick: () => {}, variant: 'outline' },
                { label: 'Export Queue', icon: Download, onClick: () => {}, variant: 'outline' }
              ]}
            />

            {viewMode === 'operate' ? (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="card-glow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Play className="h-5 w-5 text-primary" />
                        Start Today Macro
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Set selected campaigns to start today and mark as active
                      </p>
                      <Button 
                        size="sm" 
                        disabled={selectedIds.length === 0}
                        onClick={() => handleBulkAction('set_start_today')}
                      >
                        Apply to {selectedIds.length} campaigns
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-glow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="h-5 w-5 text-warning" />
                        Request Receipt
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Mark campaigns as receipt requested with timestamp
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={selectedIds.length === 0}
                        onClick={() => handleBulkAction('request_receipt')}
                      >
                        Request for {selectedIds.length}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-glow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="h-5 w-5 text-success" />
                        Queue Generator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Generate automation queue for active campaigns
                      </p>
                      <Button variant="outline" size="sm">
                        Generate Queue
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Kanban Board */}
                <KanbanBoard
                  columns={kanbanColumns}
                  selectedIds={selectedIds}
                  onSelectionChange={setSelectedIds}
                  onItemClick={handleRecordClick}
                  onStatusChange={handleStatusChange}
                  service="sc"
                />
              </div>
            ) : (
              /* Data Mode */
              <DataTable
                data={filteredCampaigns}
                columns={tableColumns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                onItemClick={handleRecordClick}
              />
            )}
          </div>
        </SidebarInset>
      </div>

      {/* Bulk Actions Bar */}
      <BulkBar
        selectedCount={selectedIds.length}
        onClear={() => setSelectedIds([])}
        onBulkAction={handleBulkAction}
        service="sc"
      />

      {/* Record Drawer */}
      <RecordDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        record={selectedRecord}
        service="sc"
        onSave={handleRecordSave}
      />
    </SidebarProvider>
  );
};

export default SoundCloud;
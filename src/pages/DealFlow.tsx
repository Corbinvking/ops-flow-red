import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ViewSidebar } from '@/components/ops/ViewSidebar';
import { Toolbar } from '@/components/ops/Toolbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Plus, TrendingUp, Users, DollarSign, FileText, Calendar, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DealFlow: React.FC = () => {
  const [viewMode, setViewMode] = useState<'operate' | 'data'>('operate');
  const [currentView, setCurrentView] = useState('activeDeals');

  // Mock data for now - will be replaced with real data from influence-dealflow
  const mockDeals = [
    {
      id: '1',
      artistName: 'Artist XYZ',
      dealType: 'Licensing',
      value: 25000,
      status: 'negotiating',
      dueDate: '2024-02-15',
      owner: 'Sarah Chen'
    },
    {
      id: '2',
      artistName: 'Producer ABC',
      dealType: 'Partnership',
      value: 15000,
      status: 'pending',
      dueDate: '2024-02-20',
      owner: 'Marcus Johnson'
    }
  ];

  const viewCounts = {
    activeDeals: mockDeals.filter(d => d.status === 'negotiating').length,
    pendingDeals: mockDeals.filter(d => d.status === 'pending').length,
    completedDeals: mockDeals.filter(d => d.status === 'completed').length,
    allDeals: mockDeals.length
  };

  const totalValue = mockDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <ViewSidebar
          service="dealflow"
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
              title="Deal Flow Management"
              description="Track artist partnerships, licensing deals, and revenue opportunities"
              mode={viewMode}
              onModeChange={setViewMode}
              recordCount={mockDeals.length}
              selectedCount={0}
              actions={[
                { label: 'New Deal', icon: Plus, onClick: () => {} },
                { label: 'Import Deals', icon: TrendingUp, onClick: () => {}, variant: 'outline' }
              ]}
            />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="card-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Handshake className="h-5 w-5 text-primary" />
                    Active Deals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{viewCounts.activeDeals}</p>
                  <p className="text-sm text-muted-foreground">Currently negotiating</p>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <DollarSign className="h-5 w-5 text-success" />
                    Revenue Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Potential value</p>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="h-5 w-5 text-warning" />
                    Pending Deals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{viewCounts.pendingDeals}</p>
                  <p className="text-sm text-muted-foreground">Awaiting response</p>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Target className="h-5 w-5 text-info" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Deals closed</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="card-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plus className="h-5 w-5 text-primary" />
                    Create New Deal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Start a new artist partnership or licensing agreement
                  </p>
                  <Button size="sm">
                    New Deal
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-5 w-5 text-warning" />
                    Generate Contracts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create legal documents for pending agreements
                  </p>
                  <Button variant="outline" size="sm">
                    Generate
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-5 w-5 text-success" />
                    Schedule Follow-ups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set reminders for deal milestones and check-ins
                  </p>
                  <Button variant="outline" size="sm">
                    Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Deals Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Deals</CardTitle>
                <CardDescription>
                  Latest partnership and licensing opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDeals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-4 rounded-lg bg-surface hover:bg-surface-elevated transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Handshake className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{deal.artistName}</h4>
                          <p className="text-sm text-muted-foreground">{deal.dealType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${deal.value.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Due: {deal.dueDate}</p>
                        </div>
                        <Badge 
                          variant={deal.status === 'negotiating' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {deal.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {deal.owner}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integration Notice */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Flow Integration</CardTitle>
                <CardDescription>
                  This tab will integrate with the influence-dealflow tool from GitHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integration with <a href="https://github.com/artistinfluence/influence-dealflow" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">influence-dealflow</a> coming soon.
                </p>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DealFlow;

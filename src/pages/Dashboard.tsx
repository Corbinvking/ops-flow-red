import React, { useEffect, useState } from 'react';
import {
  Target,
  Instagram,
  Music,
  Youtube,
  Cloud,
  FileText,
  Send,
  DollarSign,
  AlertTriangle,
  Users,
  Calendar,
  ArrowRight,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
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
import { mockAPI } from '@/data/mockData';
import { KPIData, Campaign, Invoice, Alert } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [kpiResult, campaignsResult, invoicesResult, alertsResult] = await Promise.all([
          mockAPI.getKPIData(),
          mockAPI.getCampaigns(),
          mockAPI.getInvoices(),
          mockAPI.getAlerts(),
        ]);

        setKpiData(kpiResult);
        setCampaigns(campaignsResult);
        setInvoices(invoicesResult);
        setAlerts(alertsResult);
      } catch (error) {
        toast({
          title: 'Error loading dashboard',
          description: 'Failed to load dashboard data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  const handleInvoiceDrop = async (invoiceId: string, newStatus: Invoice['status']) => {
    try {
      await mockAPI.updateInvoiceStatus(invoiceId, newStatus);
      setInvoices(prev => prev.map(inv => 
        inv.id === invoiceId ? { ...inv, status: newStatus } : inv
      ));
      toast({
        title: 'Invoice updated',
        description: `Invoice moved to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update invoice status',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-surface rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">Operations Dashboard</h1>
          <p className="text-foreground-muted mt-1">
            Monitor campaigns, track performance, and manage your unified operations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Campaigns"
          value={kpiData?.activeCampaigns || 0}
          icon={Target}
          trend={{ value: 12, direction: 'up' }}
          variant="success"
        />
        <KPICard
          title="IG Queue"
          value={kpiData?.igInQueue || 0}
          icon={Instagram}
          trend={{ value: 5, direction: 'down' }}
        />
        <KPICard
          title="Spotify Queue"
          value={kpiData?.spInQueue || 0}
          icon={Music}
          trend={{ value: 8, direction: 'up' }}
        />
        <KPICard
          title="YT Audited"
          value={kpiData?.ytVideosAudited || 0}
          icon={Youtube}
          trend={{ value: 23, direction: 'up' }}
          variant="success"
        />
        
        <KPICard
          title="SC Queue"
          value={kpiData?.scQueueSize || 0}
          icon={Cloud}
          trend={{ value: 3, direction: 'neutral' }}
        />
        <KPICard
          title="Invoices Paid"
          value={`$${((kpiData?.invoicesPaid || 0) * 2500).toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 15, direction: 'up' }}
          variant="success"
        />
        <KPICard
          title="Pending Invoices"
          value={`${(kpiData?.invoicesRequest || 0) + (kpiData?.invoicesSent || 0)}`}
          icon={FileText}
          trend={{ value: 2, direction: 'down' }}
          variant="warning"
        />
        <KPICard
          title="Active Alerts"
          value={kpiData?.alertsCount || 0}
          icon={AlertTriangle}
          trend={{ value: 1, direction: 'down' }}
          variant="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns Table */}
        <Card className="lg:col-span-2 card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Active Campaigns</CardTitle>
                <CardDescription>
                  Monitor campaign progress across all platforms
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <ArrowRight className="h-4 w-4 ml-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center gap-4 p-4 rounded-lg bg-surface hover:bg-surface-elevated transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {campaign.service === 'soundcloud' && <Cloud className="h-4 w-4 text-primary" />}
                    {campaign.service === 'spotify' && <Music className="h-4 w-4 text-primary" />}
                    {campaign.service === 'youtube' && <Youtube className="h-4 w-4 text-primary" />}
                    {campaign.service === 'instagram' && <Instagram className="h-4 w-4 text-primary" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">{campaign.name}</h4>
                      <Badge
                        variant={campaign.status === 'in_progress' ? 'default' : 
                                campaign.status === 'needs_qa' ? 'destructive' : 'secondary'}
                        className="shrink-0"
                      >
                        {campaign.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-muted mb-2">{campaign.owner}</p>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-foreground">{campaign.progress}%</p>
                    <p className="text-xs text-foreground-muted">
                      Due {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Invoice Kanban */}
          <Card className="card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Invoice Pipeline</CardTitle>
              <CardDescription>Drag to update status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['request', 'sent', 'paid'].map(status => {
                  const statusInvoices = invoices.filter(inv => inv.status === status);
                  const statusColors = {
                    request: 'border-warning/20 bg-warning/5',
                    sent: 'border-primary/20 bg-primary/5',
                    paid: 'border-success/20 bg-success/5'
                  };
                  
                  return (
                    <div key={status} className={`p-3 rounded-lg border ${statusColors[status as keyof typeof statusColors]}`}>
                      <h5 className="font-medium text-sm mb-2 capitalize flex items-center justify-between">
                        {status}
                        <span className="text-xs opacity-60">{statusInvoices.length}</span>
                      </h5>
                      <div className="space-y-2">
                        {statusInvoices.slice(0, 2).map(invoice => (
                          <div key={invoice.id} className="p-2 rounded bg-surface hover:bg-surface-elevated transition-colors cursor-move">
                            <p className="text-sm font-medium">{invoice.clientName}</p>
                            <p className="text-xs text-foreground-muted">${invoice.amount.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface hover:bg-surface-elevated transition-colors">
                    <div className={`p-1 rounded-full mt-0.5 ${
                      alert.severity === 'error' ? 'bg-danger/20 text-danger' :
                      alert.severity === 'warning' ? 'bg-warning/20 text-warning' :
                      alert.severity === 'success' ? 'bg-success/20 text-success' :
                      'bg-primary/20 text-primary'
                    }`}>
                      <AlertTriangle className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{alert.title}</p>
                      <p className="text-xs text-foreground-muted mt-1">{alert.message}</p>
                      <p className="text-xs text-foreground-subtle mt-1">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
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

export default Dashboard;
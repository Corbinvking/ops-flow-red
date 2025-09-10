import React from 'react';
import { useAirtableDashboard } from '@/hooks/useAirtableTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  DollarSign, 
  Users, 
  FileText, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

export const AirtableDashboard: React.FC = () => {
  const { overview, health, sync } = useAirtableDashboard();

  const getHealthStatus = () => {
    if (health.loading) return { status: 'loading', text: 'Checking...', color: 'secondary' };
    if (health.error) return { status: 'error', text: 'Error', color: 'destructive' };
    if (overview.isHealthy) return { status: 'healthy', text: 'Healthy', color: 'default' };
    return { status: 'degraded', text: 'Degraded', color: 'destructive' };
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Airtable Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time data from your Airtable integration
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={health.checkHealth} 
            disabled={health.loading}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${health.loading ? 'animate-spin' : ''}`} />
            Refresh Health
          </Button>
          {sync.isAdmin && (
            <Button 
              onClick={() => sync.triggerSync()} 
              disabled={sync.loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${sync.loading ? 'animate-spin' : ''}`} />
              Trigger Sync
            </Button>
          )}
        </div>
      </div>

      {/* Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant={healthStatus.color as any}>
                {healthStatus.text}
              </Badge>
              {overview.lastSync && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Last sync: {new Date(overview.lastSync).toLocaleString()}
                </div>
              )}
            </div>
            {health.health && (
              <div className="text-sm text-muted-foreground">
                Phase: {health.health.phase}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${overview.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From all campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${overview.totalSpend.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Instagram campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Invoice requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sync Status */}
      {sync.isAdmin && sync.syncStatus.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Sync Status
            </CardTitle>
            <CardDescription>
              Last sync status for all configured tables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sync.syncStatus.map((table) => (
                <div key={table?.table || `table-${Math.random()}`} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium capitalize">
                      {table?.table?.replace('_', ' ') || 'Unknown Table'}
                    </div>
                    <Badge 
                      variant={table?.status === 'completed' ? 'default' : 'destructive'}
                    >
                      {table?.status || 'unknown'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{table?.recordsSynced || 0} records</span>
                    <span>
                      {table?.lastSync ? new Date(table.lastSync).toLocaleString() : 'Never'}
                    </span>
                    {table?.hasErrors && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common operations for managing your Airtable data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>View All Tables</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Export Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span>View Metrics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

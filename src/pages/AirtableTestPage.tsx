import React, { useState } from 'react';
import { useAirtableDashboard, useSpotifyData, useInstagramData, useSoundCloudData, useYouTubeData } from '@/hooks/useAirtableTabs';
import { useAirtableHealth, useAirtableSync } from '@/hooks/useAirtableData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  DollarSign, 
  Users, 
  FileText, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Clock,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Save
} from 'lucide-react';

export const AirtableTestPage: React.FC = () => {
  const [testRecord, setTestRecord] = useState({
    Campaign: '',
    Status: 'Active',
    'Sale price': '',
    Goal: '',
    URL: ''
  });

  const [isCreating, setIsCreating] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Get all the data hooks
  const dashboard = useAirtableDashboard();
  const spotify = useSpotifyData();
  const instagram = useInstagramData();
  const soundcloud = useSoundCloudData();
  const youtube = useYouTubeData();
  // Invoice tables removed - not available in current Airtable base
  const health = useAirtableHealth();
  const sync = useAirtableSync();

  // Test creating a record
  const handleCreateTestRecord = async () => {
    if (!testRecord.Campaign.trim()) {
      setLastAction('Error: Campaign name is required');
      return;
    }

    setIsCreating(true);
    try {
      const newRecord = await spotify.createRecord({
        Campaign: testRecord.Campaign,
        Status: testRecord.Status,
        'Sale price': testRecord['Sale price'] ? parseFloat(testRecord['Sale price']) : 0,
        Goal: testRecord.Goal,
        URL: testRecord.URL
      });

      if (newRecord) {
        setLastAction(`✅ Created record: ${newRecord.fields.Campaign} (ID: ${newRecord.id})`);
        setTestRecord({
          Campaign: '',
          Status: 'Active',
          'Sale price': '',
          Goal: '',
          URL: ''
        });
      } else {
        setLastAction('❌ Failed to create record');
      }
    } catch (error) {
      setLastAction(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsCreating(false);
    }
  };

  // Test updating a record
  const handleUpdateRecord = async (recordId: string, newStatus: string) => {
    try {
      const updatedRecord = await spotify.updateRecord(recordId, {
        Status: newStatus
      });

      if (updatedRecord) {
        setLastAction(`✅ Updated record ${recordId} to status: ${newStatus}`);
      } else {
        setLastAction('❌ Failed to update record');
      }
    } catch (error) {
      setLastAction(`❌ Update error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test sync trigger
  const handleSyncTest = async () => {
    try {
      await sync.triggerSync('spotify');
      setLastAction('🔄 Sync triggered for Spotify table');
    } catch (error) {
      setLastAction(`❌ Sync error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getHealthStatus = () => {
    if (health.loading) return { status: 'loading', text: 'Checking...', color: 'secondary' };
    if (health.error) return { status: 'error', text: 'Error', color: 'destructive' };
    if (health.health?.ok) return { status: 'healthy', text: 'Healthy', color: 'default' };
    return { status: 'degraded', text: 'Degraded', color: 'destructive' };
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Airtable Integration Test Page</h1>
          <p className="text-muted-foreground">
            Test all Airtable capabilities: Read, Write, Sync, and Health Monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={health.checkHealth} disabled={health.loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${health.loading ? 'animate-spin' : ''}`} />
            Check Health
          </Button>
          {sync.isAdmin && (
            <Button onClick={handleSyncTest} disabled={sync.loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${sync.loading ? 'animate-spin' : ''}`} />
              Test Sync
            </Button>
          )}
        </div>
      </div>

      {/* Last Action Alert */}
      {lastAction && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{lastAction}</AlertDescription>
        </Alert>
      )}

      {/* Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Badge variant={healthStatus.color as any}>
                {healthStatus.text}
              </Badge>
              <span className="text-sm text-muted-foreground">API Health</span>
            </div>
            {health.health && (
              <>
                <div className="text-sm">
                  <strong>Phase:</strong> {health.health.phase}
                </div>
                <div className="text-sm">
                  <strong>Tables:</strong> {health.health.availableTables?.length || 0}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
          <CardDescription>Real-time data from all Airtable tables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{dashboard.overview.totalCampaigns}</div>
              <div className="text-sm text-muted-foreground">Total Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${dashboard.overview.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${dashboard.overview.totalSpend.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Spend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{dashboard.overview.pendingRequests}</div>
              <div className="text-sm text-muted-foreground">Pending Requests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Create Record */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Test Create Record
          </CardTitle>
          <CardDescription>Create a new Spotify campaign record to test write capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="campaign">Campaign Name *</Label>
              <Input
                id="campaign"
                value={testRecord.Campaign}
                onChange={(e) => setTestRecord(prev => ({ ...prev, Campaign: e.target.value }))}
                placeholder="Test Campaign 2024"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={testRecord.Status}
                onChange={(e) => setTestRecord(prev => ({ ...prev, Status: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <Label htmlFor="price">Sale Price</Label>
              <Input
                id="price"
                type="number"
                value={testRecord['Sale price']}
                onChange={(e) => setTestRecord(prev => ({ ...prev, 'Sale price': e.target.value }))}
                placeholder="1000"
              />
            </div>
            <div>
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                value={testRecord.Goal}
                onChange={(e) => setTestRecord(prev => ({ ...prev, Goal: e.target.value }))}
                placeholder="1000 plays"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={testRecord.URL}
                onChange={(e) => setTestRecord(prev => ({ ...prev, URL: e.target.value }))}
                placeholder="https://open.spotify.com/playlist/..."
              />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              onClick={handleCreateTestRecord} 
              disabled={isCreating || !spotify.hasWritePermission}
              className="w-full"
            >
              {isCreating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              {isCreating ? 'Creating...' : 'Create Test Record'}
            </Button>
            {!spotify.hasWritePermission && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                You don't have permission to create records
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Tables */}
      <Tabs defaultValue="spotify" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spotify">Spotify ({spotify.data.length})</TabsTrigger>
          <TabsTrigger value="instagram">Instagram ({instagram.data.length})</TabsTrigger>
          <TabsTrigger value="soundcloud">SoundCloud ({soundcloud.data.length})</TabsTrigger>
          <TabsTrigger value="youtube">YouTube ({youtube.data.length})</TabsTrigger>
          {/* Invoice tables removed - not available in current Airtable base */}
        </TabsList>

        <TabsContent value="spotify">
          <Card>
            <CardHeader>
              <CardTitle>Spotify Playlisting Data</CardTitle>
              <CardDescription>
                {spotify.loading ? 'Loading...' : `${spotify.data.length} records`}
                {spotify.error && ` - Error: ${spotify.error}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spotify.data.slice(0, 5).map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{record.fields.Campaign || 'Untitled Campaign'}</h3>
                        <p className="text-sm text-muted-foreground">
                          Status: {record.fields.Status} | 
                          Price: ${record.fields['Sale price'] || 0} | 
                          Goal: {record.fields.Goal || 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateRecord(record.id, 'Completed')}
                          disabled={!spotify.hasWritePermission}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateRecord(record.id, 'Paused')}
                          disabled={!spotify.hasWritePermission}
                        >
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {spotify.data.length === 0 && !spotify.loading && (
                  <div className="text-center py-8 text-muted-foreground">
                    No Spotify records found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Seeding Data</CardTitle>
              <CardDescription>
                {instagram.loading ? 'Loading...' : `${instagram.data.length} records`}
                {instagram.error && ` - Error: ${instagram.error}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instagram.data.slice(0, 5).map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{record.fields.campaign || 'Untitled Campaign'}</h3>
                        <p className="text-sm text-muted-foreground">
                          Status: {record.fields.status} | 
                          Spend: ${record.fields.spend || 0} | 
                          Remaining: ${record.fields.remaining || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {instagram.data.length === 0 && !instagram.loading && (
                  <div className="text-center py-8 text-muted-foreground">
                    No Instagram records found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="soundcloud">
          <Card>
            <CardHeader>
              <CardTitle>SoundCloud Track Data</CardTitle>
              <CardDescription>
                {soundcloud.loading ? 'Loading...' : `${soundcloud.data.length} records`}
                {soundcloud.error && ` - Error: ${soundcloud.error}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {soundcloud.data.slice(0, 5).map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{record.fields.track_info || 'Untitled Track'}</h3>
                        <p className="text-sm text-muted-foreground">
                          Service: {record.fields.service_type} | 
                          Status: {record.fields.status} | 
                          Price: ${record.fields.sale_price || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {soundcloud.data.length === 0 && !soundcloud.loading && (
                  <div className="text-center py-8 text-muted-foreground">
                    No SoundCloud records found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="youtube">
          <Card>
            <CardHeader>
              <CardTitle>YouTube Analytics Data</CardTitle>
              <CardDescription>
                {youtube.loading ? 'Loading...' : `${youtube.data.length} records`}
                {youtube.error && ` - Error: ${youtube.error}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {youtube.data.slice(0, 5).map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{record.fields.Campaign || 'Untitled Campaign'}</h3>
                        <p className="text-sm text-muted-foreground">
                          Service: {record.fields['Service Type']} | 
                          Status: {record.fields.Status} | 
                          Price: ${record.fields['Sale Price'] || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {youtube.data.length === 0 && !youtube.loading && (
                  <div className="text-center py-8 text-muted-foreground">
                    No YouTube records found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoice and Invoice Request tabs removed - tables not available in current Airtable base */}
      </Tabs>

      {/* Sync Status (Admin Only) */}
      {sync.isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Sync Status (Admin Only)
            </CardTitle>
            <CardDescription>Current sync status for all configured tables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sync.syncStatus.map((table) => (
                <div key={table.table} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium capitalize">
                      {table.table.replace('_', ' ')}
                    </div>
                    <Badge 
                      variant={table.status === 'completed' ? 'default' : 'destructive'}
                    >
                      {table.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{table.recordsSynced} records</span>
                    <span>
                      {new Date(table.lastSync).toLocaleString()}
                    </span>
                    {table.hasErrors && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
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

export default AirtableTestPage;

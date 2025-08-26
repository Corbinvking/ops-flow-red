import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Server,
  Database
} from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface ConnectionStatus {
  rbac: 'connected' | 'disconnected' | 'error' | 'checking';
  airtable: 'connected' | 'disconnected' | 'error' | 'checking';
  lastChecked: Date | null;
}

export const ConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    rbac: 'checking',
    airtable: 'checking',
    lastChecked: null,
  });
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const checkConnections = async () => {
    setIsChecking(true);
    setStatus(prev => ({
      ...prev,
      rbac: 'checking',
      airtable: 'checking',
    }));

    try {
      // Check RBAC API
      try {
        await api.health.rbac();
        setStatus(prev => ({ ...prev, rbac: 'connected' }));
      } catch (error) {
        console.error('RBAC API check failed:', error);
        setStatus(prev => ({ ...prev, rbac: 'error' }));
      }

      // Check Airtable API
      try {
        await api.health.airtable();
        setStatus(prev => ({ ...prev, airtable: 'connected' }));
      } catch (error) {
        console.error('Airtable API check failed:', error);
        setStatus(prev => ({ ...prev, airtable: 'error' }));
      }

      setStatus(prev => ({ ...prev, lastChecked: new Date() }));

      const allConnected = status.rbac === 'connected' && status.airtable === 'connected';
      if (allConnected) {
        toast({
          title: 'All systems connected',
          description: 'Both RBAC and Airtable APIs are responding.',
        });
      } else {
        toast({
          title: 'Connection issues detected',
          description: 'Some APIs are not responding. Check the status below.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Connection check failed',
        description: 'Unable to verify API connections.',
        variant: 'destructive',
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnections();
  }, []);

  const getStatusIcon = (status: ConnectionStatus['rbac' | 'airtable']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'checking':
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <WifiOff className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: ConnectionStatus['rbac' | 'airtable']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'checking':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusText = (status: ConnectionStatus['rbac' | 'airtable']) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      case 'checking':
        return 'Checking...';
      default:
        return 'Disconnected';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          API Connection Status
        </CardTitle>
        <CardDescription>
          Monitor the connection status of your backend services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* RBAC API Status */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">RBAC API</p>
              <p className="text-sm text-muted-foreground">Authentication & User Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(status.rbac)}
            <Badge variant="outline" className={getStatusColor(status.rbac)}>
              {getStatusText(status.rbac)}
            </Badge>
          </div>
        </div>

        {/* Airtable API Status */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-purple-500" />
            <div>
              <p className="font-medium">Airtable API</p>
              <p className="text-sm text-muted-foreground">Business Data & Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(status.airtable)}
            <Badge variant="outline" className={getStatusColor(status.airtable)}>
              {getStatusText(status.airtable)}
            </Badge>
          </div>
        </div>

        {/* Last Checked */}
        {status.lastChecked && (
          <p className="text-sm text-muted-foreground">
            Last checked: {status.lastChecked.toLocaleTimeString()}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={checkConnections} 
            disabled={isChecking}
            className="flex-1"
          >
            {isChecking ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Connections
              </>
            )}
          </Button>
        </div>

        {/* Error Alerts */}
        {status.rbac === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              RBAC API is not responding. Check if the backend server is running on port 3000.
            </AlertDescription>
          </Alert>
        )}

        {status.airtable === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Airtable API is not responding. Check if the Airtable integration server is running on port 3001.
            </AlertDescription>
          </Alert>
        )}

        {/* Connection Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Development:</strong> RBAC API: localhost:3000, Airtable API: localhost:3001</p>
          <p><strong>Production:</strong> Both APIs served through DigitalOcean with Nginx proxy</p>
        </div>
      </CardContent>
    </Card>
  );
};

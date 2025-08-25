import React, { useState } from 'react';
import { Save, User, Palette, Database, Key, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { mockUser } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [apiKeys, setApiKeys] = useState({
    soundcloud: '••••••••••••••••••••••••sk_test_123',
    youtube: '••••••••••••••••••••••••yt_key_456',
    instagram: '',
    spotify: '••••••••••••••••••••••••sp_key_789',
  });
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been saved.',
    });
  };

  const handleToggleNotifications = (enabled: boolean) => {
    setUser(prev => ({
      ...prev,
      preferences: { ...prev.preferences, notifications: enabled }
    }));
    toast({
      title: enabled ? 'Notifications enabled' : 'Notifications disabled',
      description: `You will ${enabled ? 'now receive' : 'no longer receive'} notifications.`,
    });
  };

  const handleSaveApiKey = (platform: string) => {
    toast({
      title: 'API Key saved',
      description: `${platform} API key has been updated.`,
    });
  };

  const handleTestConnection = (platform: string) => {
    toast({
      title: 'Testing connection',
      description: `Testing ${platform} API connection...`,
    });
    
    // Simulate connection test
    setTimeout(() => {
      toast({
        title: 'Connection successful',
        description: `${platform} API is working correctly.`,
      });
    }, 2000);
  };

  const dataSources = [
    {
      name: 'Airtable',
      status: 'connected',
      lastSync: '2024-01-22T10:30:00Z',
      description: 'Campaign and client data management'
    },
    {
      name: 'Supabase',
      status: 'connected',
      lastSync: '2024-01-22T09:15:00Z',
      description: 'Real-time database and analytics'
    },
    {
      name: 'Google Analytics',
      status: 'disconnected',
      lastSync: null,
      description: 'Website and performance tracking'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error': return <XCircle className="h-4 w-4 text-danger" />;
      default: return <XCircle className="h-4 w-4 text-foreground-muted" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'chip-success';
      case 'error': return 'chip-danger';
      default: return 'chip';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">Settings</h1>
          <p className="text-foreground-muted mt-1">
            Manage your account, integrations, and system preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    value={user.name}
                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <Select value={user.role} onValueChange={(value) => setUser(prev => ({ ...prev, role: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Theme</p>
                  <p className="text-sm text-foreground-muted">Choose your preferred color scheme</p>
                </div>
                <Badge className="chip-primary">Dark Mode</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Notifications</p>
                  <p className="text-sm text-foreground-muted">Receive alerts and updates</p>
                </div>
                <Switch
                  checked={user.preferences.notifications}
                  onCheckedChange={handleToggleNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage your integration API keys and credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(apiKeys).map(([platform, key]) => (
                <div key={platform}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium capitalize">{platform} API Key</label>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTestConnection(platform)}
                      >
                        Test
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSaveApiKey(platform)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <Input
                    type="password"
                    value={key}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, [platform]: e.target.value }))}
                    placeholder={key ? undefined : 'Enter your API key'}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Data Sources */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Sources
              </CardTitle>
              <CardDescription>
                Connected databases and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dataSources.map((source) => (
                <div key={source.name} className="p-3 rounded-lg bg-surface">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(source.status)}
                      <span className="font-medium text-foreground text-sm">{source.name}</span>
                    </div>
                    <Badge className={getStatusColor(source.status)}>
                      {source.status}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-foreground-muted mb-2">
                    {source.description}
                  </p>
                  
                  {source.lastSync && (
                    <p className="text-xs text-foreground-subtle">
                      Last sync: {new Date(source.lastSync).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="card border-danger/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-danger">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full" disabled>
                      Clear All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all
                        your data including campaigns, leads, and settings.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-danger hover:bg-danger/90">
                        Yes, delete everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full" disabled>
                      Reset to Defaults
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset all settings?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will reset all your preferences, API keys, and configurations
                        to their default values. Your data will remain intact.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Reset Settings</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button variant="destructive" className="w-full" disabled>
                  Delete Account
                </Button>
              </div>
              
              <div className="text-xs text-foreground-muted">
                <p>These actions are currently disabled in demo mode.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
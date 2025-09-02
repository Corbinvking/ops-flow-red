import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Calendar,
  ArrowRight,
  Settings
} from 'lucide-react';
import { useWorkflowOrchestration, type DeadlineAlert } from '@/hooks/useWorkflowOrchestration';
import { format } from 'date-fns';

export const WorkflowDashboard = () => {
  const { 
    checkDeadlineAlerts, 
    checkCampaignCompletion,
    calculateOptimalDeadlines,
    workflowRules 
  } = useWorkflowOrchestration();
  
  const [deadlineAlerts, setDeadlineAlerts] = useState<DeadlineAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [workflowStats, setWorkflowStats] = useState({
    totalRulesExecuted: 0,
    activeWorkflows: 0,
    automatedActions: 0
  });

  useEffect(() => {
    loadDashboardData();
    // Refresh every 5 minutes
    const interval = setInterval(loadDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const alerts = await checkDeadlineAlerts();
      setDeadlineAlerts(alerts);
      
      // Update workflow stats
      setWorkflowStats({
        totalRulesExecuted: workflowRules.filter(r => r.enabled).length,
        activeWorkflows: workflowRules.length,
        automatedActions: alerts.length
      });
    } catch (error) {
      console.error('Error loading workflow dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type: DeadlineAlert['type']) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <Clock className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type: DeadlineAlert['type']) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workflow Orchestration</h2>
          <p className="text-muted-foreground">
            Automated workflows and intelligent deadline management
          </p>
        </div>
        <Button onClick={loadDashboardData} variant="outline">
          <Zap className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflowStats.activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">
              {workflowStats.totalRulesExecuted} rules enabled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadline Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deadlineAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {deadlineAlerts.filter(a => a.type === 'overdue').length} overdue items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              System uptime & rule execution
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Deadline Alerts</TabsTrigger>
          <TabsTrigger value="rules">Workflow Rules</TabsTrigger>
          <TabsTrigger value="automation">Smart Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Deadline Alerts</CardTitle>
              <CardDescription>
                Critical deadlines and overdue items requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {deadlineAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground">No urgent deadlines at the moment.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {deadlineAlerts.map(alert => (
                    <Alert key={alert.id} className="border-l-4 border-l-red-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getAlertIcon(alert.type)}
                          <div>
                            <div className="font-medium">{alert.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {alert.campaignName} • {alert.message}
                            </div>
                          </div>
                        </div>
                        <Badge variant={getBadgeVariant(alert.type)}>
                          {alert.type}
                        </Badge>
                      </div>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Rules</CardTitle>
              <CardDescription>
                Configure automated actions and status cascading rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowRules.map(rule => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm text-muted-foreground">
                        When {rule.trigger.field} {rule.trigger.condition.replace('_', ' ')} "{rule.trigger.value}"
                        <ArrowRight className="inline mx-2 h-3 w-3" />
                        Set {rule.action.field} to "{rule.action.value}"
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? "Active" : "Disabled"}
                      </Badge>
                      <Switch checked={rule.enabled} disabled />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Automation Tools</CardTitle>
              <CardDescription>
                Intelligent deadline calculation and workflow optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Optimal Deadline Calculator</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically calculate and set optimal deadlines based on campaign timeline and creator workload.
                </p>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Recalculate All Deadlines
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Smart Status Cascading</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically update related statuses when key milestones are reached.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-cascade enabled</span>
                  <Switch checked disabled />
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Escalation Management</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically escalate overdue items and send notifications to relevant team members.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-escalation enabled</span>
                  <Switch checked disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
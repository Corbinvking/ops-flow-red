import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Users, 
  Calendar, 
  Target, 
  Play,
  History,
  Settings,
  CreditCard,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MemberPortalLayoutProps {
  children: React.ReactNode;
}

const MemberPortalLayout: React.FC<MemberPortalLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const stats = {
    credits: 500,
    activeSubmissions: 12,
    totalPlays: "1.2M",
    recentEngagement: "4.8%"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-5 w-5 text-primary" />
                Available Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.credits}</div>
              <p className="text-sm text-muted-foreground">Credits to use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Music className="h-5 w-5 text-warning" />
                Active Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSubmissions}</div>
              <p className="text-sm text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Play className="h-5 w-5 text-success" />
                Total Plays
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPlays}</div>
              <p className="text-sm text-muted-foreground">Across all tracks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-5 w-5 text-accent" />
                Recent Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentEngagement}</div>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <Target className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate('/submissions')}>
            <Music className="h-4 w-4 mr-2" />
            Submit Track
          </Button>
          <Button variant="outline" onClick={() => navigate('/queue')}>
            <Calendar className="h-4 w-4 mr-2" />
            Queue
          </Button>
          <Button variant="outline" onClick={() => navigate('/history')}>
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button variant="outline" onClick={() => navigate('/settings')}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MemberPortalLayout;
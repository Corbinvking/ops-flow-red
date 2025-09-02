import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Home, Plus, History, LogOut, User, CheckCircle, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { WorkflowAlerts } from "./WorkflowAlerts";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Don't show navigation on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/auth');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="text-2xl font-bebas tracking-wider">
              <span className="text-foreground">ARTIST</span>{" "}
              <span className="text-accent">INFLUENCE</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/dashboard">
              <Button 
                variant={isActive("/dashboard") ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                HOME
              </Button>
            </Link>
            
            <Link to="/creators">
              <Button 
                variant={isActive("/creators") ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <Database className="h-4 w-4" />
                CREATORS
              </Button>
            </Link>
            
            <Link to="/campaign-builder">
              <Button 
                variant={isActive("/campaign-builder") ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                BUILD CAMPAIGN
              </Button>
            </Link>
            
            <Link to="/qa">
              <Button 
                variant={isActive("/qa") ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                QA
              </Button>
            </Link>
            
            <Link to="/workflow">
              <Button 
                variant={isActive("/workflow") ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                WORKFLOW
              </Button>
            </Link>
            
            <Link to="/campaigns">
              <Button 
                variant={isActive("/campaigns") ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                HISTORY
              </Button>
            </Link>

            {/* User Menu */}
            <WorkflowAlerts />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block">{user?.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <User className="h-4 w-4 mr-2" />
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  SIGN OUT
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
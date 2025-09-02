import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Cloud, 
  Youtube, 
  Instagram, 
  Music, 
  Palette,
  Settings,
  Badge,
  Handshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/' },
  { id: 'soundcloud', label: 'SoundCloud', icon: Cloud, path: '/soundcloud', badge: 12 },
  { id: 'youtube', label: 'YouTube', icon: Youtube, path: '/youtube' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, path: '/instagram', badge: 8 },
  { id: 'spotify', label: 'Spotify', icon: Music, path: '/spotify', badge: 5 },
  { id: 'dealflow', label: 'Deal Flow', icon: Handshake, path: '/dealflow' },
  { id: 'visualizer', label: 'Visualizer', icon: Palette, path: '/visualizer' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="border-b border-border bg-surface/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className={`
                  pill relative shrink-0 gap-2
                  ${active ? 'pill-active' : ''}
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="chip chip-primary ml-1 px-1.5 py-0.5 text-xs">
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
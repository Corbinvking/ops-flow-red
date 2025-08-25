import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { getViewsForService } from '@/lib/ops';

interface ViewSidebarProps {
  service: 'sc' | 'ig' | 'sp' | 'yt' | 'inv';
  currentView: string;
  onViewChange: (view: string) => void;
  viewCounts?: Record<string, number>;
}

export const ViewSidebar: React.FC<ViewSidebarProps> = ({
  service,
  currentView,
  onViewChange,
  viewCounts = {}
}) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const views = getViewsForService(service);
  
  const viewItems = Object.entries(views).map(([name, id]) => ({
    name,
    id,
    count: viewCounts[id] || 0
  }));

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {viewItems.map((view) => (
                <SidebarMenuItem key={view.id}>
                  <SidebarMenuButton
                    isActive={currentView === view.id}
                    onClick={() => onViewChange(view.id)}
                    className="w-full justify-between"
                  >
                    <span className="truncate">{view.name}</span>
                    {!collapsed && view.count > 0 && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {view.count}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreVertical, Calendar, User, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getStatusColor, getPriorityColor } from '@/lib/ops';

interface KanbanColumn {
  id: string;
  title: string;
  items: any[];
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onItemClick: (item: any) => void;
  onStatusChange: (itemId: string, newStatus: string) => void;
  service: 'sc' | 'ig' | 'sp' | 'yt' | 'inv';
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  selectedIds,
  onSelectionChange,
  onItemClick,
  onStatusChange,
  service
}) => {
  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData('text/plain');
    const item = JSON.parse(itemData);
    onStatusChange(item.id, columnId);
  };

  const handleSelect = (itemId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, itemId]);
    } else {
      onSelectionChange(selectedIds.filter(id => id !== itemId));
    }
  };

  const renderItemCard = (item: any) => {
    const isSelected = selectedIds.includes(item.id);

    return (
      <div
        key={item.id}
        draggable
        onDragStart={(e) => handleDragStart(e, item)}
        className={`
          group relative cursor-pointer rounded-lg border border-border bg-card p-3 
          transition-all hover:border-border-hover hover:shadow-md
          ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
        `}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('input[type="checkbox"]') && !target.closest('button')) {
            onItemClick(item);
          }
        }}
      >
        {/* Selection Checkbox */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => handleSelect(item.id, checked as boolean)}
            className="h-4 w-4"
          />
        </div>

        {/* Card Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onItemClick(item)}>
                Edit Details
              </DropdownMenuItem>
              {item.url && (
                <DropdownMenuItem onClick={() => window.open(item.url, '_blank')}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open URL
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Card Content */}
        <div className="mt-6 space-y-3">
          {/* Title/Primary Info */}
          <div>
            {service === 'sc' && (
              <div>
                <h4 className="font-medium text-sm">{item.trackInfo || 'Unnamed Track'}</h4>
                <p className="text-xs text-muted-foreground">{item.client}</p>
              </div>
            )}
            {service === 'ig' && (
              <div>
                <p className="text-sm line-clamp-2">{item.caption}</p>
                {item.mediaUrl && (
                  <div className="mt-2">
                    <img 
                      src={item.mediaUrl} 
                      alt="Post preview" 
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            )}
            {service === 'sp' && (
              <div>
                <h4 className="font-medium text-sm">{item.artistName}</h4>
                <p className="text-xs text-muted-foreground">{item.trackName}</p>
              </div>
            )}
            {service === 'yt' && (
              <div>
                <p className="text-sm line-clamp-1">{item.url}</p>
                <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{item.views?.toLocaleString()} views</span>
                  <span>{item.likes?.toLocaleString()} likes</span>
                </div>
              </div>
            )}
            {service === 'inv' && (
              <div>
                <h4 className="font-medium text-sm">{item.clientName}</h4>
                <p className="text-xs text-muted-foreground">
                  ${item.amount?.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Owner */}
              {item.owner && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{item.owner}</span>
                </div>
              )}
              
              {/* Date */}
              {(item.dueDate || item.eta || item.startDate) && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(item.dueDate || item.eta || item.startDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Priority/Service Badge */}
            <div className="flex gap-1">
              {item.priority && (
                <Badge variant="outline" className={getPriorityColor(item.priority)}>
                  {item.priority}
                </Badge>
              )}
              {item.service && (
                <Badge variant="outline" className="text-xs">
                  {item.service}
                </Badge>
              )}
            </div>
          </div>

          {/* Progress for SC */}
          {service === 'sc' && item.goal && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{item.remaining || 0}/{item.goal}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all" 
                  style={{ 
                    width: `${Math.max(0, Math.min(100, ((item.goal - (item.remaining || 0)) / item.goal) * 100))}%` 
                  }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span>{column.title}</span>
                <Badge variant="outline" className={column.color || ''}>
                  {column.items.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
              {column.items.map(renderItemCard)}
              {column.items.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No items in this column</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
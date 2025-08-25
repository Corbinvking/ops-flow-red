import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Upload, 
  Download, 
  Search, 
  Filter,
  LayoutGrid,
  Table as TableIcon,
  SlidersHorizontal
} from 'lucide-react';

interface ToolbarProps {
  title: string;
  description?: string;
  mode: 'operate' | 'data';
  onModeChange: (mode: 'operate' | 'data') => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: Array<{
    key: string;
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
  }>;
  actions?: Array<{
    label: string;
    icon?: React.ElementType;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  }>;
  recordCount?: number;
  selectedCount?: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  title,
  description,
  mode,
  onModeChange,
  searchValue,
  onSearchChange,
  filters = [],
  actions = [],
  recordCount,
  selectedCount
}) => {
  return (
    <div className="toolbar">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-space-grotesk font-bold">{title}</h1>
          {recordCount !== undefined && (
            <Badge variant="outline" className="chip">
              {recordCount} total
            </Badge>
          )}
          {selectedCount !== undefined && selectedCount > 0 && (
            <Badge className="chip-primary">
              {selectedCount} selected
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        {onSearchChange && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        )}

        {/* Filters */}
        {filters.map((filter) => (
          <Select key={filter.key} value={filter.value} onValueChange={filter.onChange}>
            <SelectTrigger className="w-auto gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <Button
            variant={mode === 'operate' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onModeChange('operate')}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            Operate
          </Button>
          <Button
            variant={mode === 'data' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onModeChange('data')}
            className="gap-2"
          >
            <TableIcon className="h-4 w-4" />
            Data
          </Button>
        </div>

        {/* Action Buttons */}
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant={action.variant || 'default'}
              onClick={action.onClick}
              className="gap-2"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
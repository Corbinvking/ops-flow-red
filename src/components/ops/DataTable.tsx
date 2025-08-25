import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';
import { getStatusColor, getPriorityColor } from '@/lib/ops';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onItemClick: (item: any) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    column: string | null;
    direction: 'asc' | 'desc';
    onSort: (column: string) => void;
  };
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  selectedIds,
  onSelectionChange,
  onItemClick,
  pagination,
  sorting
}) => {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(data.map(item => item.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, itemId]);
    } else {
      onSelectionChange(selectedIds.filter(id => id !== itemId));
    }
  };

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;
  const isPartiallySelected = selectedIds.length > 0 && selectedIds.length < data.length;

  const renderCellValue = (column: Column, item: any) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }

    // Default renderers for common types
    switch (column.key) {
      case 'status':
        return (
          <Badge className={getStatusColor(value)}>
            {value}
          </Badge>
        );
      case 'priority':
        return (
          <Badge className={getPriorityColor(value)}>
            {value}
          </Badge>
        );
      case 'dueDate':
      case 'eta':
      case 'startDate':
        return value ? new Date(value).toLocaleDateString() : '-';
      case 'amount':
        return value ? `$${value.toLocaleString()}` : '-';
      case 'url':
        return value ? (
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[200px]">{value}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                window.open(value, '_blank');
              }}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        ) : '-';
      case 'views':
      case 'likes':
      case 'comments':
        return value ? value.toLocaleString() : '-';
      default:
        return value || '-';
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  {column.sortable && sorting ? (
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-medium hover:bg-transparent"
                      onClick={() => sorting.onSort(column.key)}
                    >
                      {column.label}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                className={`
                  cursor-pointer hover:bg-surface/50 transition-colors
                  ${selectedIds.includes(item.id) ? 'bg-primary/10' : ''}
                `}
                onClick={() => onItemClick(item)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCellValue(column, item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {data.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No records found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min((pagination.page - 1) * pagination.pageSize + 1, pagination.total)} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} records
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm px-3">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(Math.ceil(pagination.total / pagination.pageSize))}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
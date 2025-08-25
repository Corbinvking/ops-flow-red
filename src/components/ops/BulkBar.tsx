import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Check, Clock, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkBarProps {
  selectedCount: number;
  onClear: () => void;
  onBulkAction: (action: string, value?: any) => void;
  actions?: BulkAction[];
  service: 'sc' | 'ig' | 'sp' | 'yt' | 'inv';
}

interface BulkAction {
  id: string;
  label: string;
  icon?: React.ElementType;
  type: 'button' | 'select';
  options?: Array<{ value: string; label: string }>;
}

const defaultActions: Record<string, BulkAction[]> = {
  sc: [
    { id: 'set_status', label: 'Set Status', icon: Check, type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'complete', label: 'Complete' }
    ]},
    { id: 'assign_owner', label: 'Assign Owner', icon: User, type: 'select', options: [
      { value: 'sarah', label: 'Sarah Chen' },
      { value: 'marcus', label: 'Marcus Johnson' },
      { value: 'emma', label: 'Emma Rodriguez' }
    ]},
    { id: 'set_start_today', label: 'Start Today', icon: Calendar, type: 'button' },
    { id: 'request_receipt', label: 'Request Receipt', icon: Clock, type: 'button' }
  ],
  ig: [
    { id: 'set_status', label: 'Set Status', icon: Check, type: 'select', options: [
      { value: 'backlog', label: 'Backlog' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'needs_qa', label: 'Needs QA' },
      { value: 'done', label: 'Done' }
    ]},
    { id: 'assign_owner', label: 'Assign Owner', icon: User, type: 'select', options: [
      { value: 'sarah', label: 'Sarah Chen' },
      { value: 'marcus', label: 'Marcus Johnson' },
      { value: 'emma', label: 'Emma Rodriguez' }
    ]},
    { id: 'trigger_final_report', label: 'Trigger Final Report', icon: Check, type: 'button' }
  ],
  sp: [
    { id: 'set_stage', label: 'Set Stage', icon: Check, type: 'select', options: [
      { value: 'sourcing', label: 'Sourcing' },
      { value: 'outreach', label: 'Outreach' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'published', label: 'Published' }
    ]},
    { id: 'assign_owner', label: 'Assign Owner', icon: User, type: 'select', options: [
      { value: 'sarah', label: 'Sarah Chen' },
      { value: 'marcus', label: 'Marcus Johnson' },
      { value: 'emma', label: 'Emma Rodriguez' }
    ]}
  ],
  yt: [
    { id: 'mark_fixed', label: 'Mark Fixed', icon: Check, type: 'button' },
    { id: 'set_action', label: 'Set Action', icon: Clock, type: 'select', options: [
      { value: 'improve_engagement', label: 'Improve Engagement' },
      { value: 'maintain', label: 'Maintain' },
      { value: 'needs_review', label: 'Needs Review' }
    ]}
  ],
  inv: [
    { id: 'set_status', label: 'Set Status', icon: Check, type: 'select', options: [
      { value: 'request', label: 'Request' },
      { value: 'sent', label: 'Sent' },
      { value: 'paid', label: 'Paid' }
    ]}
  ]
};

export const BulkBar: React.FC<BulkBarProps> = ({
  selectedCount,
  onClear,
  onBulkAction,
  actions,
  service
}) => {
  const { toast } = useToast();
  const availableActions = actions || defaultActions[service] || [];

  if (selectedCount === 0) return null;

  const handleAction = (actionId: string, value?: any) => {
    onBulkAction(actionId, value);
    toast({
      title: "Bulk Action Applied",
      description: `Action applied to ${selectedCount} record${selectedCount > 1 ? 's' : ''}`,
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass border border-border/50 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="chip chip-primary">
              {selectedCount} selected
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-2">
            {availableActions.map((action) => {
              if (action.type === 'button') {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(action.id)}
                    className="gap-2"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {action.label}
                  </Button>
                );
              }

              if (action.type === 'select' && action.options) {
                const Icon = action.icon;
                return (
                  <Select
                    key={action.id}
                    onValueChange={(value) => handleAction(action.id, value)}
                  >
                    <SelectTrigger className="w-auto gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <SelectValue placeholder={action.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {action.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
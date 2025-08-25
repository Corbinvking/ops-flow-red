import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Zap, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RecordDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: any;
  service: 'sc' | 'ig' | 'sp' | 'yt' | 'inv';
  onSave: (updates: Record<string, any>) => void;
}

interface FieldConfig {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'boolean';
  options?: Array<{ value: string; label: string }>;
  automation?: boolean; // Marks fields that trigger automations
}

const fieldConfigs: Record<string, FieldConfig[]> = {
  sc: [
    { id: 'trackInfo', label: 'Track Info', type: 'text' },
    { id: 'client', label: 'Client', type: 'text' },
    { id: 'service', label: 'Service', type: 'select', options: [
      { value: 'reposts', label: 'Reposts' },
      { value: 'likes', label: 'Likes' },
      { value: 'plays', label: 'Plays' }
    ]},
    { id: 'goal', label: 'Goal', type: 'number' },
    { id: 'remaining', label: 'Remaining', type: 'number' },
    { id: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'complete', label: 'Complete' }
    ]},
    { id: 'url', label: 'URL', type: 'text' },
    { id: 'startDate', label: 'Start Date', type: 'date' },
    { id: 'owner', label: 'Owner', type: 'select', options: [
      { value: 'sarah', label: 'Sarah Chen' },
      { value: 'marcus', label: 'Marcus Johnson' },
      { value: 'emma', label: 'Emma Rodriguez' }
    ]},
    { id: 'notes', label: 'Notes', type: 'textarea' }
  ],
  ig: [
    { id: 'caption', label: 'Caption', type: 'textarea' },
    { id: 'mediaUrl', label: 'Media URL', type: 'text' },
    { id: 'status', label: 'Status', type: 'select', options: [
      { value: 'backlog', label: 'Backlog' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'needs_qa', label: 'Needs QA' },
      { value: 'done', label: 'Done' }
    ]},
    { id: 'priority', label: 'Priority', type: 'select', options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ]},
    { id: 'owner', label: 'Owner', type: 'select', options: [
      { value: 'sarah', label: 'Sarah Chen' },
      { value: 'marcus', label: 'Marcus Johnson' },
      { value: 'emma', label: 'Emma Rodriguez' }
    ]},
    { id: 'dueDate', label: 'Due Date', type: 'date' },
    { id: 'sendFinalReport', label: 'Send Final Report', type: 'boolean', automation: true }
  ],
  sp: [
    { id: 'artistName', label: 'Artist Name', type: 'text' },
    { id: 'trackName', label: 'Track Name', type: 'text' },
    { id: 'contactEmail', label: 'Contact Email', type: 'text' },
    { id: 'status', label: 'Stage', type: 'select', options: [
      { value: 'sourcing', label: 'Sourcing' },
      { value: 'outreach', label: 'Outreach' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'published', label: 'Published' }
    ]},
    { id: 'owner', label: 'Owner', type: 'select', options: [
      { value: 'sarah', label: 'Sarah Chen' },
      { value: 'marcus', label: 'Marcus Johnson' },
      { value: 'emma', label: 'Emma Rodriguez' }
    ]},
    { id: 'eta', label: 'ETA', type: 'date' },
    { id: 'notes', label: 'Notes', type: 'textarea' }
  ],
  yt: [
    { id: 'url', label: 'URL', type: 'text' },
    { id: 'views', label: 'Views', type: 'number' },
    { id: 'likes', label: 'Likes', type: 'number' },
    { id: 'comments', label: 'Comments', type: 'number' },
    { id: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'fixed', label: 'Fixed' },
      { value: 'needs_review', label: 'Needs Review' }
    ]},
    { id: 'recommendedAction', label: 'Action', type: 'select', options: [
      { value: 'improve_engagement', label: 'Improve Engagement' },
      { value: 'maintain', label: 'Maintain' },
      { value: 'needs_review', label: 'Needs Review' }
    ]}
  ],
  inv: [
    { id: 'amount', label: 'Amount', type: 'number' },
    { id: 'clientName', label: 'Client', type: 'text' },
    { id: 'status', label: 'Status', type: 'select', options: [
      { value: 'request', label: 'Request' },
      { value: 'sent', label: 'Sent' },
      { value: 'paid', label: 'Paid' }
    ]},
    { id: 'dueDate', label: 'Due Date', type: 'date' },
    { id: 'description', label: 'Description', type: 'textarea' }
  ]
};

export const RecordDrawer: React.FC<RecordDrawerProps> = ({
  open,
  onOpenChange,
  record,
  service,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const fields = fieldConfigs[service] || [];

  React.useEffect(() => {
    if (record) {
      setFormData(record);
    }
  }, [record]);

  const handleSave = () => {
    onSave(formData);
    toast({
      title: "Record Updated",
      description: "Changes have been saved successfully",
    });
    onOpenChange(false);
  };

  const getRecordTitle = () => {
    if (service === 'sc') return formData.trackInfo || 'SoundCloud Campaign';
    if (service === 'ig') return formData.caption?.slice(0, 50) + '...' || 'Instagram Post';
    if (service === 'sp') return `${formData.artistName} - ${formData.trackName}` || 'Spotify Item';
    if (service === 'yt') return formData.url || 'YouTube Video';
    if (service === 'inv') return `Invoice - ${formData.clientName}` || 'Invoice';
    return 'Record';
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.id];

    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            rows={3}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
          />
        );
      case 'select':
        return (
          <Select
            value={value || ''}
            onValueChange={(newValue) => setFormData({ ...formData, [field.id]: newValue })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'boolean':
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={value || false}
              onCheckedChange={(checked) => setFormData({ ...formData, [field.id]: checked })}
            />
            <span className="text-sm">{value ? 'Enabled' : 'Disabled'}</span>
          </div>
        );
      default:
        return null;
    }
  };

  const automationFields = fields.filter(f => f.automation);
  const regularFields = fields.filter(f => !f.automation);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>{getRecordTitle()}</span>
            <Badge variant="outline" className="ml-auto">
              {service.toUpperCase()}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Edit record details and automation settings
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Regular Fields */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Details</h3>
            {regularFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Automation Fields */}
          {automationFields.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Automations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Toggle these to trigger Airtable automations
                </p>
                {automationFields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface/50">
                    <div>
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <p className="text-xs text-muted-foreground">
                        Triggers automation when enabled
                      </p>
                    </div>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Activity Log Placeholder */}
          <Separator />
          <div className="space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Activity
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span>Record created - {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                <span>Status updated - {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
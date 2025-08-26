import React, { useState, useEffect, useContext } from 'react';
import { User, Mail, Shield, ToggleLeft } from 'lucide-react';
import { AuthContext } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DBUser, UpdateUserData } from '@/types';

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: DBUser;
  onUpdateUser: (userId: string, userData: UpdateUserData) => Promise<any>;
}

const roleDescriptions = {
  admin: 'Full system access - can manage all users, settings, and data',
  operator: 'User management and operational tasks - can manage users and profiles',
  sales: 'Sales operations - can create and manage reports, limited user access',
  engineer: 'Technical operations - can create reports and access technical data',
  viewer: 'Read-only access - can view reports and data, no editing permissions'
};

const roleColors = {
  admin: 'bg-red-100 text-red-800',
  operator: 'bg-blue-100 text-blue-800',
  sales: 'bg-green-100 text-green-800',
  engineer: 'bg-purple-100 text-purple-800',
  viewer: 'bg-gray-100 text-gray-800'
};

export const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onOpenChange,
  user,
  onUpdateUser,
}) => {
  const { user: currentUser } = useContext(AuthContext);
  const isEditingSelf = currentUser?.id === user.id;
  
  const [formData, setFormData] = useState<UpdateUserData>({
    email: user.email,
    role: user.role,
    first_name: user.first_name || '',
    last_name: user.last_name || '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      email: user.email,
      role: user.role,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
    });
    setErrors({});
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    // Prevent current user from changing their own role
    if (isEditingSelf && formData.role !== 'admin') {
      newErrors.role = 'Cannot change your own role from admin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onUpdateUser(user.id, formData);
      handleClose();
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setLoading(false);
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof UpdateUserData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit User
          </DialogTitle>
          <DialogDescription>
            Update user information and permissions for {user.email}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="user@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Role *
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange('role', value)}
              disabled={isEditingSelf}
            >
              <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors.viewer}>Viewer</Badge>
                    <span>Read-only access</span>
                  </div>
                </SelectItem>
                <SelectItem value="engineer">
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors.engineer}>Engineer</Badge>
                    <span>Technical operations</span>
                  </div>
                </SelectItem>
                <SelectItem value="sales">
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors.sales}>Sales</Badge>
                    <span>Sales operations</span>
                  </div>
                </SelectItem>
                <SelectItem value="operator">
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors.operator}>Operator</Badge>
                    <span>User management</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors.admin}>Admin</Badge>
                    <span>Full system access</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role}</p>
            )}
            
            {formData.role && (
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">
                  {roleDescriptions[formData.role as keyof typeof roleDescriptions]}
                </p>
                {isEditingSelf && (
                  <p className="text-xs text-amber-600 mt-1">
                    ⚠️ Role cannot be changed when editing your own account
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Password Management
            </Label>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-2">
                To change this user's password, use the password change dialog in the user management panel.
              </p>
              <p className="text-xs text-amber-600">
                ⚠️ Passwords cannot be viewed, only changed
              </p>
            </div>
          </div>

          {/* User Info Display */}
          <div className="p-4 rounded-lg bg-muted space-y-2">
            <h4 className="font-medium text-sm">Account Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p>{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Login:</span>
                <p>
                  {user.last_login 
                    ? new Date(user.last_login).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

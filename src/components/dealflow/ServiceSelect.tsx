import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { servicePackages } from '@/lib/servicePackages';

interface ServiceSelectProps {
  service: string;
  isEnabled: boolean;
  onToggle: () => void;
  selectedPackage: string;
  onPackageSelect: (value: string) => void;
  description: string;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({
  service,
  isEnabled,
  onToggle,
  selectedPackage,
  onPackageSelect,
  description
}) => {
  const packages = servicePackages[service as keyof typeof servicePackages];
  const displayName = service.replace(/([A-Z])/g, ' $1').trim().toUpperCase();

  const formatPackageOption = (pkg: any) => {
    if ('streams' in pkg) return `${pkg.streams} Streams - $${pkg.price}`;
    if ('reach' in pkg && 'plays' in pkg) return `${pkg.reach} Reach • ~${pkg.plays} Plays - $${pkg.price}`;
    if ('reach' in pkg && 'posts' in pkg) return `${pkg.posts} Posts • ${pkg.reach} Reach - $${pkg.price}`;
    if ('views' in pkg) return `${pkg.views} Views - $${pkg.price}`;
    return `${pkg.name} - $${pkg.price}`;
  };

  return (
    <div className="bg-[#111111] p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">{displayName}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <Switch 
          checked={isEnabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-[#FF6B4B]"
        />
      </div>
      {isEnabled && (
        <Select value={selectedPackage} onValueChange={onPackageSelect}>
          <SelectTrigger className="bg-black border-none text-gray-400">
            <SelectValue placeholder="Select package" />
          </SelectTrigger>
          <SelectContent>
            {packages.map((pkg, index) => (
              <SelectItem key={index} value={pkg.name}>
                {formatPackageOption(pkg)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default ServiceSelect;

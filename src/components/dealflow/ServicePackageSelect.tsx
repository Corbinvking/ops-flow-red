import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { servicePackages } from "@/lib/servicePackages";

interface ServicePackageSelectProps {
  service: keyof typeof servicePackages;
  value: string;
  onValueChange: (value: string) => void;
}

const ServicePackageSelect: React.FC<ServicePackageSelectProps> = ({
  service,
  value,
  onValueChange
}) => {
  const packages = servicePackages[service];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-black border-none text-gray-400 h-10 mt-2">
        <SelectValue placeholder="Select package" />
      </SelectTrigger>
      <SelectContent>
        {packages.map((pkg, index) => (
          <SelectItem key={index} value={pkg.name}>
            <div className="flex flex-col">
              <span className="font-semibold">{pkg.name} - ${pkg.price}</span>
              <span className="text-xs text-gray-400">
                {pkg.views ? `${pkg.views} views, ${pkg.duration}` :
                 pkg.streams ? `${pkg.streams} streams, ${pkg.playlists} playlists` :
                 pkg.reposts ? `${pkg.reposts} reposts, ${pkg.reach} reach` :
                 pkg.posts ? `${pkg.posts} posts, ${pkg.reach} reach` :
                 `${pkg.views} views, ${pkg.duration}`}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ServicePackageSelect;

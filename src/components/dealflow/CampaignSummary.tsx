import React from 'react';
import { servicePackages } from '@/lib/servicePackages';

interface CampaignSummaryProps {
  selectedServices: {
    [key: string]: boolean;
  };
  selectedPackages: {
    [key: string]: string;
  };
  discounts: {
    [key: string]: number;
  };
  subtotal: number;
  totalDiscounts: number;
  total: number;
}

const CampaignSummary: React.FC<CampaignSummaryProps> = ({
  selectedServices,
  selectedPackages,
  discounts,
  subtotal,
  totalDiscounts,
  total
}) => {
  const getPackagePrice = (service: string, packageName: string) => {
    const packages = servicePackages[service as keyof typeof servicePackages];
    return packages.find(pkg => pkg.name === packageName)?.price || 0;
  };

  const getPackageDetails = (service: string, packageName: string) => {
    const packages = servicePackages[service as keyof typeof servicePackages];
    const pkg = packages.find(pkg => pkg.name === packageName);
    if (!pkg) return '';

    if ('streams' in pkg) return `${pkg.streams} streams package`;
    if ('reach' in pkg && 'plays' in pkg) return `${pkg.reach} reach package`;
    if ('reach' in pkg && 'posts' in pkg) return `${pkg.posts} posts package`;
    if ('views' in pkg) return `${pkg.views} views package`;
    return packageName;
  };

  return (
    <div className="bg-[#111111] rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-6 text-center">CAMPAIGN SUMMARY</h2>
      <div className="space-y-4">
        {Object.entries(selectedServices).map(([service, isSelected]) => {
          if (!isSelected || !selectedPackages[service]) return null;

          const originalPrice = getPackagePrice(service, selectedPackages[service]);
          const discount = discounts[service] || 0;
          const discountedPrice = originalPrice - (originalPrice * discount / 100);

          return (
            <div key={service} className="border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold uppercase">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                <div className="text-right">
                  <span className="text-gray-500 line-through mr-2">${originalPrice}</span>
                  <span className="font-bold">${discountedPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {getPackageDetails(service, selectedPackages[service])}
              </div>
              {discount > 0 && (
                <div className="text-sm text-[#22C55E] mt-1">
                  {discount}% discount applied
                </div>
              )}
            </div>
          );
        })}

        <div className="border-t border-gray-800 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>SUBTOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#22C55E]">
            <span>TOTAL DISCOUNTS</span>
            <span>-${totalDiscounts.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>CAMPAIGN TOTAL</span>
            <span className="text-[#FF6B4B]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSummary;
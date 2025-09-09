import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { servicePackages, commissionRates, multiServiceDiscounts } from "@/lib/servicePackages";
import ServiceSelect from "@/components/dealflow/ServiceSelect";
import CampaignSummary from "@/components/dealflow/CampaignSummary";
import EmailProposal from "@/components/dealflow/EmailProposal";

interface ClientDetails {
  artistName: string;
  projectName: string;
  genre: string;
  tier: string;
  releaseDate: Date | undefined;
}

interface Services {
  youtubeAdvertising: boolean;
  spotifyPlaylisting: boolean;
  soundcloudReposts: boolean;
  instagramSeeding: boolean;
  metaTiktokAds: boolean;
}

interface SelectedPackages {
  [key: string]: string;
}

const DealFlow = () => {
  const { toast } = useToast();
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    artistName: '',
    projectName: '',
    genre: '',
    tier: '',
    releaseDate: undefined
  });

  const [services, setServices] = useState<Services>({
    youtubeAdvertising: false,
    spotifyPlaylisting: false,
    soundcloudReposts: false,
    instagramSeeding: false,
    metaTiktokAds: false
  });

  const [selectedPackages, setSelectedPackages] = useState<SelectedPackages>({});
  const [serviceDiscounts, setServiceDiscounts] = useState<{[key: string]: number}>({});
  const [campaignTotals, setCampaignTotals] = useState({
    subtotal: 0,
    totalDiscounts: 0,
    total: 0
  });

  // Calculate totals and discounts when services or packages change
  useEffect(() => {
    const activeServices = Object.values(services).filter(Boolean).length;
    const multiServiceDiscount = multiServiceDiscounts[activeServices as keyof typeof multiServiceDiscounts] || 0;
    let subtotal = 0;
    const newServiceDiscounts: {[key: string]: number} = {};

    // Calculate base prices and individual service discounts
    Object.entries(services).forEach(([service, isActive]) => {
      if (isActive && selectedPackages[service]) {
        const packages = servicePackages[service as keyof typeof servicePackages];
        const selectedPackage = packages.find(pkg => pkg.name === selectedPackages[service]);
        if (selectedPackage) {
          subtotal += selectedPackage.price;
          newServiceDiscounts[service] = multiServiceDiscount;
        }
      }
    });

    // Calculate total discount amount
    const totalDiscountAmount = Object.entries(services).reduce((total, [service, isActive]) => {
      if (isActive && selectedPackages[service]) {
        const packages = servicePackages[service as keyof typeof servicePackages];
        const selectedPackage = packages.find(pkg => pkg.name === selectedPackages[service]);
        if (selectedPackage) {
          return total + (selectedPackage.price * (multiServiceDiscount / 100));
        }
      }
      return total;
    }, 0);

    setServiceDiscounts(newServiceDiscounts);
    setCampaignTotals({
      subtotal,
      totalDiscounts: totalDiscountAmount,
      total: subtotal - totalDiscountAmount
    });
  }, [services, selectedPackages]);

  const handleServiceToggle = (service: keyof Services) => {
    if (!clientDetails.tier) {
      toast({
        title: "Select Artist Tier",
        description: "Please select an artist tier before enabling services.",
        variant: "destructive"
      });
      return;
    }
    setServices(prev => ({ ...prev, [service]: !prev[service] }));
    if (!services[service]) {
      setSelectedPackages(prev => ({ ...prev, [service]: '' }));
    }
  };

  const handlePackageSelect = (service: string, packageName: string) => {
    setSelectedPackages(prev => ({ ...prev, [service]: packageName }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#FF6B4B] text-3xl font-bold">ARTIST INFLUENCE</h1>
        <Button className="bg-[#FF6B4B] hover:bg-[#FF6B4B]/90">
          SALES PORTAL
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-12">
          {/* Client Details Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#FF6B4B] rounded-full w-8 h-8 flex items-center justify-center">
                1
              </div>
              <h2 className="text-2xl font-bold">CLIENT DETAILS</h2>
            </div>

            <div className="space-y-4">
              <Input 
                placeholder="Artist or band name"
                className="bg-[#111111] border-none text-gray-400 h-12"
                value={clientDetails.artistName}
                onChange={(e) => setClientDetails(prev => ({ ...prev, artistName: e.target.value }))}
              />
              <Input 
                placeholder="Track or project name"
                className="bg-[#111111] border-none text-gray-400 h-12"
                value={clientDetails.projectName}
                onChange={(e) => setClientDetails(prev => ({ ...prev, projectName: e.target.value }))}
              />
              <Input 
                placeholder="Genre (e.g., EDM, Hip-Hop, Pop, etc.)"
                className="bg-[#111111] border-none text-gray-400 h-12"
                value={clientDetails.genre}
                onChange={(e) => setClientDetails(prev => ({ ...prev, genre: e.target.value }))}
              />
              <Select
                value={clientDetails.tier}
                onValueChange={(value) => setClientDetails(prev => ({ ...prev, tier: value }))}
              >
                <SelectTrigger className="bg-[#111111] border-none text-gray-400 h-12">
                  <SelectValue placeholder="Select artist tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tier1">Tier 1</SelectItem>
                  <SelectItem value="tier2">Tier 2</SelectItem>
                  <SelectItem value="tier3">Tier 3</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer">
                    <Input 
                      value={clientDetails.releaseDate ? format(clientDetails.releaseDate, 'PPP') : 'Select release date...'}
                      readOnly
                      className="bg-[#111111] border-none text-gray-400 h-12 pl-10"
                    />
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={clientDetails.releaseDate}
                    onSelect={(date) => setClientDetails(prev => ({ ...prev, releaseDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Build Your Campaign Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#FF6B4B] rounded-full w-8 h-8 flex items-center justify-center">
                2
              </div>
              <h2 className="text-2xl font-bold">BUILD YOUR CAMPAIGN</h2>
            </div>

            <div className="space-y-4">
              <ServiceSelect
                service="youtubeAdvertising"
                isEnabled={services.youtubeAdvertising}
                onToggle={() => handleServiceToggle('youtubeAdvertising')}
                selectedPackage={selectedPackages.youtubeAdvertising || ''}
                onPackageSelect={(value) => handlePackageSelect('youtubeAdvertising', value)}
                description="Promote your music video to targeted audiences"
              />

              <ServiceSelect
                service="spotifyPlaylisting"
                isEnabled={services.spotifyPlaylisting}
                onToggle={() => handleServiceToggle('spotifyPlaylisting')}
                selectedPackage={selectedPackages.spotifyPlaylisting || ''}
                onPackageSelect={(value) => handlePackageSelect('spotifyPlaylisting', value)}
                description="Get your track on curated Spotify playlists"
              />

              <ServiceSelect
                service="soundcloudReposts"
                isEnabled={services.soundcloudReposts}
                onToggle={() => handleServiceToggle('soundcloudReposts')}
                selectedPackage={selectedPackages.soundcloudReposts || ''}
                onPackageSelect={(value) => handlePackageSelect('soundcloudReposts', value)}
                description="Get your track reposted by influential channels"
              />

              <ServiceSelect
                service="instagramSeeding"
                isEnabled={services.instagramSeeding}
                onToggle={() => handleServiceToggle('instagramSeeding')}
                selectedPackage={selectedPackages.instagramSeeding || ''}
                onPackageSelect={(value) => handlePackageSelect('instagramSeeding', value)}
                description="Get your music featured by Instagram influencers"
              />

              <ServiceSelect
                service="metaTiktokAds"
                isEnabled={services.metaTiktokAds}
                onToggle={() => handleServiceToggle('metaTiktokAds')}
                selectedPackage={selectedPackages.metaTiktokAds || ''}
                onPackageSelect={(value) => handlePackageSelect('metaTiktokAds', value)}
                description="Run targeted ads on Meta platforms and TikTok"
              />
            </div>
          </div>

          {/* Campaign Summary */}
          <CampaignSummary
            selectedServices={services}
            selectedPackages={selectedPackages}
            discounts={serviceDiscounts}
            subtotal={campaignTotals.subtotal}
            totalDiscounts={campaignTotals.totalDiscounts}
            total={campaignTotals.total}
          />
        </div>

        {/* Commission Calculator */}
        <div className="bg-[#111111] rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">YOUR COMMISSION</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>YOUTUBE ADS</span>
              <span>${(services.youtubeAdvertising && selectedPackages.youtubeAdvertising ? 
                (servicePackages.youtubeAdvertising.find(pkg => pkg.name === selectedPackages.youtubeAdvertising)?.price || 0) * 
                (commissionRates.youtubeAdvertising / 100) : 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SPOTIFY PLAYLISTING</span>
              <span>${(services.spotifyPlaylisting && selectedPackages.spotifyPlaylisting ? 
                (servicePackages.spotifyPlaylisting.find(pkg => pkg.name === selectedPackages.spotifyPlaylisting)?.price || 0) * 
                (commissionRates.spotifyPlaylisting / 100) : 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SOUNDCLOUD REPOSTS</span>
              <span>${(services.soundcloudReposts && selectedPackages.soundcloudReposts ? 
                (servicePackages.soundcloudReposts.find(pkg => pkg.name === selectedPackages.soundcloudReposts)?.price || 0) * 
                (commissionRates.soundcloudReposts / 100) : 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>INSTAGRAM SEEDING</span>
              <span>${(services.instagramSeeding && selectedPackages.instagramSeeding ? 
                (servicePackages.instagramSeeding.find(pkg => pkg.name === selectedPackages.instagramSeeding)?.price || 0) * 
                (commissionRates.instagramSeeding / 100) : 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>META & TIKTOK ADS</span>
              <span>${(services.metaTiktokAds && selectedPackages.metaTiktokAds ? 
                (servicePackages.metaTiktokAds.find(pkg => pkg.name === selectedPackages.metaTiktokAds)?.price || 0) * 
                (commissionRates.metaTiktokAds / 100) : 0).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-800 pt-4 flex justify-between font-bold">
              <span>TOTAL</span>
              <span className="text-[#FF6B4B]">${Object.entries(services).reduce((total, [service, isActive]) => {
                if (isActive && selectedPackages[service]) {
                  const packages = servicePackages[service as keyof typeof servicePackages];
                  const selectedPackage = packages.find(pkg => pkg.name === selectedPackages[service]);
                  if (selectedPackage) {
                    return total + (selectedPackage.price * (commissionRates[service as keyof typeof commissionRates] / 100));
                  }
                }
                return total;
              }, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Proposal Footer */}
      <EmailProposal dealData={{
        clientDetails,
        services,
        selectedPackages,
        campaignTotals
      }} />
    </div>
  );
};

export default DealFlow;
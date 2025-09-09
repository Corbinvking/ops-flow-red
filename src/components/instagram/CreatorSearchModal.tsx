import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, UserPlus } from "lucide-react";
import { Creator } from "@/lib/types";
import { formatNumber, formatCurrency } from "@/lib/localStorage";
import { getAirtableCreators } from "@/lib/creatorMigration";
import { AddCreatorForm } from "./AddCreatorForm";
import { useAirtableData, AIRTABLE_TABLES } from '@/hooks/useAirtableData';

interface CreatorSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCreator: (creator: Creator) => void;
  selectedCreatorIds: string[];
}

export function CreatorSearchModal({ isOpen, onClose, onSelectCreator, selectedCreatorIds }: CreatorSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [activeTab, setActiveTab] = useState("search");

  // Use Airtable data
  const { data: airtableData, loading } = useAirtableData({ tableName: AIRTABLE_TABLES.CREATORS });

  useEffect(() => {
    if (isOpen) {
      const fetchCreators = async () => {
        // Transform Airtable data to Creator format
        const transformedCreators = airtableData.map(record => ({
          id: record.id,
          instagram_handle: record.fields['Instagram Handle'] || '',
          email: record.fields['Email'] || '',
          base_country: record.fields['Country'] || '',
          followers: record.fields['Followers'] || 0,
          median_views_per_video: record.fields['Median Views'] || 0,
          engagement_rate: record.fields['Engagement Rate'] || 0,
          reel_rate: record.fields['Reel Rate'] || 0,
          carousel_rate: record.fields['Carousel Rate'] || 0,
          story_rate: record.fields['Story Rate'] || 0,
          content_types: record.fields['Content Types'] || [],
          music_genres: record.fields['Music Genres'] || [],
          audience_countries: record.fields['Audience Territories'] || []
        }));

        setCreators(transformedCreators);
        setFilteredCreators(transformedCreators);
      };
      fetchCreators();
    }
  }, [isOpen, airtableData]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCreators(creators);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = creators.filter(creator => 
      creator.instagram_handle.toLowerCase().includes(lowercaseQuery) ||
      creator.base_country.toLowerCase().includes(lowercaseQuery) ||
      creator.music_genres.some(genre => genre.toLowerCase().includes(lowercaseQuery))
    );
    setFilteredCreators(filtered);
  }, [searchQuery, creators]);

  const handleSelectCreator = (creator: Creator) => {
    // Add campaign fit calculation for manual selection
    const creatorWithFit = {
      ...creator,
      campaignFitScore: 100, // Manual selection gets max fit score
      selected_rate: creator.reel_rate,
      selected_post_type: 'Reel',
      cpv: creator.median_views_per_video > 0 ? (creator.reel_rate / creator.median_views_per_video) * 1000 : 0
    };
    
    onSelectCreator(creatorWithFit);
    onClose();
  };

  const handleCreatorAdded = async () => {
    // Refresh will happen automatically through Airtable hook
    setActiveTab("search");
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="font-bebas text-2xl tracking-wide">Loading creators...</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-bebas text-2xl tracking-wide">ADD CREATORS TO CAMPAIGN</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Existing
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create New
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by handle, country, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Results */}
            <div className="overflow-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>HANDLE</TableHead>
                    <TableHead>FOLLOWERS</TableHead>
                    <TableHead>MEDIAN VIEWS</TableHead>
                    <TableHead>ENGAGEMENT</TableHead>
                    <TableHead>COUNTRY</TableHead>
                    <TableHead>REEL RATE</TableHead>
                    <TableHead>ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCreators.slice(0, 20).map((creator) => (
                    <TableRow key={creator.id}>
                      <TableCell className="font-medium">@{creator.instagram_handle}</TableCell>
                      <TableCell>{formatNumber(creator.followers)}</TableCell>
                      <TableCell>{formatNumber(creator.median_views_per_video)}</TableCell>
                      <TableCell>{creator.engagement_rate}%</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{creator.base_country}</Badge>
                      </TableCell>
                      <TableCell className="font-bold">{formatCurrency(creator.reel_rate)}</TableCell>
                      <TableCell>
                        <Button
                          variant={selectedCreatorIds.includes(creator.id) ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleSelectCreator(creator)}
                          disabled={selectedCreatorIds.includes(creator.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          {selectedCreatorIds.includes(creator.id) ? "ADDED" : "ADD"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredCreators.length === 0 && searchQuery && (
              <div className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">No creators found matching your search.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("create")}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Create New Creator Instead
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="overflow-auto max-h-96">
            <AddCreatorForm onSuccess={handleCreatorAdded} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
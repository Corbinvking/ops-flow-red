import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Music2, 
  Filter,
  Plus,
  BarChart3,
  Users,
  Globe,
  ArrowUpDown,
  MoreHorizontal
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Playlist {
  id: string;
  name: string;
  curator: string;
  followers: number;
  avgDailyStreams: number;
  genre: string;
  territory: string;
  status: 'active' | 'pending' | 'inactive';
}

const PlaylistsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [territoryFilter, setTerritoryFilter] = useState('');

  // Mock data
  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Electronic Vibes',
      curator: 'PlaylistPro',
      followers: 125000,
      avgDailyStreams: 15000,
      genre: 'Electronic',
      territory: 'Global',
      status: 'active'
    },
    {
      id: '2',
      name: 'Hip-Hop Heat',
      curator: 'BeatMaster',
      followers: 250000,
      avgDailyStreams: 28000,
      genre: 'Hip-Hop',
      territory: 'United States',
      status: 'active'
    },
    {
      id: '3',
      name: 'Indie Discoveries',
      curator: 'MusicHunter',
      followers: 75000,
      avgDailyStreams: 8000,
      genre: 'Indie',
      territory: 'United Kingdom',
      status: 'pending'
    }
  ];

  const genres = ["Electronic", "Hip-Hop", "Indie", "Pop", "Rock"];
  const territories = ["Global", "United States", "United Kingdom", "Europe"];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Playlist Database</h1>
          <p className="text-muted-foreground">Browse and manage your curated playlists</p>
        </div>
        <Button className="bg-[#1DB954] hover:bg-[#1DB954]/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Playlist
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search playlists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={territoryFilter} onValueChange={setTerritoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Territory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Territories</SelectItem>
                {territories.map(territory => (
                  <SelectItem key={territory} value={territory}>{territory}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Playlists Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PLAYLIST</TableHead>
                <TableHead>CURATOR</TableHead>
                <TableHead className="text-right">FOLLOWERS</TableHead>
                <TableHead className="text-right">AVG. DAILY STREAMS</TableHead>
                <TableHead>GENRE</TableHead>
                <TableHead>TERRITORY</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playlists.map(playlist => (
                <TableRow key={playlist.id}>
                  <TableCell className="font-medium">{playlist.name}</TableCell>
                  <TableCell>{playlist.curator}</TableCell>
                  <TableCell className="text-right">{formatNumber(playlist.followers)}</TableCell>
                  <TableCell className="text-right">{formatNumber(playlist.avgDailyStreams)}</TableCell>
                  <TableCell>{playlist.genre}</TableCell>
                  <TableCell>{playlist.territory}</TableCell>
                  <TableCell>
                    <Badge variant={
                      playlist.status === 'active' ? 'default' :
                      playlist.status === 'pending' ? 'secondary' : 'outline'
                    }>
                      {playlist.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Playlist</DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaylistsPage;

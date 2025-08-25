import React, { useState, useEffect } from 'react';
import { Upload, FileText, Play, Download, AlertTriangle, CheckCircle, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockAPI } from '@/data/mockData';
import { YTVideo } from '@/types';
import { useToast } from '@/hooks/use-toast';

const YouTube: React.FC = () => {
  const [videos, setVideos] = useState<YTVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [importUrls, setImportUrls] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videosResult = await mockAPI.getYTVideos();
        setVideos(videosResult);
      } catch (error) {
        toast({
          title: 'Error loading videos',
          description: 'Failed to load YouTube data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [toast]);

  const handleImport = () => {
    if (!importUrls.trim()) {
      toast({
        title: 'No URLs provided',
        description: 'Please enter YouTube URLs to import.',
        variant: 'destructive',
      });
      return;
    }

    // Mock import logic
    const urls = importUrls.split('\n').filter(url => url.trim());
    toast({
      title: 'Import initiated',
      description: `Processing ${urls.length} URLs...`,
    });
    setImportUrls('');
  };

  const handleRunAudit = () => {
    toast({
      title: 'Audit started',
      description: 'Running ratio analysis on all videos...',
    });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'maintain': return 'chip-success';
      case 'improve_engagement': return 'chip-warning';
      case 'boost_promotion': return 'chip-primary';
      case 'review_content': return 'chip-danger';
      default: return 'chip';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-danger';
  };

  const filteredVideos = videos.filter(video => 
    video.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-space-grotesk font-bold">YouTube Ratio Fixer</h1>
          <p className="text-foreground-muted mt-1">
            Analyze video performance and optimize engagement ratios.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRunAudit}>
            <Play className="h-4 w-4 mr-2" />
            Run Audit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Import Section */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="text-lg">Import Videos</CardTitle>
          <CardDescription>
            Upload CSV file or paste YouTube URLs for analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Upload CSV File
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-border-hover transition-colors">
                <Upload className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
                <p className="text-sm text-foreground-muted mb-2">
                  Drop CSV file here or click to browse
                </p>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Paste YouTube URLs
              </label>
              <Textarea
                placeholder="https://youtube.com/watch?v=...&#10;https://youtube.com/watch?v=..."
                value={importUrls}
                onChange={(e) => setImportUrls(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Button className="mt-3 w-full" onClick={handleImport}>
                Import URLs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className="card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Video Analysis Results</CardTitle>
              <CardDescription>
                Performance metrics and recommended actions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedIds.length} videos selected
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Fixed
                  </Button>
                  <Button size="sm" variant="outline">
                    Bulk Action
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedIds.length === filteredVideos.length && filteredVideos.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(filteredVideos.map(v => v.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Video</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedIds.includes(video.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(prev => [...prev, video.id]);
                        } else {
                          setSelectedIds(prev => prev.filter(id => id !== video.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium text-foreground truncate">
                        {video.url.split('v=')[1]?.substring(0, 11) || 'Video'}
                      </p>
                      <p className="text-sm text-foreground-muted truncate">
                        {video.notes}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-foreground">
                    {video.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-foreground">
                    {video.likes.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-foreground">
                    {video.comments.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getScoreColor(video.score)}`}>
                      {video.score}/10
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getActionColor(video.recommendedAction)}>
                      {video.recommendedAction.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {video.fixed ? (
                      <Badge className="chip-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Fixed
                      </Badge>
                    ) : (
                      <Badge className="chip-warning">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
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

export default YouTube;
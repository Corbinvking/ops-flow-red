import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  MessageSquare,
  Share2,
  Clock,
  Calendar,
  User,
  Image as ImageIcon,
  MoreHorizontal
} from 'lucide-react';

interface PostPreviewCardProps {
  post: {
    id: string | number;
    imageUrl?: string;
    caption: string;
    status: string;
    scheduledFor?: string;
    creator?: string;
    metrics?: {
      likes?: number;
      comments?: number;
      shares?: number;
    };
  };
  onAction?: (action: string, postId: string | number) => void;
}

const PostPreviewCard: React.FC<PostPreviewCardProps> = ({ post, onAction }) => {
  return (
    <Card className="overflow-hidden">
      {/* Post Image */}
      <div className="aspect-square relative bg-muted">
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt="Post preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge 
          className="absolute top-2 right-2"
          variant={
            post.status === 'scheduled' ? 'secondary' :
            post.status === 'published' ? 'default' :
            'outline'
          }
        >
          {post.status}
        </Badge>
      </div>

      {/* Post Details */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Post Preview</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => onAction?.('menu', post.id)}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="line-clamp-2">
          {post.caption}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Schedule Info */}
          {post.scheduledFor && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Scheduled for</span>
              </div>
              <span className="font-medium">{post.scheduledFor}</span>
            </div>
          )}

          {/* Creator Info */}
          {post.creator && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Creator</span>
              </div>
              <span className="font-medium">{post.creator}</span>
            </div>
          )}

          {/* Metrics */}
          {post.metrics && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{post.metrics.likes || 0}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs">{post.metrics.comments || 0}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Comments</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">{post.metrics.shares || 0}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Shares</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              className="flex-1" 
              size="sm"
              onClick={() => onAction?.('edit', post.id)}
            >
              Edit
            </Button>
            <Button 
              className="flex-1" 
              variant="outline" 
              size="sm"
              onClick={() => onAction?.('preview', post.id)}
            >
              Preview
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostPreviewCard;
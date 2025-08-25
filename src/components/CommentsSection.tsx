
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, ThumbsUp, Reply } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  avatar?: string;
}

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "John Farmer",
      content: "This platform has revolutionized how I manage my crops. The AI recommendations are spot on!",
      timestamp: "2 hours ago",
      likes: 12,
      avatar: undefined
    },
    {
      id: 2,
      author: "Sarah Green",
      content: "The weather integration and risk assessment features have helped me prevent crop losses multiple times.",
      timestamp: "1 day ago", 
      likes: 8,
      avatar: undefined
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim() && authorName.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: authorName,
        content: newComment,
        timestamp: 'just now',
        likes: 0,
        avatar: undefined
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setAuthorName('');
    }
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Community Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <Input
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="max-w-xs"
              />
              <Textarea
                placeholder="Share your experience with AgriIntel..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button 
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || !authorName.trim()}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Post Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>
                    {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm">{comment.author}</h4>
                      <Badge variant="secondary" className="text-xs">
                        Verified User
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(comment.id)}
                      className="gap-1 text-xs"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      <Reply className="h-3 w-3" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsSection;

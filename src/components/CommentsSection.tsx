
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send, Star, ThumbsUp } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  timestamp: Date;
  likes: number;
}

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 's.johnson@example.com',
      message: 'AgriIntel has completely transformed our farm operations. The AI insights are incredibly accurate and have helped us increase our yield by 30%!',
      rating: 5,
      timestamp: new Date('2024-01-15'),
      likes: 12
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      email: 'm.rodriguez@example.com',
      message: 'The real-time monitoring features are game-changing. We caught a potential pest issue early thanks to the alert system.',
      rating: 5,
      timestamp: new Date('2024-01-10'),
      likes: 8
    },
    {
      id: '3',
      name: 'Emma Chen',
      email: 'e.chen@example.com',
      message: 'Great platform overall. The user interface is intuitive and the data visualization is excellent. Would love to see more customization options.',
      rating: 4,
      timestamp: new Date('2024-01-08'),
      likes: 5
    }
  ]);

  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.email && newComment.message) {
      const comment: Comment = {
        id: Date.now().toString(),
        ...newComment,
        timestamp: new Date(),
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment({ name: '', email: '', message: '', rating: 5 });
    }
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of farmers who trust AgriIntel for their agricultural intelligence needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Comments Display */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-primary" />
            User Feedback
          </h3>
          
          {comments.map((comment) => (
            <Card key={comment.id} className="glass border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {comment.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{comment.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {comment.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(comment.rating)}
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-3 leading-relaxed">
                      {comment.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(comment.id)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {comment.likes}
                      </Button>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Verified User
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comment Form */}
        <div>
          <Card className="glass border-0 shadow-primary sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2 text-primary" />
                Share Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={newComment.email}
                      onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewComment({ ...newComment, rating: i + 1 })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            i < newComment.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Feedback</label>
                  <Textarea
                    value={newComment.message}
                    onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                    placeholder="Share your experience with AgriIntel..."
                    rows={4}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;

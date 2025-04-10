'use client';

import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  username: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  podcastId: string;
}

export default function CommentSection({ podcastId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [podcastId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/podcasts/${podcastId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim()) return;

    try {
      const res = await fetch(`/api/podcasts/${podcastId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          content: newComment,
        }),
      });

      if (res.ok) {
        setNewComment('');
        // Update the comment list
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{comment.username}</span>
                <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../../services/api.js';
import useAuth from '../../hooks/useAuth.js';
import { getImageUrl } from '../../utils/constants.js';

const Post = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [liking, setLiking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isLiked = post.likes?.some((like) => like._id === user?._id || like === user?._id);
  const isAuthor = post.author?._id === user?._id || post.author === user?._id;

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      const res = await postsAPI.like(post._id);
      if (onUpdate) {
        onUpdate(res.data);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    setDeleting(true);
    try {
      await postsAPI.delete(post._id);
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  const authorId = post.author?._id || post.author;
  const authorUsername = post.author?.username || 'Unknown';
  const authorDisplayName = post.author?.displayName || authorUsername;
  const authorProfilePicture = post.author?.profilePicture || '';

  return (
    <div className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex space-x-3">
        <Link to={`/profile/${authorId}`}>
          <img
            src={
              authorProfilePicture
                ? getImageUrl(authorProfilePicture)
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(authorDisplayName)}&background=random`
            }
            alt={authorDisplayName}
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Link
              to={`/profile/${authorId}`}
              className="font-semibold text-gray-900 hover:underline"
            >
              {authorDisplayName}
            </Link>
            <span className="text-gray-500 text-sm">@{authorUsername}</span>
            <span className="text-gray-500 text-sm">
              · {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-900 mt-1 whitespace-pre-wrap">{post.content}</p>
          {post.image && (
            <img
              src={getImageUrl(post.image)}
              alt="Post"
              className="mt-3 rounded-lg max-w-full h-auto"
            />
          )}
          <div className="flex items-center space-x-6 mt-3">
            <button
              onClick={handleLike}
              disabled={liking}
              className={`flex items-center space-x-1 text-gray-500 hover:text-red-500 ${
                isLiked ? 'text-red-500' : ''
              }`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{post.likes?.length || 0}</span>
            </button>
            {isAuthor && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;


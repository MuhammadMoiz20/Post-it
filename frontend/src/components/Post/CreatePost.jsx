import { useState } from 'react';
import { postsAPI } from '../../services/api.js';
import useAuth from '../../hooks/useAuth.js';
import { MAX_POST_LENGTH, getImageUrl } from '../../utils/constants.js';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim().length === 0) {
      setError('Post content cannot be empty');
      return;
    }
    if (content.length > MAX_POST_LENGTH) {
      setError(`Post cannot exceed ${MAX_POST_LENGTH} characters`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await postsAPI.create({ content }, image);
      setContent('');
      setImage(null);
      setImagePreview(null);
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const remainingChars = MAX_POST_LENGTH - content.length;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <img
            src={
              user?.profilePicture
                ? getImageUrl(user.profilePicture)
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=random`
            }
            alt={user?.displayName}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError('');
              }}
              placeholder="What's happening?"
              className="w-full border-none resize-none focus:outline-none focus:ring-0 text-lg"
              rows="3"
              maxLength={MAX_POST_LENGTH}
            />
            {imagePreview && (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-lg max-w-full h-auto max-h-64"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="text-blue-600 hover:text-blue-700">📷 Photo</span>
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                  {remainingChars}
                </span>
                <button
                  type="submit"
                  disabled={loading || content.trim().length === 0}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
            {error && (
              <div className="mt-2 text-red-500 text-sm">{error}</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;


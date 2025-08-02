import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usersAPI, followsAPI } from '../services/api.js';
import Post from '../components/Post/Post.jsx';
import useAuth from '../hooks/useAuth.js';
import { getImageUrl } from '../utils/constants.js';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [error, setError] = useState('');
  const isOwnProfile = currentUser?._id === userId;

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, [userId]);

  const loadProfile = async () => {
    try {
      const res = await usersAPI.getProfile(userId);
      setProfileUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const res = await usersAPI.getUserPosts(userId);
      setPosts(res.data.posts);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      const res = await followsAPI.follow(userId);
      setProfileUser(res.data.user);
    } catch (err) {
      console.error('Failed to follow user:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  const isFollowing = profileUser?.followers?.some(
    (follower) => follower._id === currentUser?._id || follower === currentUser?._id
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'User not found'}</p>
      </div>
    );
  }

  const profilePicture = profileUser.profilePicture
    ? getImageUrl(profileUser.profilePicture)
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(profileUser.displayName)}&background=random`;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border-b border-gray-200">
        {profileUser.coverPicture && (
          <img
            src={getImageUrl(profileUser.coverPicture)}
            alt="Cover"
            className="w-full h-48 object-cover"
          />
        )}
        <div className="px-4 py-4">
          <div className="flex items-start justify-between">
            <img
              src={profilePicture}
              alt={profileUser.displayName}
              className="w-24 h-24 rounded-full border-4 border-white -mt-12"
            />
            {!isOwnProfile && (
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className={`px-4 py-2 rounded-full font-semibold ${
                  isFollowing
                    ? 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50`}
              >
                {followLoading ? '...' : isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-900">{profileUser.displayName}</h2>
            <p className="text-gray-500">@{profileUser.username}</p>
            {profileUser.bio && (
              <p className="mt-2 text-gray-900">{profileUser.bio}</p>
            )}
            <div className="flex space-x-6 mt-4">
              <div>
                <span className="font-semibold">{profileUser.following?.length || 0}</span>
                <span className="text-gray-500 ml-1">Following</span>
              </div>
              <div>
                <span className="font-semibold">{profileUser.followers?.length || 0}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold">{posts.length}</span>
                <span className="text-gray-500 ml-1">Posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No posts yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <Post key={post._id} post={post} onDelete={loadPosts} />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;


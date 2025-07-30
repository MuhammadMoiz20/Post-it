import { useState, useEffect } from 'react';
import { postsAPI } from '../services/api.js';
import CreatePost from '../components/Post/CreatePost.jsx';
import Post from '../components/Post/Post.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (pageNum = 1) => {
    try {
      const res = await postsAPI.getTimeline(pageNum);
      if (pageNum === 1) {
        setPosts(res.data.posts);
      } else {
        setPosts((prev) => [...prev, ...res.data.posts]);
      }
      setHasMore(res.data.currentPage < res.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreated = () => {
    loadPosts(1);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPosts(nextPage);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onPostCreated={handlePostCreated} />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 m-4 rounded">
          {error}
        </div>
      )}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts yet. Start following users to see posts in your timeline!</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onUpdate={handlePostUpdate}
              onDelete={handlePostDelete}
            />
          ))}
          {hasMore && (
            <div className="text-center py-4">
              <button
                onClick={loadMore}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;


import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/constants.js';

const UserCard = ({ user }) => {
  const profilePicture = user.profilePicture
    ? getImageUrl(user.profilePicture)
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.username)}&background=random`;

  return (
    <Link
      to={`/profile/${user._id}`}
      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
    >
      <img
        src={profilePicture}
        alt={user.displayName || user.username}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">
          {user.displayName || user.username}
        </p>
        <p className="text-sm text-gray-500 truncate">@{user.username}</p>
        {user.bio && (
          <p className="text-sm text-gray-600 truncate mt-1">{user.bio}</p>
        )}
      </div>
    </Link>
  );
};

export default UserCard;


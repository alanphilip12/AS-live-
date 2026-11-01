import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, UserPlus, Sparkles, Check, ExternalLink } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const {
    topics,
    users,
    currentUser,
    toggleFollowTopic,
    toggleFollowUser,
    openUserProfile,
    setSelectedTopic,
    setViewMode,
  } = useApp();

  // Pick topics to recommend
  const recommendedTopics = topics.slice(0, 4);
  // Pick other users to recommend
  const recommendedUsers = users.filter(u => u.id !== currentUser.id).slice(0, 3);

  return (
    <aside className="hidden xl:block w-72 shrink-0 space-y-6">
      {/* Trending Topics Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-indigo-500" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Trending Topics
          </h3>
        </div>

        <div className="space-y-3">
          {recommendedTopics.map(topic => (
            <div key={topic.id} className="flex items-center justify-between gap-2">
              <div
                onClick={() => {
                  setSelectedTopic(topic);
                  setViewMode('topic');
                }}
                className="cursor-pointer group flex-1 min-w-0"
              >
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate transition-colors">
                  #{topic.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {(topic.followersCount / 1000).toFixed(0)}k followers · {topic.questionsCount} questions
                </div>
              </div>
              <button
                onClick={() => toggleFollowTopic(topic.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors shrink-0 ${
                  topic.isFollowing
                    ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300'
                }`}
              >
                {topic.isFollowing ? 'Following' : '+ Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Top Contributors to Follow */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Top Contributors
            </h3>
          </div>
        </div>

        <div className="space-y-3.5">
          {recommendedUsers.map(user => (
            <div key={user.id} className="flex items-start gap-2.5">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                onClick={() => openUserProfile(user.id)}
                className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity shrink-0 bg-slate-100"
              />
              <div className="flex-1 min-w-0">
                <div
                  onClick={() => openUserProfile(user.id)}
                  className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer truncate"
                >
                  {user.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {user.headline}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    onClick={() => toggleFollowUser(user.id)}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 ${
                      user.isFollowing
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {user.isFollowing ? (
                      <>
                        <Check className="w-2.5 h-2.5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-2.5 h-2.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                  <span className="text-[10px] text-slate-400">
                    {(user.upvotesCount / 1000).toFixed(0)}k upvotes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-2 text-[11px] text-slate-400 dark:text-slate-500 space-y-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#about" onClick={(e) => { e.preventDefault(); setViewMode('discover'); }} className="hover:underline">About</a>
          <a href="#careers" onClick={(e) => { e.preventDefault(); }} className="hover:underline">Careers</a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); }} className="hover:underline">Terms</a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); }} className="hover:underline">Privacy</a>
          <a href="#guidelines" onClick={(e) => { e.preventDefault(); }} className="hover:underline">Guidelines</a>
        </div>
        <p>© 2026 AQ Live Inc. Thoughtful Community Q&A.</p>
      </div>
    </aside>
  );
};

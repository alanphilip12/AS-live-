import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from './QuestionCard';
import {
  UserPlus,
  Check,
  Edit2,
  Calendar,
  Sparkles,
  Award,
  Layers,
  ArrowLeft,
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const {
    selectedProfileUserId,
    users,
    currentUser,
    questions,
    toggleFollowUser,
    updateCurrentUserProfile,
    setViewMode,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'answers' | 'questions' | 'topics' | 'bookmarks'>('answers');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const profileUser =
    users.find(u => u.id === selectedProfileUserId) || currentUser;

  const isSelf = profileUser.id === currentUser.id;

  // Edit form state
  const [nameDraft, setNameDraft] = useState(profileUser.name);
  const [headlineDraft, setHeadlineDraft] = useState(profileUser.headline);
  const [bioDraft, setBioDraft] = useState(profileUser.bio);

  // User questions
  const userQuestions = questions.filter(q => q.author.id === profileUser.id);

  // User answers
  const userAnswersQuestions = questions.filter(q =>
    q.answers.some(a => a.author.id === profileUser.id)
  );

  // Bookmarks (if self)
  const bookmarkedQuestions = questions.filter(
    q => q.isBookmarked || q.answers.some(a => a.isBookmarked)
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile(nameDraft, headlineDraft, bioDraft);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewMode('home')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Feed</span>
        </button>
      </div>

      {/* Profile Header Banner & Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Decorative Modern Header Banner */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Profile Main Info */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
            <div className="flex items-end gap-4">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md bg-white dark:bg-slate-800 shrink-0"
              />
              <div className="pb-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
                  {profileUser.name}
                </h1>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {profileUser.handle}
                </p>
              </div>
            </div>

            {/* Profile CTA */}
            <div className="flex items-center gap-2 sm:self-end">
              {isSelf ? (
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}</span>
                </button>
              ) : (
                <button
                  onClick={() => toggleFollowUser(profileUser.id)}
                  className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl transition-all shadow-xs ${
                    profileUser.isFollowing
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {profileUser.isFollowing ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditingProfile && isSelf ? (
            <form
              onSubmit={handleSaveProfile}
              className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={nameDraft}
                  onChange={e => setNameDraft(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Headline / Professional Credential
                </label>
                <input
                  type="text"
                  value={headlineDraft}
                  onChange={e => setHeadlineDraft(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bio / Philosophy
                </label>
                <textarea
                  rows={3}
                  value={bioDraft}
                  onChange={e => setBioDraft(e.target.value)}
                  className="w-full p-3 text-sm rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {profileUser.headline}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {profileUser.bio}
              </p>
            </div>
          )}

          {/* Stats Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <strong className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {profileUser.followersCount.toLocaleString()}
              </strong>{' '}
              <span>Followers</span>
            </div>
            <div>
              <strong className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {profileUser.followingCount.toLocaleString()}
              </strong>{' '}
              <span>Following</span>
            </div>
            <div>
              <strong className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {userAnswersQuestions.length}
              </strong>{' '}
              <span>Answers</span>
            </div>
            <div>
              <strong className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {userQuestions.length}
              </strong>{' '}
              <span>Questions Asked</span>
            </div>
            <div>
              <strong className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {profileUser.upvotesCount.toLocaleString()}
              </strong>{' '}
              <span>Upvotes Received</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 ml-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>{profileUser.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('answers')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'answers'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Answers ({userAnswersQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'questions'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Questions ({userQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'topics'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Topics of Interest ({profileUser.interests.length})
          </button>
          {isSelf && (
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'bookmarks'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Saved Bookmarks ({bookmarkedQuestions.length})
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'answers' && (
          <>
            {userAnswersQuestions.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
                No answers posted by this user yet.
              </div>
            ) : (
              userAnswersQuestions.map(q => <QuestionCard key={q.id} question={q} />)
            )}
          </>
        )}

        {activeTab === 'questions' && (
          <>
            {userQuestions.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
                No questions asked yet.
              </div>
            ) : (
              userQuestions.map(q => <QuestionCard key={q.id} question={q} />)
            )}
          </>
        )}

        {activeTab === 'topics' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Areas of Curiosity & Expertise</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {profileUser.interests.map(interest => (
                <span
                  key={interest}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                >
                  #{interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && isSelf && (
          <>
            {bookmarkedQuestions.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
                No bookmarked questions yet. Click the bookmark icon on any question or answer to save it here.
              </div>
            ) : (
              bookmarkedQuestions.map(q => <QuestionCard key={q.id} question={q} />)
            )}
          </>
        )}
      </div>
    </div>
  );
};

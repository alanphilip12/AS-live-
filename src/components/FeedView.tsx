import React from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from './QuestionCard';
import {
  HelpCircle,
  Users,
  Flame,
  Bookmark,
  MessageSquare,
  Sparkles,
  Layers,
  Check,
  Plus,
  PenSquare,
} from 'lucide-react';

export const FeedView: React.FC = () => {
  const {
    questions,
    currentUser,
    viewMode,
    selectedTopic,
    toggleFollowTopic,
    setIsAskModalOpen,
    setViewMode,
  } = useApp();

  // Filter feed based on viewMode
  let displayedQuestions = questions;
  let feedTitle = 'Community Feed';
  let feedSubtitle = 'Questions, answers, and shared expertise across the network';

  if (viewMode === 'following') {
    feedTitle = 'Questions You Follow';
    feedSubtitle = 'Discussions and answers from practitioners and topics in your network';
    displayedQuestions = questions.filter(
      q => q.isFollowing || q.author.isFollowing
    );
  } else if (viewMode === 'popular') {
    feedTitle = 'Popular Questions';
    feedSubtitle = 'High-engagement discussions ranked by community interest and upvotes';
    displayedQuestions = [...questions].sort(
      (a, b) =>
        b.views +
        b.answers.reduce((acc, ans) => acc + ans.upvotes, 0) -
        (a.views + a.answers.reduce((acc, ans) => acc + ans.upvotes, 0))
    );
  } else if (viewMode === 'my-questions') {
    feedTitle = 'My Questions';
    feedSubtitle = 'Questions initiated by you across the community';
    displayedQuestions = questions.filter(q => q.author.id === currentUser.id);
  } else if (viewMode === 'my-answers') {
    feedTitle = 'My Answers';
    feedSubtitle = 'Answers and contributions written from your account';
    displayedQuestions = questions.filter(q =>
      q.answers.some(a => a.author.id === currentUser.id)
    );
  } else if (viewMode === 'bookmarks') {
    feedTitle = 'Bookmarks';
    feedSubtitle = 'Your library of saved questions and notable answers';
    displayedQuestions = questions.filter(
      q => q.isBookmarked || q.answers.some(a => a.isBookmarked)
    );
  } else if (viewMode === 'topic' && selectedTopic) {
    feedTitle = `#${selectedTopic.name}`;
    feedSubtitle = selectedTopic.description;
    displayedQuestions = questions.filter(q =>
      q.topics.some(
        t => t.toLowerCase() === selectedTopic.name.toLowerCase()
      )
    );
  }

  return (
    <div className="space-y-4">
      {/* Topic Header Banner if in topic view */}
      {viewMode === 'topic' && selectedTopic && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Layers className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                #{selectedTopic.name}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              {selectedTopic.description}
            </p>
            <div className="text-xs text-slate-400 pt-1 flex items-center gap-3">
              <span>
                <strong className="text-slate-700 dark:text-slate-300">
                  {selectedTopic.questionsCount}
                </strong>{' '}
                questions
              </span>
              <span>·</span>
              <span>
                <strong className="text-slate-700 dark:text-slate-300">
                  {(selectedTopic.followersCount / 1000).toFixed(0)}k
                </strong>{' '}
                followers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFollowTopic(selectedTopic.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                selectedTopic.isFollowing
                  ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {selectedTopic.isFollowing ? 'Following' : '+ Follow Topic'}
            </button>
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Ask in Topic
            </button>
          </div>
        </div>
      )}

      {/* Quick "Ask Question or Share Answer" bar on Home Feed (Quora signature feature) */}
      {viewMode === 'home' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="flex-1 text-left px-4 py-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer"
            >
              What do you want to ask or share, {currentUser.name.split(' ')[0]}?
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-around text-xs text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>Ask Question</span>
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800" />
            <button
              onClick={() => {
                const firstQ = questions[0];
                if (firstQ) {
                  const el = document.getElementById(firstQ.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              <PenSquare className="w-4 h-4 text-emerald-500" />
              <span>Answer Questions</span>
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800" />
            <button
              onClick={() => setViewMode('discover')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Explore Spaces</span>
            </button>
          </div>
        </div>
      )}

      {/* Section Header for other views */}
      {viewMode !== 'home' && viewMode !== 'topic' && (
        <div className="py-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {feedTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {feedSubtitle}
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {displayedQuestions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No questions found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {viewMode === 'bookmarks'
                ? 'You haven’t bookmarked any questions or answers yet.'
                : viewMode === 'my-questions'
                ? 'You haven’t posted any questions yet. Click "Ask a Question" to start!'
                : viewMode === 'my-answers'
                ? 'You haven’t posted any answers yet. Explore questions and share your expertise!'
                : viewMode === 'following'
                ? 'Follow more practitioners or topics to see their updates in your feed.'
                : 'No questions currently in this view.'}
            </p>
            <div className="mt-4">
              <button
                onClick={() => setIsAskModalOpen(true)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Ask a Question Now
              </button>
            </div>
          </div>
        ) : (
          displayedQuestions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>
    </div>
  );
};

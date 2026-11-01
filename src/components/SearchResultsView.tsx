import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from './QuestionCard';
import { Search, MessageSquare, Layers, User as UserIcon, HelpCircle, Check, UserPlus } from 'lucide-react';
import { Topic, User } from '../types';

export const SearchResultsView: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    questions,
    topics,
    users,
    openUserProfile,
    toggleFollowUser,
    toggleFollowTopic,
    setSelectedTopic,
    setViewMode,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'questions' | 'answers' | 'topics' | 'users'>('all');

  const query = searchQuery.trim().toLowerCase();

  // Matched questions
  const matchedQuestions = questions.filter(
    q =>
      q.title.toLowerCase().includes(query) ||
      (q.description && q.description.toLowerCase().includes(query)) ||
      q.topics.some(t => t.toLowerCase().includes(query))
  );

  // Matched answers
  const matchedAnswersQuestions = questions.filter(q =>
    q.answers.some(a => a.content.toLowerCase().includes(query))
  );

  // Matched topics
  const matchedTopics = topics.filter(
    t =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
  );

  // Matched users
  const matchedUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(query) ||
      u.headline.toLowerCase().includes(query) ||
      u.bio.toLowerCase().includes(query)
  );

  const totalResults =
    matchedQuestions.length +
    matchedAnswersQuestions.length +
    matchedTopics.length +
    matchedUsers.length;

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <div className="flex-1">
            <h1 className="text-base font-bold text-slate-900 dark:text-white">
              Search Results for &ldquo;{searchQuery}&rdquo;
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Found {totalResults} total matches across AQ Live
            </p>
          </div>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setFilterType('questions')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'questions'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Questions ({matchedQuestions.length})
          </button>
          <button
            onClick={() => setFilterType('answers')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'answers'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Answers ({matchedAnswersQuestions.length})
          </button>
          <button
            onClick={() => setFilterType('topics')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'topics'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Topics ({matchedTopics.length})
          </button>
          <button
            onClick={() => setFilterType('users')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'users'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            People ({matchedUsers.length})
          </button>
        </div>
      </div>

      {/* Topics Matches Row if 'all' or 'topics' */}
      {(filterType === 'all' || filterType === 'topics') && matchedTopics.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-indigo-500" />
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Matching Topics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matchedTopics.map(t => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <div
                    onClick={() => {
                      setSelectedTopic(t);
                      setViewMode('topic');
                    }}
                    className="font-bold text-xs text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                  >
                    #{t.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.questionsCount} questions · {(t.followersCount / 1000).toFixed(0)}k followers
                  </div>
                </div>
                <button
                  onClick={() => toggleFollowTopic(t.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                    t.isFollowing
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {t.isFollowing ? 'Following' : '+ Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Matches Row if 'all' or 'users' */}
      {(filterType === 'all' || filterType === 'users') && matchedUsers.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <UserIcon className="w-4 h-4 text-indigo-500" />
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Matching People
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matchedUsers.map(u => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
              >
                <div
                  onClick={() => openUserProfile(u.id)}
                  className="flex items-center gap-2.5 cursor-pointer min-w-0"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {u.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{u.headline}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollowUser(u.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg shrink-0 ${
                    u.isFollowing
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {u.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions Matches */}
      {(filterType === 'all' || filterType === 'questions') && (
        <div className="space-y-4">
          {matchedQuestions.length === 0 && filterType === 'questions' ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
              No questions matched your search query.
            </div>
          ) : (
            matchedQuestions.map(q => <QuestionCard key={q.id} question={q} />)
          )}
        </div>
      )}

      {/* Answers Matches */}
      {filterType === 'answers' && (
        <div className="space-y-4">
          {matchedAnswersQuestions.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
              No answer content matched your query.
            </div>
          ) : (
            matchedAnswersQuestions.map(q => <QuestionCard key={q.id} question={q} />)
          )}
        </div>
      )}

      {/* Empty State when zero results */}
      {totalResults === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No results found for &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try checking for spelling errors, using simpler keywords, or post a new question to start the discussion!
          </p>
        </div>
      )}
    </div>
  );
};

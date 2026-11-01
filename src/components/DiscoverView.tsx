import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from './QuestionCard';
import {
  Compass,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Users,
  Flame,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Topic } from '../types';

export const DiscoverView: React.FC = () => {
  const {
    topics,
    questions,
    toggleFollowTopic,
    setSelectedTopic,
    setViewMode,
    setIsAskModalOpen,
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<'all' | 'trending' | 'unanswered'>('trending');

  // Sorted by views & upvotes
  const trendingQuestions = [...questions].sort(
    (a, b) =>
      b.views +
      b.answers.reduce((acc, ans) => acc + ans.upvotes, 0) -
      (a.views + a.answers.reduce((acc, ans) => acc + ans.upvotes, 0))
  );

  const unansweredQuestions = questions.filter(q => q.answers.length === 0);

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setViewMode('topic');
  };

  return (
    <div className="space-y-6">
      {/* Discover Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-indigo-800/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover Knowledge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Explore Emerging Ideas & Disciplines
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Follow niche topics, discover high-signal answers from verified practitioners, and explore the edge of curiosity.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-sm"
            >
              Ask the Community
            </button>
          </div>
        </div>
      </div>

      {/* Featured Topics Carousel / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Curated Topics to Follow</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topics.map(topic => (
            <div
              key={topic.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:border-indigo-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => handleSelectTopic(topic)}
                  className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                >
                  #{topic.name}
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 tabular-nums">
                  {(topic.followersCount / 1000).toFixed(0)}k followers
                </span>
                <button
                  onClick={() => toggleFollowTopic(topic.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    topic.isFollowing
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}
                >
                  {topic.isFollowing ? 'Following' : '+ Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs for Content Stream */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setFilterCategory('trending')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            filterCategory === 'trending'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Trending Discussions ({trendingQuestions.length})</span>
        </button>

        <button
          onClick={() => setFilterCategory('unanswered')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            filterCategory === 'unanswered'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Needs an Answer ({unansweredQuestions.length})</span>
        </button>

        <button
          onClick={() => setFilterCategory('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            filterCategory === 'all'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>All Questions ({questions.length})</span>
        </button>
      </div>

      {/* Questions Stream */}
      <div className="space-y-4">
        {filterCategory === 'trending' &&
          trendingQuestions.map(q => <QuestionCard key={q.id} question={q} />)}

        {filterCategory === 'unanswered' && (
          <>
            {unansweredQuestions.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
                All questions currently have answers! Great job community.
              </div>
            ) : (
              unansweredQuestions.map(q => <QuestionCard key={q.id} question={q} />)
            )}
          </>
        )}

        {filterCategory === 'all' &&
          questions.map(q => <QuestionCard key={q.id} question={q} />)}
      </div>
    </div>
  );
};

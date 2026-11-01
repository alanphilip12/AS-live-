import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Users,
  Compass,
  Flame,
  HelpCircle,
  MessageSquare,
  Bookmark,
  Layers,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { Topic } from '../types';

export const Sidebar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    topics,
    selectedTopic,
    setSelectedTopic,
    setIsAskModalOpen,
  } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'popular', label: 'Popular Questions', icon: Flame },
    { id: 'my-questions', label: 'My Questions', icon: HelpCircle },
    { id: 'my-answers', label: 'My Answers', icon: MessageSquare },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  ] as const;

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setViewMode('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Primary Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-2 shadow-xs">
        <nav className="space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = viewMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedTopic(null);
                  setViewMode(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Topics and Categories Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-sans">
              Topics & Spaces
            </h3>
          </div>
          <button
            onClick={() => setViewMode('discover')}
            className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Explore
          </button>
        </div>

        <div className="space-y-1">
          {topics.map(topic => {
            const isTopicActive = viewMode === 'topic' && selectedTopic?.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isTopicActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-500" />
                  <span className="truncate text-left">{topic.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                  {topic.questionsCount > 1000
                    ? `${(topic.questionsCount / 1000).toFixed(1)}k`
                    : topic.questionsCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Question Trigger */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setIsAskModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ask in a Topic</span>
          </button>
        </div>
      </div>

      {/* Community Info Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-sky-50/50 dark:from-indigo-950/20 dark:to-sky-950/20 border border-indigo-100/60 dark:border-indigo-900/40 text-xs text-slate-600 dark:text-slate-400">
        <p className="font-semibold text-slate-900 dark:text-slate-200 mb-1">
          AS Live Community Creed
        </p>
        <p className="leading-relaxed text-[11px]">
          Knowledge grows when shared with clarity, respect, and empirical curiosity. Be specific, cite reasoning, and elevate human understanding.
        </p>
      </div>
    </aside>
  );
};

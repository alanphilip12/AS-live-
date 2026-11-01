import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  PlusCircle,
  Home,
  Compass,
  Moon,
  Sun,
  User as UserIcon,
  Check,
  X,
  MessageSquare,
  ThumbsUp,
  UserPlus,
  Bookmark,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    users,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    setIsAskModalOpen,
    openUserProfile,
    theme,
    toggleTheme,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    switchUserPersona,
    questions,
    topics,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered live search suggestions
  const trimmedSearch = searchQuery.trim().toLowerCase();
  const matchedQuestions = trimmedSearch
    ? questions.filter(
        q =>
          q.title.toLowerCase().includes(trimmedSearch) ||
          q.topics.some(t => t.toLowerCase().includes(trimmedSearch))
      ).slice(0, 4)
    : [];
  const matchedTopics = trimmedSearch
    ? topics.filter(t => t.name.toLowerCase().includes(trimmedSearch)).slice(0, 3)
    : [];
  const matchedUsers = trimmedSearch
    ? users.filter(
        u =>
          u.name.toLowerCase().includes(trimmedSearch) ||
          u.headline.toLowerCase().includes(trimmedSearch)
      ).slice(0, 3)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setViewMode('search');
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3 sm:gap-6">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => {
              setViewMode('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg py-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg tracking-tight font-sans">AS</span>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-sans leading-none">
                AS Live
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Collective Intelligence
              </span>
            </div>
          </button>

          {/* Quick Nav (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => {
                setViewMode('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                viewMode === 'home'
                  ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setViewMode('discover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                viewMode === 'discover'
                  ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </button>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-lg mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search questions, topics, or people..."
                className="w-full pl-10 pr-9 py-2 text-sm rounded-full bg-slate-100/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 border border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Live Search Suggestions Dropdown */}
          {isSearchFocused && trimmedSearch && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 divide-y divide-slate-100 dark:divide-slate-800">
              {matchedQuestions.length === 0 &&
              matchedTopics.length === 0 &&
              matchedUsers.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  No direct matches for &ldquo;{searchQuery}&rdquo;. Press Enter to search all content.
                </div>
              ) : (
                <>
                  {matchedQuestions.length > 0 && (
                    <div className="p-2">
                      <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Questions
                      </div>
                      {matchedQuestions.map(q => (
                        <button
                          key={q.id}
                          onClick={() => {
                            setViewMode('home');
                            setIsSearchFocused(false);
                            // Scroll to target question card
                            setTimeout(() => {
                              const el = document.getElementById(q.id);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200 flex items-start gap-2.5 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-medium">{q.title}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchedTopics.length > 0 && (
                    <div className="p-2">
                      <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Topics
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-3 py-1">
                        {matchedTopics.map(t => (
                          <button
                            key={t.id}
                            onClick={() => {
                              setViewMode('search');
                              setIsSearchFocused(false);
                            }}
                            className="px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors"
                          >
                            #{t.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedUsers.length > 0 && (
                    <div className="p-2">
                      <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        People
                      </div>
                      {matchedUsers.map(u => (
                        <button
                          key={u.id}
                          onClick={() => {
                            openUserProfile(u.id);
                            setIsSearchFocused(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 transition-colors"
                        >
                          <img
                            src={u.avatar}
                            alt={u.name}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover bg-slate-200 dark:bg-slate-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold block truncate">{u.name}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                              {u.headline}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 text-center">
                    <button
                      onClick={() => handleSearchSubmit()}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View all search results for &ldquo;{searchQuery}&rdquo; →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions, Notifications, Profile, Ask CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Ask a Question Primary CTA */}
          <button
            onClick={() => setIsAskModalOpen(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-600/20 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Ask a Question</span>
            <span className="sm:hidden">Ask</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotifOpen(prev => !prev)}
              aria-label="Notifications"
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Notifications
                    </span>
                    {unreadNotificationsCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.questionId) {
                            setViewMode('home');
                            setIsNotifOpen(false);
                            setTimeout(() => {
                              const el = document.getElementById(n.questionId!);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          }
                        }}
                        className={`flex items-start gap-3 p-3.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                          n.isRead
                            ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300'
                            : 'bg-indigo-50/50 hover:bg-indigo-50/80 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        <div className="relative shrink-0">
                          <img
                            src={n.actor.avatar}
                            alt={n.actor.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full object-cover bg-slate-200 dark:bg-slate-800"
                          />
                          <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400">
                            {n.type === 'upvote' && <ThumbsUp className="w-2.5 h-2.5" />}
                            {n.type === 'answer' && <MessageSquare className="w-2.5 h-2.5" />}
                            {n.type === 'comment' && <MessageSquare className="w-2.5 h-2.5" />}
                            {n.type === 'follow' && <UserPlus className="w-2.5 h-2.5" />}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="leading-snug">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {n.actor.name}
                            </span>{' '}
                            {n.type === 'upvote' && 'upvoted your answer to'}
                            {n.type === 'answer' && 'answered your question'}
                            {n.type === 'comment' && 'commented on an answer in'}
                            {n.type === 'follow' && 'started following your activity'}
                            {n.questionTitle && (
                              <span className="font-medium text-slate-700 dark:text-slate-300 italic block mt-0.5 line-clamp-1">
                                &ldquo;{n.questionTitle}&rdquo;
                              </span>
                            )}
                          </p>
                          <span className="text-[11px] text-slate-400 mt-1 block">
                            {n.createdAt}
                          </span>
                        </div>
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu & Persona Switcher */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(prev => !prev)}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-600/30 dark:ring-indigo-400/30"
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 p-2">
                {/* Current User Card */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {currentUser.handle}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-2">
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {currentUser.followersCount}
                      </strong>{' '}
                      followers
                    </span>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {currentUser.answersCount}
                      </strong>{' '}
                      answers
                    </span>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {currentUser.upvotesCount}
                      </strong>{' '}
                      upvotes
                    </span>
                  </div>
                </div>

                {/* Direct Links */}
                <button
                  onClick={() => {
                    openUserProfile(currentUser.id);
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-indigo-500" />
                  <span>View Full Profile</span>
                </button>

                <button
                  onClick={() => {
                    setViewMode('bookmarks');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  <span>My Bookmarks</span>
                </button>

                {/* Quick Persona Switcher for Testing Community Flow */}
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Switch Community Persona</span>
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                  </div>
                  <div className="space-y-1 mt-1">
                    {users.slice(0, 4).map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUserPersona(u.id);
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors ${
                          u.id === currentUser.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                          />
                          <span className="truncate">{u.name}</span>
                        </div>
                        {u.id === currentUser.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

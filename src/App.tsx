import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { FeedView } from './components/FeedView';
import { DiscoverView } from './components/DiscoverView';
import { UserProfileView } from './components/UserProfileView';
import { SearchResultsView } from './components/SearchResultsView';
import { AskQuestionModal } from './components/AskQuestionModal';
import {
  Home,
  Compass,
  PlusCircle,
  Bookmark,
  User as UserIcon,
  CheckCircle,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { viewMode, setViewMode, setIsAskModalOpen, openUserProfile, currentUser, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Layout Container (Desktop 1440px friendly max-w-7xl) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <Sidebar />
          </div>

          {/* Center Main Content Feed */}
          <section className="flex-1 min-w-0 w-full space-y-4">
            {viewMode === 'discover' && <DiscoverView />}
            {viewMode === 'profile' && <UserProfileView />}
            {viewMode === 'search' && <SearchResultsView />}
            {viewMode !== 'discover' &&
              viewMode !== 'profile' &&
              viewMode !== 'search' && <FeedView />}
          </section>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </main>

      {/* Floating Ask Question Modal */}
      <AskQuestionModal />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 shadow-xl text-xs font-semibold backdrop-blur-xs animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-md px-4 py-2 flex items-center justify-around text-xs">
        <button
          onClick={() => {
            setViewMode('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 p-1 ${
            viewMode === 'home'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => {
            setViewMode('discover');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 p-1 ${
            viewMode === 'discover'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Discover</span>
        </button>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="flex flex-col items-center gap-1 p-1 text-indigo-600 dark:text-indigo-400"
        >
          <div className="p-2 -mt-5 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold">Ask</span>
        </button>

        <button
          onClick={() => {
            setViewMode('bookmarks');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 p-1 ${
            viewMode === 'bookmarks'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px]">Saved</span>
        </button>

        <button
          onClick={() => openUserProfile(currentUser.id)}
          className={`flex flex-col items-center gap-1 p-1 ${
            viewMode === 'profile'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

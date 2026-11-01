import React, { createContext, useContext, useState, useEffect } from 'react';
import { Answer, Comment, Notification, Question, Topic, User, ViewMode } from '../types';
import { CURRENT_USER, SEED_NOTIFICATIONS, SEED_QUESTIONS, SEED_TOPICS, SEED_USERS } from '../data/seedData';

interface AppContextType {
  questions: Question[];
  users: User[];
  currentUser: User;
  topics: Topic[];
  notifications: Notification[];
  viewMode: ViewMode;
  selectedTopic: Topic | null;
  selectedProfileUserId: string | null;
  searchQuery: string;
  theme: 'light' | 'dark';
  isAskModalOpen: boolean;
  activeAnswerQuestionId: string | null;
  editingAnswer: { questionId: string; answer: Answer } | null;
  toastMessage: string | null;

  // View & Nav Actions
  setViewMode: (mode: ViewMode) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  openUserProfile: (userId: string) => void;
  setSearchQuery: (query: string) => void;
  setIsAskModalOpen: (open: boolean) => void;
  setActiveAnswerQuestionId: (questionId: string | null) => void;
  setEditingAnswer: (data: { questionId: string; answer: Answer } | null) => void;
  toggleTheme: () => void;
  showToast: (msg: string) => void;

  // Question & Answer Actions
  addQuestion: (title: string, description: string, topics: string[]) => void;
  addAnswer: (questionId: string, content: string) => void;
  updateAnswer: (questionId: string, answerId: string, content: string) => void;
  deleteAnswer: (questionId: string, answerId: string) => void;
  toggleUpvoteAnswer: (questionId: string, answerId: string) => void;
  toggleDownvoteAnswer: (questionId: string, answerId: string) => void;
  toggleBookmarkQuestion: (questionId: string) => void;
  toggleBookmarkAnswer: (questionId: string, answerId: string) => void;
  toggleFollowQuestion: (questionId: string) => void;
  addComment: (questionId: string, answerId: string, content: string) => void;
  
  // Topic & User Actions
  toggleFollowTopic: (topicId: string) => void;
  toggleFollowUser: (userId: string) => void;
  updateCurrentUserProfile: (name: string, headline: string, bio: string) => void;
  switchUserPersona: (userId: string) => void;

  // Notifications
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_QUESTIONS = 'aqlive_questions_v1';
const STORAGE_KEY_TOPICS = 'aqlive_topics_v1';
const STORAGE_KEY_USERS = 'aqlive_users_v1';
const STORAGE_KEY_THEME = 'aqlive_theme_v1';
const STORAGE_KEY_NOTIFS = 'aqlive_notifs_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  // State loading from localStorage or seed
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      return saved ? JSON.parse(saved) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState<string>(CURRENT_USER.id);
  const currentUser = users.find(u => u.id === currentUserId) || users[0] || CURRENT_USER;

  const [topics, setTopics] = useState<Topic[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TOPICS);
      return saved ? JSON.parse(saved) : SEED_TOPICS;
    } catch {
      return SEED_TOPICS;
    }
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      return saved ? JSON.parse(saved) : SEED_QUESTIONS;
    } catch {
      return SEED_QUESTIONS;
    }
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
    } catch {
      return SEED_NOTIFICATIONS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.warn('LocalStorage error saving questions', e);
    }
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TOPICS, JSON.stringify(topics));
    } catch (e) {
      console.warn('LocalStorage error saving topics', e);
    }
  }, [topics]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('LocalStorage error saving users', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('LocalStorage error saving notifs', e);
    }
  }, [notifications]);

  // Navigation & UI States
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedProfileUserId, setSelectedProfileUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [activeAnswerQuestionId, setActiveAnswerQuestionId] = useState<string | null>(null);
  const [editingAnswer, setEditingAnswer] = useState<{ questionId: string; answer: Answer } | null>(null);

  const openUserProfile = (userId: string) => {
    setSelectedProfileUserId(userId);
    setViewMode('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Question
  const addQuestion = (title: string, description: string, topicList: string[]) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      author: currentUser,
      title: title.trim(),
      description: description.trim() || undefined,
      topics: topicList.length > 0 ? topicList : ['General Knowledge'],
      createdAt: 'Just now',
      answers: [],
      views: 1,
      followersCount: 1,
      isFollowing: true,
      isBookmarked: false,
    };

    setQuestions(prev => [newQuestion, ...prev]);

    // Update current user question count
    setUsers(prev =>
      prev.map(u =>
        u.id === currentUser.id
          ? { ...u, questionsCount: (u.questionsCount || 0) + 1 }
          : u
      )
    );

    // Update topic counts
    setTopics(prev =>
      prev.map(t =>
        topicList.includes(t.name)
          ? { ...t, questionsCount: t.questionsCount + 1 }
          : t
      )
    );

    showToast('Question published successfully to AQ Live feed!');
  };

  // Add Answer
  const addAnswer = (questionId: string, content: string) => {
    const newAnswer: Answer = {
      id: `ans_${Date.now()}`,
      questionId,
      author: currentUser,
      content: content.trim(),
      createdAt: 'Just now',
      upvotes: 0,
      isUpvoted: false,
      isDownvoted: false,
      isBookmarked: false,
      comments: [],
    };

    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [newAnswer, ...q.answers],
          };
        }
        return q;
      })
    );

    // Update user answer count
    setUsers(prev =>
      prev.map(u =>
        u.id === currentUser.id
          ? { ...u, answersCount: (u.answersCount || 0) + 1 }
          : u
      )
    );

    showToast('Your answer has been posted!');
  };

  // Update Answer
  const updateAnswer = (questionId: string, answerId: string, content: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(ans =>
              ans.id === answerId
                ? { ...ans, content: content.trim(), updatedAt: 'Just now' }
                : ans
            ),
          };
        }
        return q;
      })
    );
    showToast('Answer updated.');
  };

  // Delete Answer
  const deleteAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.filter(ans => ans.id !== answerId),
          };
        }
        return q;
      })
    );

    setUsers(prev =>
      prev.map(u =>
        u.id === currentUser.id
          ? { ...u, answersCount: Math.max(0, (u.answersCount || 1) - 1) }
          : u
      )
    );

    showToast('Answer removed.');
  };

  // Upvote Answer
  const toggleUpvoteAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(ans => {
              if (ans.id === answerId) {
                const wasUpvoted = !!ans.isUpvoted;
                const newUpvotes = wasUpvoted ? ans.upvotes - 1 : ans.upvotes + 1;
                return {
                  ...ans,
                  isUpvoted: !wasUpvoted,
                  isDownvoted: false,
                  upvotes: Math.max(0, newUpvotes),
                };
              }
              return ans;
            }),
          };
        }
        return q;
      })
    );
  };

  // Downvote Answer
  const toggleDownvoteAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(ans => {
              if (ans.id === answerId) {
                const wasDownvoted = !!ans.isDownvoted;
                const wasUpvoted = !!ans.isUpvoted;
                return {
                  ...ans,
                  isDownvoted: !wasDownvoted,
                  isUpvoted: false,
                  upvotes: wasUpvoted ? Math.max(0, ans.upvotes - 1) : ans.upvotes,
                };
              }
              return ans;
            }),
          };
        }
        return q;
      })
    );
  };

  // Bookmark Question
  const toggleBookmarkQuestion = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const newState = !q.isBookmarked;
          showToast(newState ? 'Question saved to bookmarks' : 'Removed from bookmarks');
          return { ...q, isBookmarked: newState };
        }
        return q;
      })
    );
  };

  // Bookmark Answer
  const toggleBookmarkAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(ans => {
              if (ans.id === answerId) {
                const newState = !ans.isBookmarked;
                showToast(newState ? 'Answer saved to bookmarks' : 'Removed answer from bookmarks');
                return { ...ans, isBookmarked: newState };
              }
              return ans;
            }),
          };
        }
        return q;
      })
    );
  };

  // Follow Question
  const toggleFollowQuestion = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          const wasFollowing = !!q.isFollowing;
          const newCount = wasFollowing ? q.followersCount - 1 : q.followersCount + 1;
          showToast(wasFollowing ? 'Unfollowed question' : 'Following question for updates');
          return {
            ...q,
            isFollowing: !wasFollowing,
            followersCount: Math.max(0, newCount),
          };
        }
        return q;
      })
    );
  };

  // Add Comment to Answer
  const addComment = (questionId: string, answerId: string, content: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      answerId,
      author: currentUser,
      content: content.trim(),
      createdAt: 'Just now',
      upvotes: 0,
      isUpvoted: false,
    };

    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(ans => {
              if (ans.id === answerId) {
                return {
                  ...ans,
                  comments: [...ans.comments, newComment],
                };
              }
              return ans;
            }),
          };
        }
        return q;
      })
    );

    showToast('Comment posted.');
  };

  // Follow Topic
  const toggleFollowTopic = (topicId: string) => {
    setTopics(prev =>
      prev.map(t => {
        if (t.id === topicId) {
          const wasFollowing = !!t.isFollowing;
          const newCount = wasFollowing ? t.followersCount - 1 : t.followersCount + 1;
          showToast(wasFollowing ? `Unfollowed #${t.name}` : `Following #${t.name}`);
          return {
            ...t,
            isFollowing: !wasFollowing,
            followersCount: Math.max(0, newCount),
          };
        }
        return t;
      })
    );
  };

  // Follow User
  const toggleFollowUser = (userId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const wasFollowing = !!u.isFollowing;
          const newCount = wasFollowing ? u.followersCount - 1 : u.followersCount + 1;
          showToast(wasFollowing ? `Unfollowed ${u.name}` : `Following ${u.name}`);
          return {
            ...u,
            isFollowing: !wasFollowing,
            followersCount: Math.max(0, newCount),
          };
        }
        if (u.id === currentUser.id) {
          const target = prev.find(t => t.id === userId);
          const wasFollowing = target?.isFollowing;
          return {
            ...u,
            followingCount: wasFollowing
              ? Math.max(0, u.followingCount - 1)
              : u.followingCount + 1,
          };
        }
        return u;
      })
    );
  };

  // Update Profile
  const updateCurrentUserProfile = (name: string, headline: string, bio: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === currentUser.id
          ? { ...u, name: name.trim(), headline: headline.trim(), bio: bio.trim() }
          : u
      )
    );
    showToast('Profile updated successfully!');
  };

  // Switch persona (allows testing multiple viewpoints easily)
  const switchUserPersona = (userId: string) => {
    setCurrentUserId(userId);
    const target = users.find(u => u.id === userId);
    if (target) {
      showToast(`Switched active persona to ${target.name}`);
    }
  };

  // Notification actions
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read.');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        questions,
        users,
        currentUser,
        topics,
        notifications,
        viewMode,
        selectedTopic,
        selectedProfileUserId,
        searchQuery,
        theme,
        isAskModalOpen,
        activeAnswerQuestionId,
        editingAnswer,
        toastMessage,

        setViewMode,
        setSelectedTopic,
        openUserProfile,
        setSearchQuery,
        setIsAskModalOpen,
        setActiveAnswerQuestionId,
        setEditingAnswer,
        toggleTheme,
        showToast,

        addQuestion,
        addAnswer,
        updateAnswer,
        deleteAnswer,
        toggleUpvoteAnswer,
        toggleDownvoteAnswer,
        toggleBookmarkQuestion,
        toggleBookmarkAnswer,
        toggleFollowQuestion,
        addComment,

        toggleFollowTopic,
        toggleFollowUser,
        updateCurrentUserProfile,
        switchUserPersona,

        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

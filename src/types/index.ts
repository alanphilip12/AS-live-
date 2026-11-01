export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  headline: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  questionsCount: number;
  answersCount: number;
  upvotesCount: number;
  joinedDate: string;
  interests: string[];
  isFollowing?: boolean;
}

export interface Comment {
  id: string;
  answerId: string;
  author: User;
  content: string;
  createdAt: string;
  upvotes: number;
  isUpvoted?: boolean;
}

export interface Answer {
  id: string;
  questionId: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  isBookmarked?: boolean;
  comments: Comment[];
}

export interface Question {
  id: string;
  author: User;
  title: string;
  description?: string;
  topics: string[];
  createdAt: string;
  answers: Answer[];
  views: number;
  followersCount: number;
  isFollowing?: boolean;
  isBookmarked?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  followersCount: number;
  isFollowing?: boolean;
  questionsCount: number;
}

export interface Notification {
  id: string;
  type: 'upvote' | 'answer' | 'comment' | 'follow';
  actor: User;
  questionTitle?: string;
  questionId?: string;
  answerId?: string;
  createdAt: string;
  isRead: boolean;
}

export type ViewMode =
  | 'home'
  | 'following'
  | 'discover'
  | 'popular'
  | 'my-questions'
  | 'my-answers'
  | 'bookmarks'
  | 'topic'
  | 'profile'
  | 'search';

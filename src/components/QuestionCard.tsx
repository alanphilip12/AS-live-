import React, { useState } from 'react';
import { Answer, Question, Topic } from '../types';
import { useApp } from '../context/AppContext';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  Edit3,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Send,
  CornerDownRight,
  Check,
  CheckCircle2,
  PenTool,
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const {
    currentUser,
    topics,
    toggleUpvoteAnswer,
    toggleDownvoteAnswer,
    toggleBookmarkQuestion,
    toggleBookmarkAnswer,
    toggleFollowQuestion,
    addAnswer,
    updateAnswer,
    deleteAnswer,
    addComment,
    openUserProfile,
    setSelectedTopic,
    setViewMode,
    showToast,
  } = useApp();

  // Answer composer toggle
  const [isAnswering, setIsAnswering] = useState(false);
  const [answerDraft, setAnswerDraft] = useState('');

  // Edit answer state
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');

  // Show all answers vs top answer
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  // Expanded "Read More" for individual answers
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  // Active comment box toggle per answer
  const [activeCommentAnswerId, setActiveCommentAnswerId] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState('');

  // Expand question description
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Share action
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#${question.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Question link copied to clipboard!');
      });
    } else {
      showToast('Question link ready to share');
    }
  };

  // Submit Answer
  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerDraft.trim()) return;
    addAnswer(question.id, answerDraft);
    setAnswerDraft('');
    setIsAnswering(false);
    setShowAllAnswers(true);
  };

  // Submit Edit Answer
  const handleSaveEdit = (answerId: string) => {
    if (!editDraft.trim()) return;
    updateAnswer(question.id, answerId, editDraft);
    setEditingAnswerId(null);
    setEditDraft('');
  };

  // Submit Comment
  const handlePostComment = (answerId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentDraft.trim()) return;
    addComment(question.id, answerId, commentDraft);
    setCommentDraft('');
  };

  const toggleExpandAnswer = (answerId: string) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [answerId]: !prev[answerId],
    }));
  };

  // Display answers: either all or top answer
  const answersToDisplay = showAllAnswers
    ? question.answers
    : question.answers.slice(0, 1);

  return (
    <article
      id={question.id}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700/80 transition-all overflow-hidden"
    >
      {/* 1. Question Header Section */}
      <div className="p-5 sm:p-6 pb-4">
        {/* Author & Timestamp & Topics Row */}
        <div className="flex items-center justify-between gap-3 text-xs mb-3 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={question.author.avatar}
              alt={question.author.name}
              referrerPolicy="no-referrer"
              onClick={() => openUserProfile(question.author.id)}
              className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-85 transition-opacity ring-1 ring-slate-200 dark:ring-slate-700 shrink-0 bg-slate-100"
            />
            <div className="truncate">
              <span
                onClick={() => openUserProfile(question.author.id)}
                className="font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
              >
                {question.author.name}
              </span>
              <span className="mx-1.5 text-slate-300 dark:text-slate-700">·</span>
              <span>Asked {question.createdAt}</span>
            </div>
          </div>

          {/* Follow Question / Bookmark */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => toggleFollowQuestion(question.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                question.isFollowing
                  ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
              }`}
            >
              {question.isFollowing ? 'Following' : '+ Follow'}
            </button>
            <button
              onClick={() => toggleBookmarkQuestion(question.id)}
              aria-label="Bookmark question"
              className={`p-1.5 rounded-lg transition-colors ${
                question.isBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${question.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Question Title */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
          {question.title}
        </h2>

        {/* Optional Description */}
        {question.description && (
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className={isDescExpanded ? '' : 'line-clamp-2'}>
              {question.description}
            </p>
            {question.description.length > 130 && (
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
              >
                {isDescExpanded ? 'Show less' : 'Read details'}
              </button>
            )}
          </div>
        )}

        {/* Topic Tags Row (Unboxed metadata style) */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Topics:
          </span>
          {question.topics.map((t, i) => (
            <React.Fragment key={t}>
              <button
                onClick={() => {
                  const found = topics.find(topic => topic.name.toLowerCase() === t.toLowerCase());
                  if (found) {
                    setSelectedTopic(found);
                    setViewMode('topic');
                  } else {
                    setViewMode('discover');
                  }
                }}
                className="font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                #{t}
              </button>
              {i < question.topics.length - 1 && (
                <span className="text-slate-300 dark:text-slate-700">·</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span>{question.views.toLocaleString()} views</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span>{question.answers.length} {question.answers.length === 1 ? 'answer' : 'answers'}</span>
        </div>

        {/* Question Action Bar */}
        <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAnswering(prev => !prev)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isAnswering
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{isAnswering ? 'Cancel Answer' : 'Answer this question'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Inline Answer Composer */}
      {isAnswering && (
        <div className="px-5 sm:px-6 py-4 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5 mb-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Writing answer as {currentUser.name}
            </span>
          </div>
          <form onSubmit={handlePostAnswer} className="space-y-3">
            <textarea
              rows={4}
              value={answerDraft}
              onChange={e => setAnswerDraft(e.target.value)}
              placeholder="Write a clear, thoughtful, and detailed answer. Share reasoning, evidence, or practical examples..."
              className="w-full p-3.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-y"
              autoFocus
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Markdown & paragraph breaks are supported
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAnswering(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!answerDraft.trim()}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
                >
                  Post Answer
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 3. Answers Section Directly Underneath the Question */}
      {question.answers.length > 0 && (
        <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40">
          <div className="p-5 sm:p-6 space-y-6">
            {answersToDisplay.map((ans, idx) => {
              const isOwner = ans.author.id === currentUser.id;
              const isExpanded = !!expandedAnswers[ans.id];
              const isEditing = editingAnswerId === ans.id;
              const isLong = ans.content.length > 380;
              const isCommentsOpen = activeCommentAnswerId === ans.id;

              return (
                <div
                  key={ans.id}
                  className="relative pl-4 sm:pl-5 border-l-2 border-indigo-200 dark:border-indigo-900/60 transition-colors"
                >
                  {/* Answerer Metadata */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <img
                        src={ans.author.avatar}
                        alt={ans.author.name}
                        referrerPolicy="no-referrer"
                        onClick={() => openUserProfile(ans.author.id)}
                        className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-85 transition-opacity shrink-0 bg-slate-200 dark:bg-slate-800"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            onClick={() => openUserProfile(ans.author.id)}
                            className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                          >
                            {ans.author.name}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                              Top Answer
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                          {ans.author.headline}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Answered {ans.createdAt}
                          {ans.updatedAt && ' · Edited'}
                        </div>
                      </div>
                    </div>

                    {/* Owner actions: Edit / Delete */}
                    {isOwner && !isEditing && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <button
                          onClick={() => {
                            setEditingAnswerId(ans.id);
                            setEditDraft(ans.content);
                          }}
                          className="p-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title="Edit Answer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteAnswer(question.id, ans.id)}
                          className="p-1 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          title="Delete Answer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Answer Content */}
                  {isEditing ? (
                    <div className="mt-2 space-y-2">
                      <textarea
                        rows={5}
                        value={editDraft}
                        onChange={e => setEditDraft(e.target.value)}
                        className="w-full p-3 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingAnswerId(null)}
                          className="px-3 py-1 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(ans.id)}
                          className="px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal space-y-3">
                      <div
                        className={`whitespace-pre-line ${
                          isLong && !isExpanded ? 'line-clamp-4' : ''
                        }`}
                      >
                        {ans.content}
                      </div>

                      {isLong && (
                        <button
                          onClick={() => toggleExpandAnswer(ans.id)}
                          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline block pt-0.5"
                        >
                          {isExpanded ? '(Read Less)' : '... (Read More)'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Answer Interactive Action Bar */}
                  <div className="mt-3 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      {/* Upvote Button with Count */}
                      <button
                        onClick={() => toggleUpvoteAnswer(question.id, ans.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          ans.isUpvoted
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${ans.isUpvoted ? 'fill-current' : ''}`} />
                        <span>Upvote</span>
                        <span className="opacity-80">·</span>
                        <span className="tabular-nums">{ans.upvotes}</span>
                      </button>

                      {/* Downvote */}
                      <button
                        onClick={() => toggleDownvoteAnswer(question.id, ans.id)}
                        aria-label="Downvote"
                        className={`p-1.5 rounded-full text-xs transition-colors ${
                          ans.isDownvoted
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600 dark:hover:bg-slate-800'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Comment Toggle */}
                      <button
                        onClick={() =>
                          setActiveCommentAnswerId(
                            isCommentsOpen ? null : ans.id
                          )
                        }
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          isCommentsOpen
                            ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white'
                            : 'hover:bg-slate-100 text-slate-600 dark:hover:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{ans.comments.length}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleBookmarkAnswer(question.id, ans.id)}
                        aria-label="Bookmark answer"
                        className={`p-1.5 rounded-lg transition-colors ${
                          ans.isBookmarked
                            ? 'text-amber-500'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${ans.isBookmarked ? 'fill-current' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* 4. Comments Accordion */}
                  {isCommentsOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
                      {/* Comments List */}
                      {ans.comments.length > 0 && (
                        <div className="space-y-2.5">
                          {ans.comments.map(c => (
                            <div
                              key={c.id}
                              className="flex items-start gap-2.5 text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800"
                            >
                              <img
                                src={c.author.avatar}
                                alt={c.author.name}
                                referrerPolicy="no-referrer"
                                onClick={() => openUserProfile(c.author.id)}
                                className="w-6 h-6 rounded-full object-cover cursor-pointer shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    onClick={() => openUserProfile(c.author.id)}
                                    className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer hover:underline"
                                  >
                                    {c.author.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    {c.createdAt}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-slate-700 dark:text-slate-300 leading-normal">
                                  {c.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Input */}
                      <form
                        onSubmit={e => handlePostComment(ans.id, e)}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          referrerPolicy="no-referrer"
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                        />
                        <input
                          type="text"
                          value={commentDraft}
                          onChange={e => setCommentDraft(e.target.value)}
                          placeholder="Add a constructive comment or response..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          type="submit"
                          disabled={!commentDraft.trim()}
                          className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Toggle show all answers */}
            {question.answers.length > 1 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllAnswers(prev => !prev)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-colors"
                >
                  {showAllAnswers ? (
                    <>
                      <span>Show top answer only</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>View all {question.answers.length} answers</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. If No Answers Yet */}
      {question.answers.length === 0 && !isAnswering && (
        <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            No answers yet. Be the first to share knowledge on this question!
          </p>
          <button
            onClick={() => setIsAnswering(true)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Write an Answer →
          </button>
        </div>
      )}
    </article>
  );
};

/**
 * TypeScript types for MyNaksh Chat feature
 */

export type MessageSender = 'user' | 'ai_astrologer' | 'human_astrologer' | 'system';
export type MessageType = 'text' | 'ai' | 'human' | 'event';
export type FeedbackType = 'liked' | 'disliked' | null;
export type FeedbackReason = 'inaccurate' | 'too_vague' | 'too_long' | null;

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: number;
  type: MessageType;
  replyTo?: string; // message id
  hasFeedback?: boolean;
  feedbackType?: FeedbackType;
  feedbackReason?: FeedbackReason;
}

export interface ChatState {
  messages: Message[];
  replyingTo: Message | null;
  reactions: Record<string, string[]>; // messageId -> emoji[]
  feedback: Record<string, { type: FeedbackType; reason: FeedbackReason }>; // messageId -> feedback
  isRatingVisible: boolean;
  sessionRating: number | null;
  emojiBar: { messageId: string; anchor: { x: number; y: number; width: number; height: number } } | null;
}

export interface ChatContextType extends ChatState {
  setReplyingTo: (message: Message | null) => void;
  addReaction: (messageId: string, emoji: string) => void;
  setFeedback: (messageId: string, type: FeedbackType, reason?: FeedbackReason) => void;
  showRating: () => void;
  hideRating: () => void;
  setSessionRating: (rating: number) => void;
  addMessage: (message: Message) => void;
  setEmojiBar: (v: { messageId: string; anchor: { x: number; y: number; width: number; height: number } } | null) => void;
}

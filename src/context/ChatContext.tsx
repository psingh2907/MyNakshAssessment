/**
 * Chat Context for state management
 */

import React, { createContext, useCallback, useContext, useReducer } from 'react';
import {
  ChatState,
  ChatContextType,
  Message,
  FeedbackType,
  FeedbackReason,
} from '../types/chat';

const initialState: ChatState = {
  messages: [],
  replyingTo: null,
  reactions: {},
  feedback: {},
  isRatingVisible: false,
  sessionRating: null,
  emojiBar: null,
};

type EmojiBarPayload = { messageId: string; anchor: { x: number; y: number; width: number; height: number } } | null;

type ChatAction =
  | { type: 'SET_REPLYING_TO'; payload: Message | null }
  | { type: 'ADD_REACTION'; payload: { messageId: string; emoji: string } }
  | { type: 'SET_FEEDBACK'; payload: { messageId: string; type: FeedbackType; reason?: FeedbackReason } }
  | { type: 'SHOW_RATING' }
  | { type: 'HIDE_RATING' }
  | { type: 'SET_SESSION_RATING'; payload: number }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SET_EMOJI_BAR'; payload: EmojiBarPayload };

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_REPLYING_TO':
      return { ...state, replyingTo: action.payload };
    case 'ADD_REACTION': {
      const { messageId, emoji } = action.payload;
      const existingReaction = state.reactions[messageId]?.[0]; // Only one emoji allowed
      // If same emoji clicked, remove it. Otherwise, replace with new emoji
      const updatedReactions = existingReaction === emoji ? [] : [emoji];
      return {
        ...state,
        reactions: {
          ...state.reactions,
          [messageId]: updatedReactions,
        },
      };
    }
    case 'SET_FEEDBACK': {
      const { messageId, type, reason } = action.payload;
      const next = { ...state.feedback };
      if (type == null) {
        delete next[messageId];
      } else {
        next[messageId] = { type, reason: reason ?? null };
      }
      return { ...state, feedback: next };
    }
    case 'SHOW_RATING':
      return { ...state, isRatingVisible: true };
    case 'HIDE_RATING':
      return { ...state, isRatingVisible: false, sessionRating: null };
    case 'SET_SESSION_RATING':
      return { ...state, sessionRating: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_EMOJI_BAR':
      return { ...state, emojiBar: action.payload };
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children, initialMessages }: { children: React.ReactNode; initialMessages: Message[] }) {
  const [state, dispatch] = useReducer(chatReducer, {
    ...initialState,
    messages: initialMessages,
  });

  const setReplyingTo = useCallback((message: Message | null) => {
    dispatch({ type: 'SET_REPLYING_TO', payload: message });
  }, []);

  const addReaction = useCallback((messageId: string, emoji: string) => {
    dispatch({ type: 'ADD_REACTION', payload: { messageId, emoji } });
  }, []);

  const setFeedback = useCallback((messageId: string, type: FeedbackType, reason?: FeedbackReason) => {
    dispatch({ type: 'SET_FEEDBACK', payload: { messageId, type, reason } });
  }, []);

  const showRating = useCallback(() => {
    dispatch({ type: 'SHOW_RATING' });
  }, []);

  const hideRating = useCallback(() => {
    dispatch({ type: 'HIDE_RATING' });
  }, []);

  const setSessionRating = useCallback((rating: number) => {
    dispatch({ type: 'SET_SESSION_RATING', payload: rating });
  }, []);

  const addMessage = useCallback((message: Message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const setEmojiBar = useCallback((payload: EmojiBarPayload) => {
    dispatch({ type: 'SET_EMOJI_BAR', payload });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        ...state,
        setReplyingTo,
        addReaction,
        setFeedback,
        showRating,
        hideRating,
        setSessionRating,
        addMessage,
        setEmojiBar,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

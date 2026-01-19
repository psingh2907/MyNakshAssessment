/**
 * Chat helpers – shared logic for labels and formatting
 */

import type { MessageSender } from '../types/chat';

export function getSenderLabel(sender: MessageSender | string): string {
  switch (sender) {
    case 'ai_astrologer':
      return 'AI Astrologer';
    case 'human_astrologer':
      return 'Astrologer Vikram';
    case 'system':
      return 'System';
    default:
      return 'You';
  }
}

export function formatMessageTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

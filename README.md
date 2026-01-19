# MyNaksh Chat – React Native

Interactive chat screen for the [MyNaksh](https://www.mynaksh.com/) frontend assessment: swipe-to-reply, icon reactions, AI feedback (Like/Dislike + chips), and session rating. The UI uses a **cosmic purple + gold** palette aligned with astrology branding (mystical, premium).

---

## Steps to Run the App

### Prerequisites

- **Node.js** ≥ 20
- **React Native** dev setup: [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- **Android:** Android Studio, SDK, emulator or device  
- **iOS:** Xcode, CocoaPods, simulator or device (macOS only)

### 1. Install dependencies

```bash
npm install
```

### 2. iOS only – install pods

```bash
cd ios && pod install && cd ..
```

### 3. Start Metro

```bash
npx react-native start
```

Optional: clear cache if you hit module or Babel issues:

```bash
npx react-native start --reset-cache
```

### 4. Run the app

**Android:**

```bash
npm run android
```

**iOS:**

```bash
npm run ios
```

### 5. Entry points

- **ChatScreen** is the initial route (for testing the chat flow).
- **OTPScreen** is available; navigate to `ChatScreen` after OTP success. You can switch `initialRouteName` in `src/navigation/AppNavigator.tsx` if needed.

---

## How Reanimated 3+ Was Used

The app uses **Reanimated 4** (compatible with the “Reanimated 3+” requirement). Animations are driven from the **UI thread** via worklets to keep the JS thread free.

### Where and how

| Feature | Reanimated API | Purpose |
|--------|----------------|---------|
| **Swipe-to-reply** | `useSharedValue`, `useAnimatedStyle`, `withSpring`, `interpolate` | Translate and scale the bubble; animate reply icon (opacity, scale, rotation). |
| **Emoji bar** | `useAnimatedReaction`, `withSpring`, `withTiming`, `useAnimatedStyle` | Show/hide with scale and opacity; stagger emoji scale. `runOnJS` only for `setIsVisible` and `onClose` when the hide animation finishes. |
| **Like/Dislike** | `useSharedValue`, `useAnimatedStyle`, `withSequence`, `withSpring` | Press feedback (scale up/down) on the buttons. |
| **Feedback chips** | `Layout.springify()` on `Animated.View` | Animated expand when Dislike is selected. |
| **Reply preview** | `FadeInDown`, `FadeOutUp`, `Layout.springify()` | Enter/exit and layout changes. |
| **Rating overlay** | `FadeIn`, `FadeOut`, `useAnimatedStyle` with `withSpring` / `withTiming` | Overlay and modal scale; Reanimated-driven transitions. |
| **Star rating** | `useAnimatedStyle`, `withSequence`, `withSpring` | Star press animation. |

### Practices

- **Worklets:** `'worklet'` in `useAnimatedReaction` and `useAnimatedStyle` so logic runs on the UI thread.
- **Bridging to JS:** `runOnJS` only for state updates (`setReplyingTo`, `setEmojiBar`, `onClose`, etc.) at the end of gestures or animations.
- **InteractionManager:** Used when *triggering* the emoji bar close (on scroll and tap-outside) so that work is deferred and the JS thread stays responsive during touch/scroll.

Reanimated is enabled via `react-native-reanimated/plugin` in `babel.config.js` (it must remain the last plugin).

---

## Gesture Handling Approach

We use **React Native Gesture Handler** with a **composition + worklet** approach.

### Gestures

1. **Swipe-to-reply (Pan)**  
   - `Gesture.Pan()` on non-user, non-event messages.  
   - `activeOffsetX(10)` to avoid accidental activations.  
   - `onUpdate`: `translateX` with resistance so it doesn’t overshoot.  
   - `onEnd`: trigger reply if over a distance threshold or with enough velocity; otherwise spring back.  
   - All of this runs in worklets; only `setReplyingTo` is called via `runOnJS`.

2. **Long-press for emoji bar**  
   - `Gesture.LongPress().minDuration(250).maxDistance(10)`.  
   - `onStart`: `runOnJS(openEmojiBar)()`, which measures the bubble and opens the emoji bar for that message.  

3. **Composition**  
   - `Gesture.Simultaneous(panGesture, longPressGesture)` so both can be recognized; Pan is disabled for user/event messages.

### Principles

- Gesture logic and animation updates stay in worklets on the UI thread.
- JS is only used for discrete actions (e.g. `setReplyingTo`, `setEmojiBar`, `addReaction`) via `runOnJS`.
- `react-native-gesture-handler` is imported at the very top of `index.js` as required by the library.

---

## State Management Choice: Context

We use **React Context + `useReducer`** (no Redux or Zustand).

### Rationale

- Fits the scope: one main chat feature, no need for a separate store or devtools.
- No extra dependencies; aligns with “avoid unnecessary libraries.”
- Easy to follow: `ChatContext` holds all chat-related state and actions; `useChat()` for consumption.

### Structure

- **`ChatContext`** (`src/context/ChatContext.tsx`):  
  - `useReducer(chatReducer, …)` for: `messages`, `replyingTo`, `reactions`, `feedback`, `isRatingVisible`, `sessionRating`, `emojiBar`.  
  - Actions: `SET_REPLYING_TO`, `ADD_REACTION`, `SET_FEEDBACK`, `SHOW_RATING` / `HIDE_RATING`, `SET_SESSION_RATING`, `ADD_MESSAGE`, `SET_MESSAGES`, `SET_EMOJI_BAR`.  

- **`ChatProvider`** wraps the chat (e.g. `ChatScreen`) and receives `initialMessages` (e.g. `MOCK_MESSAGES`).  

- **`useChat()`** returns `{ ...state, setReplyingTo, addReaction, setFeedback, showRating, hideRating, setSessionRating, addMessage, setEmojiBar }`.

---

## Feature Overview

- **Swipe-to-reply** on others’ messages; “Replying to…” preview above the input; Cancel to clear.  
- **Long-press** to open the **reaction icon bar** (Ionicons: heart, star, thumbs-up, moon, sparkles, ribbon); one reaction per message; tap outside or scroll to close.  
- **Like/Dislike** on AI messages; Dislike expands chips (Inaccurate, Too Vague, Too Long); chip selection updates local state.  
- **End Chat** in the header (de‑emphasized ghost style to reduce temptation to leave) → full-screen rating overlay (5-star, Thank You, blur-like background); Submit shows an Alert that the rating was captured.  
- **OTPScreen** and **ChatScreen** are both in the stack; Chat is the default for quick testing.

---

## Reaction Icons (Customization)

Reactions use **Ionicons** from `react-native-vector-icons` instead of emoji. To change the set:

1. **Edit** `src/utils/constants.ts` → `CHAT_CONFIG.REACTION_ICONS`:

   ```ts
   REACTION_ICONS: [
     { id: 'heart', name: 'heart' },
     { id: 'star', name: 'star' },
     { id: 'thumbs-up', name: 'thumbs-up' },
     { id: 'moon', name: 'moon' },
     { id: 'sparkles', name: 'sparkles' },
     { id: 'ribbon', name: 'ribbon' },
   ]
   ```

   - `id`: stored in state and used as the reaction key.  
   - `name`: Ionicons glyph name ([Ionicons](https://ionic.io/ionicons)).

2. **Add/remove** entries; `EmojiBar` and `MessageBubble` read from this config.

3. **iOS:** If icons show as □ or ?, add the font to the app: in Xcode, **File → Add Files to "SampleProject"** → select `node_modules/react-native-vector-icons/Fonts/Ionicons.ttf` → ensure your app target is checked. `Info.plist` already includes `Ionicons.ttf` under `UIAppFonts`.

4. **Android:** Fonts are wired via `android/app/build.gradle` (`apply from: .../react-native-vector-icons/fonts.gradle` and `project.ext.vectoricons`). Rebuild after changing the font set.

---

## Color Palette (MyNaksh‑inspired)

Aligned with [mynaksh.com](https://www.mynaksh.com/) and common astrology branding:

| Role | Hex | Use |
|------|-----|------|
| **Primary** (cosmic purple) | `#5B4B8A` | Headers, user bubbles, links, focus |
| **Gold** | `#C9A227` | Send, Submit, star rating, reaction icons |
| **Backgrounds** | `#FAF8F5`, `#F5F1EB`, `#EDE9E1` | Warm ivory/cream surfaces |
| **Overlay** | `rgba(44,40,56,0.9)` | Rating modal backdrop (cosmic dark) |
| **End Chat** | Ghost: `transparent` fill, `COLORS.border` + `COLORS.textTertiary` | De‑emphasized; see below. |

To change: edit `src/utils/constants.ts` → `COLORS`.

---

## End Chat Button – Psychology (Reduce Temptation to Leave)

The **End Chat** control uses a **ghost/outline** style (transparent fill, subtle border, muted text) instead of a bold red button. The goal is to **lower the urge to end the session** while keeping the action available when the user really wants it.

- **Before:** Strong red fill and shadow — high salience, more likely to draw clicks.
- **After:** Outline only, `textTertiary` for the label, no prominent shadow — reads as a secondary, “use only when needed” action. Primary focus stays on the conversation and on high‑value CTAs (e.g. Send, reactions).

This treatment was **found successful** in making the exit path feel optional rather than tempting, without hiding or removing the option.

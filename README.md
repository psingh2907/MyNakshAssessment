# OTP Verification Screen

A production-ready, reusable OTP (One-Time Password) verification component built with React Native and TypeScript.

## Overview

This project implements a complete OTP verification flow with a focus on code quality, maintainability, and reusability. The component can be easily integrated into different contexts like payment verification, password changes, or account verification.

## Features

### Core Requirements ✅

- **4-digit OTP input** - Custom implementation without using any OTP libraries
- **Verify button** - Logs OTP to console and simulates network delay (1.5s)
- **Resend functionality** - Available after 60 seconds with visible countdown timer
- **Timer display** - Shows countdown in MM:SS format

### Enhanced Features 🚀

- **Auto-submit** - Automatically verifies when all 4 digits are entered
- **Paste support** - Users can paste 4-digit codes from clipboard
- **Smart focus management** - Auto-advances to next field, backspace navigates to previous
- **Visual feedback** - Clear states for focus, filled, error, and disabled
- **Loading states** - Button shows loading indicator during verification
- **Error handling** - Graceful error messages with retry capability
- **Accessibility** - Proper labels and hints for screen readers
- **Keyboard handling** - Dismisses keyboard on verify

## Project Structure

```
src/
├── components/
│   ├── Button/              # Reusable button component
│   └── OTPInput/            # Custom 4-digit OTP input
├── screens/
│   └── OTPScreen/           # Main OTP verification screen
├── hooks/
│   ├── useOTP.ts            # OTP state management
│   ├── useTimer.ts          # Countdown timer logic
│   └── useOTPVerification.ts # Verification flow logic
├── services/
│   └── otpService.ts        # Mock API service
├── utils/
│   ├── constants.ts         # App constants (colors, spacing, fonts)
│   ├── strings.ts           # Centralized strings
│   └── otpUtils.ts          # OTP validation helpers
└── types/
    └── index.ts             # TypeScript type definitions
```

## Architecture Decisions

### 1. **No OTP Libraries**

Built a custom OTP input component from scratch to have full control over behavior and styling.

### 2. **Centralized Constants**

- All colors, spacing, font sizes, and font weights are defined in `constants.ts`
- All user-facing strings are in `strings.ts` for easy maintenance and future i18n support

### 3. **Custom Hooks**

Separated business logic into reusable hooks:

- `useOTP` - Manages OTP input state and interactions
- `useTimer` - Handles countdown timer logic
- `useOTPVerification` - Manages verification flow

### 4. **Component Architecture**

- Reusable `Button` component with variants
- Modular `OTPInput` component that can be used independently
- Clean separation of concerns (components, hooks, services, utils)

### 5. **TypeScript**

- Strict typing throughout the codebase
- No `any` types except where necessary (style arrays)
- Proper interfaces for all props and return types

### 6. **Modern React Patterns**

- Function components (no `React.FC`)
- Custom hooks for reusable logic
- Proper use of `useCallback` and `useEffect` for performance

## Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS Simulator or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# For iOS, install CocoaPods dependencies
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS (in new terminal)
npm run ios

# Run on Android (in new terminal)
npm run android
```

## Usage

```typescript
import { OTPScreen } from './src/screens/OTPScreen/OTPScreen';

function App() {
  const handleVerificationSuccess = () => {
    console.log('OTP verified!');
    // Navigate to next screen
  };

  return (
    <OTPScreen
      onVerificationSuccess={handleVerificationSuccess}
      email="user@example.com"
    />
  );
}
```

## Key Implementation Details

### OTP Input Logic

- Only accepts numeric input (0-9)
- Auto-advances to next field on input
- Backspace navigates to previous field when current is empty
- Detects paste events and distributes digits across fields
- Maintains focus state for visual feedback

### Timer Implementation

- Starts at 60 seconds on mount
- Counts down to 0 with MM:SS formatting
- Resets when resend is clicked
- Disables resend button while active

### Verification Flow

1. User enters 4 digits
2. Auto-submits or user clicks Verify
3. Button shows loading state
4. Mock API call with 1.5s delay
5. OTP logged to console (as required)
6. Success/error message displayed
7. Success callback triggered after 1 second

## Code Quality

- ✅ **TypeScript** - Strict typing, no `any` types
- ✅ **Clean Code** - Readable, maintainable, well-structured
- ✅ **Reusability** - Components can be used in different contexts
- ✅ **Performance** - Optimized with `useCallback` and proper memoization
- ✅ **Accessibility** - Screen reader support, proper labels
- ✅ **Error Handling** - Comprehensive error states and user feedback
- ✅ **Testing Ready** - Structure supports easy unit testing

## Testing Checklist

- [x] Enter 4 digits manually
- [x] Paste 4-digit code
- [x] Backspace navigation
- [x] Verify button functionality
- [x] Timer countdown (60s → 0)
- [x] Resend button enables after timer
- [x] Error handling
- [x] Success flow
- [x] Auto-submit on complete
- [x] Keyboard dismissal

## Future Enhancements

Potential improvements for production:

- Unit tests with Jest and React Native Testing Library
- E2E tests with Detox
- Biometric authentication option
- Dark mode support
- Internationalization (i18n)
- Analytics integration
- Rate limiting for security

## Notes

- The OTP service is mocked for demonstration purposes
- In production, replace `otpService.ts` with actual API calls
- All strings are centralized for easy translation
- Component is designed to be reusable across different use cases

---

Built with ❤️ using React Native and TypeScript

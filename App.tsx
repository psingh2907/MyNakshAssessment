/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OTPScreen } from './src/screens/OTPScreen/OTPScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const handleVerificationSuccess = () => {
    console.log('OTP verification successful!');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <OTPScreen
        onVerificationSuccess={handleVerificationSuccess}
        email="example@gmail.com"
      />
    </SafeAreaProvider>
  );
}

export default App;

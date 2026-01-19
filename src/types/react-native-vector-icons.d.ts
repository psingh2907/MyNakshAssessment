declare module 'react-native-vector-icons/Ionicons' {
  import type { ComponentType } from 'react';
  import type { TextStyle } from 'react-native';

  export interface IoniconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | TextStyle[];
  }

  const Ionicons: ComponentType<IoniconsProps>;
  export default Ionicons;
}

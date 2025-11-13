declare module '@react-native-firebase/messaging' {
  // Minimal, permissive typings for dynamic import usage.
  // If you later install @react-native-firebase/messaging, replace with proper types.
  export default function messaging(): {
    getToken: () => Promise<string>;
    deleteToken?: () => Promise<void>;
    onMessage?: (handler: (message: any) => any) => any;
    onTokenRefresh?: (handler: (token: string) => any) => any;
    [key: string]: any;
  };
}

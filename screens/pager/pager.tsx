import { Text } from '@/components/ui';
import { useFocusEffect } from '@react-navigation/native';
import { Audio, InterruptionModeAndroid } from 'expo-av';
import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export function Pager() {
  const soundRef = React.useRef<Audio.Sound | null>(null);

  async function startAlertSound() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });

      if (soundRef.current) {
        await soundRef.current.replayAsync();
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/audio/alert.mp3'),
        { isLooping: true, volume: 1.0, shouldPlay: true }
      );
      soundRef.current = sound;
    } catch (e) {
      console.warn('[pager] startAlertSound error', e);
    }
  }

  async function stopAlertSound() {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch (e) {
      console.warn('[pager] stopAlertSound error', e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      startAlertSound();
      return () => {
        StatusBar.setBarStyle('dark-content', true)
        stopAlertSound();
      }
    }, [])
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FF0000' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Paging ASAP</Text>
      </View>
    </SafeAreaView>
  );
}
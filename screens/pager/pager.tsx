import { Button, Icon, Text } from '@/components/ui';
import { useFocusEffect } from '@react-navigation/native';
import { Audio, InterruptionModeAndroid } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export function Pager() {
  const routeParams = useLocalSearchParams();

  const parsed = useMemo(() => {
    const raw = (routeParams as any).params || (routeParams as any).data;
    if (!raw) return null;
    try {
      if (typeof raw === 'string') return JSON.parse(raw);
      return raw;
    } catch {
      return null;
    }
  }, [routeParams]);

  const id = (parsed?.id || routeParams.id) as string | undefined;
  const title = (parsed?.title || routeParams.title) as string | undefined;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#6C1313' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="alert_atm" size={240} />
        <Text fos={24} fow="600" color="$white" mt={53}>{title || 'Alert'}</Text>
        <Text ta="center" color="$gray2" w="70%" mt="$2">
          A fault has been detected on an ATM and the task has been assigned to you.
        </Text>
        <Button
          type="dark"
          pill
          mt={32}
          onPress={() => id && router.replace(`/tasks/${id}`)}
        >
          View Details
        </Button>
      </View>
    </SafeAreaView>
  );
}
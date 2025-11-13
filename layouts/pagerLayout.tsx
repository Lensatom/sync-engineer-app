import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function PagerLayout() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'red' }}
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false, }} />
    </SafeAreaView>
  )
}
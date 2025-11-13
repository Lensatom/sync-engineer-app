import { Text } from '@/components/ui'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import { View } from 'tamagui'

export function Pager() {
  const isFocused = useIsFocused()

  useFocusEffect(
    useCallback(() => {
      // set red status bar only while this screen is focused
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#FF0000', true)
      }
      StatusBar.setBarStyle('light-content', true)

      // restore RootLayout defaults on blur
      return () => {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('#FFFFFF', true)
        }
        StatusBar.setBarStyle('dark-content', true)
      }
    }, [])
  )

  useEffect(() => {
    if (!isFocused) {
      // stopAlertSound()
    }
    return () => {
      // stopAlertSound()
    }
  }, [isFocused])

  return (
    <View style={{flex: 1}}>
      <Text>Paging ASAP</Text>
    </View>
  )
}

// adb tcpip 5555
// adb connect 192.168.0.105:5555
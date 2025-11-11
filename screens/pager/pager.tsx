import { Container } from '@/components/layout'
import { Text } from '@/components/ui'
import { stopAlertSound } from '@/utils/notifications'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'

export function Pager() {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) {
      stopAlertSound()
    }
    return () => {
      stopAlertSound()
    }
  }, [isFocused])

  return (
    <Container main jc="center" ai="center" bg="red">
      <Text>Paging ASAP</Text>
    </Container>
  )
}
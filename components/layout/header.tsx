import { PADDING_X } from '@/constants/theme'
import React from 'react'
import { View, XStack } from 'tamagui'
import { Icon, Text } from '../ui'

interface HeaderProps {
  withBackButton?: boolean
  title?: string
  RightComp?: () => React.ReactNode
}

export function Header({
  withBackButton = true,
  title = '',
  RightComp
}: HeaderProps) {
  return (
    <XStack px={PADDING_X} h={52} ai="center" bg="$white">
      {withBackButton && (
        <View mr="$4">
          <Icon name="arrow_head_left" size={12} padding={8} />
        </View>
      )}
      <Text fos={18} fow="600" color="$gray12" flex={1}>{title}</Text>
      {RightComp?.()}
    </XStack>
  )
}
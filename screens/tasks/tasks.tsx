import { Container, Tab } from '@/components/layout'
import { StatusPill } from '@/components/shared'
import { Avatar, Button, HorizontalLine, Icon, Text, Toggle } from '@/components/ui'
import { PADDING_X, SCREEN_WIDTH } from '@/constants/theme'
import { useUser } from '@/layouts/rootLayout'
import React, { useMemo, useState } from 'react'
import { XStack, YStack } from 'tamagui'
import { TaskCard } from './components'

export function Tasks() {
  const { user } = useUser();
  const image_uri = user.email === "inuoluwadunsimi1@gmail.com"
    ? "https://jhu.edu.ng/wp-content/uploads/2023/11/Jim-Ovia-CON_.jpg"
    : ""
  const [isAvailable, setIsAvailable] = useState(false)


  console.log(user)

  const taskTabs = useMemo(() => [
    {
      title: "Active",
      name: "active",
      content: <TaskCard details="" />
    },
    {
      title: "Assigned",
      name: "assigned",
      content: <Text>Assigned Tasks</Text>
    },
    {
      title: "Resolved",
      name: "resolved",
      content: <Text>Resolved Tasks</Text>
    },
    {
      title: "Unresolved",
      name: "unresolved",
      content: <Text>Unresolved Tasks</Text>
    }
  ], [])

  return (
    <Container main>
      <XStack ai="center">
        <Avatar uri={image_uri} size={48} />
        <YStack ml={12}>
          <Text type="h1" tt="capitalize">Hi, {user?.firstName} {user?.lastName}</Text>
          <Text type="sub1">do xyz to increase your Efficiency score</Text>
        </YStack>
      </XStack>

      <YStack mx={-PADDING_X} w={SCREEN_WIDTH} gap="$3">
        <HorizontalLine mt="$4" />
        <XStack px={PADDING_X} jc="space-between" ai="center">
          <YStack>
            <XStack ai="center">
              <Icon name="power" size={16} padding={0} />
              <Text fos={14} fow="500" ml="$1">Your Status</Text>
              <StatusPill status={isAvailable ? "available" : "offline"} ml="$2" />
            </XStack>
            <Text fos={11} color="$gray11" mt="$1.5">Switch toggle to change your availability status.</Text>
          </YStack>
          <Toggle checked={isAvailable} onChange={setIsAvailable} />
        </XStack>
        
        <HorizontalLine />

        <XStack px={PADDING_X}>
          <YStack flex={1}>
            <XStack ai="center">
              <Icon name="location" size={16} padding={0} />
              <Text fos={14} fow="500" ml="$1" mr="$2">Your location</Text>
            </XStack>
            <Text fos={11} color="$gray11" mt="$1.5">No 67 Aremo Somolu street, Itire-Ijesha, Lagos</Text>
          </YStack>
          <Icon name="arrow_head_right" size={13} />
        </XStack>
        <HorizontalLine />
      </YStack>

      <YStack mt="$10" gap="$2">
        <XStack ai="center" jc="space-between">
          <Text type="h2">Your Tasks</Text>
          <Button size="sm" type="outlineGray" pill ai="center">
            <Text fow="600" fos={12}>Today</Text>
            <Icon name="dropdown" size={9} padding={0} />
          </Button>
        </XStack>

        <Tab tabs={taskTabs} />
      </YStack>
    </Container>
  )
}
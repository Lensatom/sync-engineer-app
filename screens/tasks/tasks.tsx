import { Container, Tab } from '@/components/layout'
import { StatusPill } from '@/components/shared'
import { Avatar, Button, HorizontalLine, Icon, Text, Toggle } from '@/components/ui'
import { PADDING_X, SCREEN_WIDTH } from '@/constants/theme'
import { useUser } from '@/layouts/rootLayout'
import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { View, XStack, YStack } from 'tamagui'
import { useGetTasks } from './api'
import { TaskCard } from './components'

export function Tasks() {
  const { user } = useUser();
  const image_uri = user?.email === "inuoluwadunsimi1@gmail.com"
    ? "https://www.shutterstock.com/image-photo/confident-young-african-american-business-600nw-2418465349.jpg"
    : ""
  const [isAvailable, setIsAvailable] = useState(true)

  const taskTabs = useMemo(() => [
    {
      title: "Active",
      name: "active",
      content: <TaskList status="ACTIVE" />
    },
    {
      title: "Assigned",
      name: "assigned",
      content: <TaskList status="ASSIGNED" />
    },
    {
      title: "Resolved",
      name: "resolved",
      content: <TaskList status="RESOLVED" />
    },
    {
      title: "Unresolved",
      name: "unresolved",
      content: <TaskList status="UNRESOLVED" />
    }
  ], [])

  return (
    <Container main canScroll={false} flex={1}>
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

interface TaskListProps {
  status: 'ACTIVE' | 'ASSIGNED' | 'RESOLVED' | 'UNRESOLVED' | 'REASSIGNED';
}

const TaskList = ({
  status
}: TaskListProps) => {
  const { tasks, isLoading } = useGetTasks({ status });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <YStack>
      <FlatList
        data={tasks || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskCard details={item} />}
        ListEmptyComponent={() => (
          <Text>No tasks available</Text>
        )}
        ItemSeparatorComponent={() => <View h={12} />}
        ListFooterComponent={() => <View h={600} />}
      />
    </YStack>
  )
}
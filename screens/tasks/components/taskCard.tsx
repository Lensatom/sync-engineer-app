import { StatusPill } from '@/components/shared';
import { Button, HorizontalLine, Icon, Text } from '@/components/ui';
import { completeStatus } from '@/constants/shared';
import { statusColors } from '@/constants/ui';
import { formatDate, openRouteTo } from '@/helpers/utils';
import { router } from 'expo-router';
import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View, XStack, YStack } from 'tamagui';

interface TaskDetailsType {
  id: string;
  taskTitle: string;
  createdAt: string;
  statusDetails: {
    status: string;
    updatedAt: string;
  }[];
}
interface TaskCardProps {
  details: TaskDetailsType;
}

export function TaskCard({
  details
}: TaskCardProps) {
  const lastStatus = details.statusDetails?.at(-1)?.status.toLowerCase();
  const percentComplete = completeStatus.includes(lastStatus ?? "") ? 100 : 100 / (4 - details.statusDetails.length)

  const location = "No 23 Awolowo street, Lekki";

  return (
    <YStack
      borderRadius="$6"
      borderWidth={1}
      borderColor='$gray3'
      bg='$gray1'
      onPress={() => router.push(`/tasks/${details.id}`)}
    >
      <XStack ai="center" p={"$3"}>
        <View bg="$gray2" w={50} h={50} jc="center" ai="center" overflow='visible' borderWidth={3} borderColor="$gray3" br="$full">
          <AnimatedCircularProgress
            size={54}
            width={4}
            fill={percentComplete}
            rotation={0}
            lineCap='round'
            tintColor={statusColors[lastStatus ?? ""]?.fg}
            backgroundColor="white"
          >
            {() => (
                <Icon name="wrench" size={16} padding={0} />
              )}
          </AnimatedCircularProgress>
        </View>
        <YStack ml="$3" gap="$0.5" flex={1}>
          <Text fos={10} color="$gray12" tt="uppercase">ZENITH BANK ATM #{details.id?.split("-")[1]}</Text>
          <XStack>
            <Text fos={12} fow="500" tt="capitalize">{details.taskTitle}</Text>
            <StatusPill status={lastStatus ?? ""} ml="$1.5" />
          </XStack>
          <XStack ai="center" gap="$1.5">
            <Text fos={10} color="$gray12">{formatDate(details.createdAt)}</Text>
            <View bg="$gray6" w={4} h={4} />
            <Text fos={10} color="$gray12">{location}</Text>
          </XStack>
        </YStack>
        <Icon name="arrow_head_right" size={13} />
      </XStack>

      <HorizontalLine />

      <XStack p="$3">
        <Button size="sm" type="outlineGray" w="40%" pill onPress={() => openRouteTo(location)}>
          <Text fos={12} fow="600">View Route</Text>
        </Button>
        <XStack w="60%" pl="$3">
          <Button size="sm" type="outlineGray" w="$full" pill>
            <Text fos={12} fow="600">Update ATM Status</Text>
          </Button>
        </XStack>
      </XStack>
    </YStack>
  )
}
import { StatusPill } from '@/components/shared';
import { Button, HorizontalLine, Icon, Text } from '@/components/ui';
import { statusColors } from '@/constants/ui';
import { router } from 'expo-router';
import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View, XStack, YStack } from 'tamagui';

interface TaskCardProps {
  details: string;
}

export function TaskCard({
  details
}: TaskCardProps) {
  return (
    <YStack
      borderRadius="$6"
      borderWidth={1}
      borderColor='$gray3'
      bg='$gray1'
      onPress={() => router.push("/tasks/123")}
    >
      <XStack ai="center" p={"$3"}>
        <View bg="$gray2" w={50} h={50} jc="center" ai="center" overflow='visible' borderWidth={3} borderColor="$gray3" br="$full">
          <AnimatedCircularProgress
            size={54}
            width={4}
            fill={33}
            rotation={0}
            lineCap='round'
            tintColor={statusColors['critical'].fg}
            backgroundColor="white"
            onAnimationComplete={() => console.log('onAnimationComplete')}
          >
            {() => (
                <Icon name="wrench" size={16} padding={0} />
              )}
          </AnimatedCircularProgress>
        </View>
        <YStack ml="$3" gap="$0.5" flex={1}>
          <Text fos={10} color="$gray12">ZENITH BANK ATM #978</Text>
          <XStack>
            <Text fos={12} fow="500">ATM Power Off</Text>
            <StatusPill status="critical" ml="$1.5" />
          </XStack>
          <XStack ai="center" gap="$1.5">
            <Text fos={10} color="$gray12">11am, Sep 23</Text>
            <View bg="$gray6" w={4} h={4} />
            <Text fos={10} color="$gray12">No 23 Awolowo street, Lekki</Text>
          </XStack>
        </YStack>
        <Icon name="arrow_head_right" size={13} />
      </XStack>

      <HorizontalLine />

      <XStack p="$3">
        <Button size="sm" type="outlineGray" w="40%" pill>
          <Text fos={12} fow="600">View Route</Text>
        </Button>
        <XStack w="60%" pl="$3">
          <Button size="sm" type="outlineGray" w="$full" pill>
            <Text fos={12} fow="600">Update ATM status</Text>
          </Button>
        </XStack>
      </XStack>
    </YStack>
  )
}
import { Container, Header } from '@/components/layout'
import { StatusPill } from '@/components/shared'
import { Button, HorizontalLine, Icon, Text } from '@/components/ui'
import { PADDING_X } from '@/constants/theme'
import { statusColors } from '@/constants/ui'
import React from 'react'
import { Image } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { View, XStack, YStack } from 'tamagui'
const ATM_Image = require('@/assets/images/atm-machine.png');

export function TaskDetails() {
  return (
    <>
      <Header
        title="Task Details"
        RightComp={() => {
          return (
            <Icon name="info" size={24} padding={8} />
          )
        }}
      />

      <Container main pt="$3">
        <XStack ai="center">
          <View bg="$gray2" w={50} h={50} jc="center" ai="center" overflow='visible' borderWidth={3} borderColor="$gray3" br="$full" ai="center" jc="center">
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
          <YStack ml="$2" gap="$0.5" flex={1}>
            <Text fos={10} color="$gray12">ZENITH BANK ATM #978</Text>
            <XStack>
              <Text fos={12} fow="500">ATM Power Off</Text>
              <StatusPill status="warning" ml="$1.5" />
            </XStack>
            <XStack ai="center">
              <Text fos={10} color="$gray12" mr="$1">No 23 Awolowo street, Lekki Phase 1, Lagos</Text>
              <Icon name="location" size={14} padding={0} />
            </XStack>
          </YStack>
        </XStack>
        
        <YStack mt="$8">
          <Text fos={14} fow="500" color="$gray12">Status Logs</Text>
          <YStack mt="$3">
            <XStack h="$4">
              <XStack bg="$gray2" br="$full" h="$2" w="$full">
              </XStack>
            </XStack>
            <YStack pos="absolute" top={0} w="$full">
              <XStack jc="space-between">
                <YStack w="32%" ai="flex-start">
                  <XStack h="$2" w="$full" bg="#FFC619" br="$full" ai="center" jc="flex-start" overflow='visible'>
                    <View w="$4" h="$4" borderWidth={3} bg="#FFC619" borderColor="$white" br="$full" elevationAndroid={2}></View>
                  </XStack>
                  <StatusPill status="warning" mt={13} />
                  <Text fos={10} color="$gray12" mt="$1.5">11:23AM, Sep 23</Text>
                </YStack>
                <YStack w="32%" ai="center">
                  <XStack h="$2" w="$full" bg="#F18401" br="$full" ai="center" jc="center" overflow='visible'>
                    <View w="$4" h="$4" borderWidth={3} bg="#F18401" borderColor="$white" br="$full" elevationAndroid={2}></View>
                  </XStack>
                  <StatusPill status="critical" mt={13} />
                  <Text fos={10} color="$gray12" mt="$1.5">11:23AM, Sep 23</Text>
                </YStack>
                <YStack w="32%" ai="flex-end">
                  <XStack h="$2" w="$full" bg="#FF0000" br="$full" ai="center" jc="flex-end" overflow='visible'>
                    <View w="$4" h="$4" borderWidth={3} bg="#FF0000" borderColor="$white" br="$full" elevationAndroid={2}></View>
                  </XStack>
                  <StatusPill status="degraded" mt={13} />
                  <Text fos={10} color="$gray12" mt="$1.5">11:23AM, Sep 23</Text>
                </YStack>
              </XStack>
            </YStack>
          </YStack>
        </YStack>

        <XStack mt={74} gap="$3">
          <YStack borderWidth={1.5} borderColor="$gray3" br="$2" flex={1}>
            <YStack p="$3">
              <XStack ai="center">
                <Icon name="power" size={12} padding={0} />
                <Text fos={12} ml="$1" color="$gray12">Power</Text>
              </XStack>
              <Text fos={10} fow="500" color="$access" mt="$1.5">ON</Text>
            </YStack>
            <HorizontalLine />
            <YStack p="$3">
              <XStack ai="center">
                <Icon name="network" size={12} padding={0} />
                <Text fos={12} ml="$1" color="$gray12">Network Connectivity</Text>
              </XStack>
              <Text fos={10} fow="500" color="$access" mt="$1.5">Online</Text>
            </YStack>
            <HorizontalLine />
            <YStack p="$3">
              <XStack ai="center">
                <Icon name="card" size={12} padding={0} />
                <Text fos={12} ml="$1" color="$gray12">Last Withdrawal Attempt</Text>
              </XStack>
              <Text fos={10} fow="500" color="$access" mt="$1.5">Successful</Text>
            </YStack>
          </YStack>
          <Image source={ATM_Image} style={{ width: 150, height: "100%", resizeMode: 'stretch' }} />
        </XStack>

        <XStack mt="$3" jc="space-between">
          <YStack p="$3.5" bg="$gray2" width="48.5%" br="$2">
            <Icon name="brain_purple" size={24} padding={0} />
            <Text fow="500" mt="$12" color="$gray12">AI Diagnosis Report</Text>
          </YStack>
          <YStack p="$3.5" bg="$gray2" width="48.5%" br="$2">
            <Icon name="clock_blue" size={24} padding={0} />
            <Text fow="500" mt="$12" color="$gray12">Issue and Fix History </Text>
          </YStack>
        </XStack>  
      </Container>

      <YStack gap="$3" px={PADDING_X} bg="$white" pb={50}>
        <Button pill>
          <Text color="$white" fow="600">Update ATM Status</Text>
        </Button>
        <Button type='outline' pill>
          <Text color="$main" fow="600">View Route</Text>
        </Button>
      </YStack>
    </>
  )
}
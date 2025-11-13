import { ATM_Image } from '@/assets/images'
import { Container, Header } from '@/components/layout'
import { StatusPill } from '@/components/shared'
import { Button, HorizontalLine, Icon, Text } from '@/components/ui'
import { completeStatus } from '@/constants/shared'
import { statusColors } from '@/constants/ui'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { View, XStack, YStack } from 'tamagui'
import { useGetTaskById } from './api'

export function TaskDetails() {
  const { id } = useLocalSearchParams()

  const { task, isLoading } = useGetTaskById({ id: id as string });

  const lastStatus = task?.statusDetails?.at(-1)?.status.toLowerCase();
  const percentComplete = completeStatus.includes(lastStatus ?? "") ? 100 : 100 / (4 - (task?.statusDetails.length ?? 0))
  const statusLog = task?.statusDetails || [];
  const [adaptedLog, setAdaptedLog] = useState<any>([[], 0])

  const makeArray = (len: number) => Array.from({ length: len });

  const getLogLength = () => {
    const length = statusLog.length;
    if (lastStatus === "reassigned") {
      return [makeArray(length), (100 / length) - 1];
    } else {
      return [makeArray(3), (100 / 3) - 1];
    }
  }

  useEffect(() => {
    if (task && !isLoading) {
      const [array, percent] = getLogLength();
      setAdaptedLog([array, percent]);
    }
  }, [task, isLoading])

  if (isLoading) {
    return (
      <Container main ai="center" jc="center">
        <ActivityIndicator size="large" color="gray" />
      </Container>
    );
  }
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
          <View bg="$gray2" w={50} h={50} jc="center" ai="center" overflow='visible' borderWidth={3} borderColor="$gray3" br="$full">
            <AnimatedCircularProgress
              size={54}
              width={4}
              fill={percentComplete}
              rotation={0}
              lineCap='round'
              tintColor={statusColors[lastStatus]?.fg}
              backgroundColor="white"
            >
              {() => (
                  <Icon name="wrench" size={16} padding={0} />
                )}
            </AnimatedCircularProgress>
          </View>
          <YStack ml="$2" gap="$0.5" flex={1}>
            <Text fos={10} color="$gray12">ZENITH BANK ATM #978</Text>
            <XStack>
              <Text fos={12} fow="500" tt="capitalize">{task?.taskTitle}</Text>
              <StatusPill status={lastStatus} ml="$1.5" />
            </XStack>
            <XStack ai="center">
              <Text fos={10} color="$gray12" mr="$1">No 23 Awolowo street, Lekki Phase 1, Lagos</Text>
              <Icon name="location" size={14} padding={0} />
            </XStack>
          </YStack>
        </XStack>
        
        <YStack mt="$8">
          <Text fos={14} fow="500" color="$gray12">Task Status</Text>
          <YStack mt="$3">
            <XStack h="$4">
              <XStack bg="$gray2" br="$full" h="$2" w="$full">
              </XStack>
            </XStack>
            
            <XStack jc="space-between" pos="absolute" top={0} w="$full">
              {adaptedLog[0].map((status:any, index:number) => {
                const pos = index + 1
                const isLast = statusLog[index]?.status.toLowerCase() === lastStatus
                return (
                  statusLog[index] && (
                    <YStack w={`${adaptedLog[1]}%`} ai={pos === 1 ? "flex-start" : pos === adaptedLog[0].length ? "flex-end" : "center"}>
                      <XStack h="$2" w="$full" bg={isLast ? statusColors[lastStatus]?.fg : "#E0E1E6"} br="$full" ai="center" jc={pos === 1 ? "flex-start" : pos === adaptedLog[0].length ? "flex-end" : "center"} overflow='visible'>
                        <View w="$4" h="$4" borderWidth={3} bg={isLast ? statusColors[lastStatus]?.fg : "#E0E1E6"} borderColor="$white" br="$full" elevationAndroid={2}></View>
                      </XStack>
                      <Text fos={11} fow="600" mt="$3" color="$gray12" tt="capitalize">{statusLog[index]?.status.toLowerCase()}</Text>
                      <Text fos={9} color="$gray12" mt="$1">11:23AM, Sep 23</Text>
                    </YStack>
                  )
                )
              })}
            </XStack>
            
            {lastStatus === "reassigned" || lastStatus === "unresolved" ? (
              <XStack mt={55} py="$2" px="$3" borderWidth={1} borderColor="$gray3" br="$2">
                <Icon name="info" size={20} padding={0} />
                <Text fos={11} pl="$2" pr="$10" lh={17}>This task has been reassigned to another engineer. Kindly stop all actions related to this task on the ATM</Text>
              </XStack>
            ) : lastStatus === "fixed" ? (
              <XStack mt={55} ai="center" py="$2" px="$3" borderWidth={1} borderColor="$gray3" br="$2">
                <Icon name="info" size={20} padding={0} />
                <Text fos={11} pl="$2" pr="$10" lh={17}>Thank you for fixing this issue</Text>
              </XStack>
            ) : (
              <XStack mt={55} jc="space-between">
                {lastStatus === "inprogress" ? (
                  <>
                    <Button w="49%" pill type="outlineGray">
                      <Text fow="600">Set as Unresolved</Text>
                    </Button>
                    <Button w="49%" pill type="dark">
                      <Text fow="600" color="$white">Set as Resolved</Text>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button w="49%" pill type="outlineGray">
                      <Text fow="600">View Route</Text>
                    </Button>
                    <Button w="49%" pill type="dark">
                      <Text fow="600" color="$white">Start Repair</Text>
                    </Button>
                  </>
                )}
              </XStack>
            )}
          </YStack>
        </YStack>

        <YStack mt={46}>
          <Text color="$gray12" fow="500">Diagnostics and Metrics</Text>
          
          <XStack gap="$3" mt="$3">
            <YStack borderWidth={1.5} borderColor="$gray3" br="$2" flex={1}>
              <YStack p="$3" ai="flex-start">
                <XStack ai="center">
                  <Icon name="health" size={12} padding={0} />
                  <Text fos={12} ml="$1" color="$gray12">ATM Health</Text>
                </XStack>
                <StatusPill status="running" mt="$1.5" />
              </YStack>
              <HorizontalLine />
              <YStack p="$3">
                <XStack ai="center">
                  <Icon name="network" size={12} padding={0} />
                  <Text fos={12} ml="$1" color="$gray12">Cash Dispenser</Text>
                </XStack>
                <Text fos={12} fow="500" color="$access" mt="$1.5">Functional</Text>
              </YStack>
              <HorizontalLine />
              <XStack>
                <YStack p="$3" borderRightWidth={1} borderColor="$gray3" w="49%">
                  <XStack ai="center">
                    <Icon name="power" size={12} padding={0} />
                    <Text fos={12} ml="$1" color="$gray12">Power</Text>
                  </XStack>
                  <Text fos={12} fow="500" color="$access" mt="$1.5">ON</Text>
                </YStack>
                <YStack p="$3">
                  <XStack ai="center">
                    <Icon name="hourglass" size={12} padding={0} />
                    <Text fos={12} ml="$1" color="$gray12">Uptime</Text>
                  </XStack>
                  <Text fos={12} fow="500" mt="$1.5">23h</Text>
                </YStack>
              </XStack>
            </YStack>
            <ATM_Image />
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
        </YStack>
      </Container>
    </>
  )
}
import { Container, Header } from '@/components/layout';
import { Text } from '@/components/ui';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, XStack, YStack } from 'tamagui';
import { useGetIssueHistory } from './api';

type HistoryItem = {
  id: string;
  timestamp: string; // ISO
  titleBold: string; // e.g. "Task 124-012"
  description: string; // e.g. "assigned to Engr Tope Martins"
};

function formatTimeDate(input: string) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  const time = d
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(' ', ''); // "11:23AM"
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); // "17 Sep 2025"
  return `${time}, ${date}`;
}

const SAMPLE: HistoryItem[] = [
  { id: '1', timestamp: '2025-09-17T11:23:00.000Z', titleBold: 'Task 124-012', description: 'assigned to Engr Tope Martins' },
  { id: '2', timestamp: '2025-09-17T11:23:00.000Z', titleBold: 'Task 124-012', description: 'resolved by Engr Tope Martins' },
  { id: '3', timestamp: '2025-09-17T11:23:00.000Z', titleBold: 'Task 124-012', description: 'resolved by Engr Tope Martins' },
  { id: '4', timestamp: '2025-09-17T11:23:00.000Z', titleBold: 'Task 124-012', description: 'resolved by Engr Tope Martins' },
];

export function IssueHistory() {
  const items = SAMPLE;

  const { atmId } = useLocalSearchParams()

  console.log(atmId)

  const { history, isLoading } = useGetIssueHistory({ id: atmId as string });

  console.log(history)

  if (isLoading) {
    return (
      <Container main ai="center" jc="center">
        <Text>Loading...</Text>
      </Container>
    );
  }
  return (
    <>
      <Header title="Issue and Fix History" /> 
      <Container main bg="white" pt="$4">
        <YStack gap="$6">
          {history.map((it, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === history.length - 1;
            const activeColor = '#D43900';
            const inactiveColor = '#D9D9D9';

            return (
              <XStack key={it.id} gap="$3">
                {/* Timeline rail */}
                <YStack w={20} ai="center">
                  {/* top connector */}
                  <View
                    style={{
                      width: 0,
                      height: isFirst ? 0 : 1,
                      borderLeftWidth: 2,
                      borderColor: isFirst ? activeColor : '#E5E7EB',
                      borderStyle: 'dashed',
                    }}
                  />
                  {/* dot */}
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      backgroundColor: isFirst ? activeColor : 'white',
                      borderWidth: 2,
                      borderColor: isFirst ? activeColor : inactiveColor,
                    }}
                  />
                  {/* bottom connector */}
                  {!isLast && (
                    <View
                      style={{
                        width: 0,
                        height: 40,
                        borderLeftWidth: 2,
                        borderColor: isFirst ? activeColor : '#E5E7EB',
                        borderStyle: 'dashed',
                      }}
                    />
                  )}
                </YStack>

                {/* Content */}
                <YStack flex={1} gap="$1">
                  <Text fos={12} color="$gray11">{formatTimeDate(it.updatedAt)}</Text>
                  <Text fos={14} color="$gray12">
                    <Text fos={14} fow="700" color="$gray12" tt="capitalize">{it.taskTitle}</Text>{' '}{it.issueDescription}
                  </Text>
                </YStack>
              </XStack>
            );
          })}
        </YStack>
        <View h={100} />
      </Container>
    </>
  );
}
import { Container, Header } from '@/components/layout';
import { Icon, Text } from '@/components/ui';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { XStack, YStack } from 'tamagui';
import { useGetDiagnosisReport } from './api';

export function DiagnosisReport() {

  const { id } = useLocalSearchParams();
  const { report, isLoading } = useGetDiagnosisReport({ id: id as string });

  if (isLoading) return (
    <Container main ai="center" jc="center">
      <Text>Loading...</Text>
    </Container>
  )
  return (
    <>
      <Header title="AI Diagnosis Report" />
      <Container main>
        <YStack bg="#FFEBE4" br="$3" p="$3" mt="$3">
          <XStack ai="center" gap="$2">
            <Icon size={24} padding={0} name="info_warn" />
            <Text fos="$4" fow="600" color="$gray13">Probable Issues</Text>
          </XStack>
          <Text mt="$2" p="$2" bg="#FFF7F5" br="$3">{report?.probableIssues}</Text>
        </YStack>

        <YStack bg="#E4FFF6" br="$3" p="$3" mt="$6">
          <XStack ai="center" gap="$2">
            <Icon size={24} padding={0} name="wrench_green" />
            <Text fos="$4" fow="600" color="$gray13">AI Recommended Actions</Text>
          </XStack>
          <Text mt="$2" p="$2" bg="#F5FFFC" br="$3">{report?.fixRecommendations}</Text>
        </YStack>
      </Container>
    </>
  )
}
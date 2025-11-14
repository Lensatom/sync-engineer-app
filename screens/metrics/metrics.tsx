import { Container, Header } from '@/components/layout';
import { Avatar, Text } from '@/components/ui';
import { getEfficiencyScore } from '@/helpers/utils';
import { useUser } from '@/layouts/rootLayout';
import React from 'react';

export function Metrics() {
  const { user } = useUser();
    const image_uri = user?.email === "inuoluwadunsimi1@gmail.com"
      ? "https://www.shutterstock.com/image-photo/confident-young-african-american-business-600nw-2418465349.jpg"
      : ""

  return (
    <>
      <Header title="Metrics" withBackButton={false} />
      <Container main ai="center" jc="center">
        <Avatar uri={image_uri} size={98} />
        <Text fos="$6" mt="$3">{user?.firstName} {user?.lastName}</Text>
        <Text>{user?.email}</Text>
        <Text bg="#03FF771F" color="#138041" br="$full" px="$3" py="$1" mt="$2">Efficiency Score: {getEfficiencyScore(user?.email || '')}%</Text>
      </Container>
    </>
  )
}
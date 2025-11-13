import { useLogin } from '@/api/auth'
import { Container } from '@/components/layout'
import { Icon, Text } from '@/components/ui'
import { setAccessToken } from '@/helpers/api'
import { useUser } from '@/layouts/rootLayout'
import { router } from 'expo-router'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { View, YStack } from 'tamagui'

export function Login() {
  const engineers = [
    "inuoluwadunsimi1@gmail.com",
    "desiredestiny04@gmail.com"
  ]

  const { login, isPending } = useLogin()
  const { setUser } = useUser()

  const handleLogin = async (email: string) => {
    try {
      const res = await login({ email });
      // @ts-ignore
      const data = res?.data
      setAccessToken(data?.token);
      setUser(data?.user);
      router.replace("/")
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <Container ai="center" jc="center">
      <Icon name="wrench" size={70} />
      <YStack mt="$6" w="$full">
        {engineers.map((email) => (
          <View onPress={() => handleLogin(email)} key={email} ai="center" py="$3" bg="$main" w="$full" mt="$4">
            {isPending ? <ActivityIndicator /> : <Text fos={14} color="$white" fow="600">{email}</Text>}
          </View>
        ))}
      </YStack>
    </Container>
  )
}
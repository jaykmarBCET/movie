import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'



export default function RootLayout() {
  return (
    <>
      
      <StatusBar style="light" backgroundColor="black" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

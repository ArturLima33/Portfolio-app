import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0f0f0f",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#0f0f0f",
          },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Portfólio", headerShown: false }}
        />
        <Stack.Screen
          name="sobre"
          options={{ title: "Sobre" }}
        />
        <Stack.Screen
          name="academica"
          options={{ title: "Experiência Acadêmica" }}
        />
        <Stack.Screen
          name="profissional"
          options={{ title: "Experiência Profissional" }}
        />
        <Stack.Screen
          name="projetos"
          options={{ title: "Projetos" }}
        />
        <Stack.Screen
          name="jogo"
          options={{ title: "Jogo" }}
        />
      </Stack>
    </>
  );
}

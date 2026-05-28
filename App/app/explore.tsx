import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projetos e Tecnologias</Text>
      <Text style={styles.subtitle}>
        Aqui você encontra o que utilizei:
      </Text>
      <View style={styles.list}>
        <Text>• React Native</Text>
        <Text>• Expo Router</Text>
        <Text>• Reanimated</Text>
        <Text>• AsyncStorage</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff' 
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 10 },
  list: { alignItems: 'flex-start' }
});
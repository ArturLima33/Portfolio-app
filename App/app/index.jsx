import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const menus = [
    { title: "Sobre", icon: "person", route: "/sobre" },
    { title: "Experiência Acadêmica", icon: "school", route: "/academica" },
    { title: "Experiência Profissional", icon: "work", route: "/profissional" },
    { title: "Projetos", icon: "code", route: "/projetos" },
    { title: "Jogo", icon: "games", route: "/jogo" },
  ];

  return (
    <LinearGradient
      colors={["#0f0f0f", "#1a1a2e", "#16213e"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(800)} style={styles.header}>
          <Image
            source={require("../assets/images/eu.png")}
            style={styles.avatar}
          />

          <Text style={styles.name}>Artur Bacalhau</Text>
          <Text style={styles.subtitle}>Desenvolvedor • React Native • Expo</Text>

          {/* Localização e faculdade */}
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={15} color="#4facfe" />
            <Text style={styles.infoText}>Recife - PE, Brasil</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={15} color="#4facfe" />
            <Text style={styles.infoText}>UNICAP • Ciência da Computação • 5º período</Text>
          </View>

          <Text style={styles.description}>
            Portfólio desenvolvido para apresentar projetos, experiências e
            tecnologias utilizadas durante minha jornada acadêmica.
          </Text>
        </Animated.View>

        <View style={styles.cardsContainer}>
          {menus.map((item, index) => (
            <Animated.View key={index} entering={FadeInDown.delay(index * 150)}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.card}
                onPress={() => router.push(item.route)}
              >
                <MaterialIcons name={item.icon} size={32} color="#4facfe" />
                <Text style={styles.cardText}>{item.title}</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color="#4facfe"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>React Native + Expo Router</Text>
          <Text style={styles.footerVersion}>Versão 1.0</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 70, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 40 },
  avatar: {
    width: 140, height: 140, borderRadius: 70, marginBottom: 20,
    borderWidth: 4, borderColor: "#4facfe",
    shadowColor: "#4facfe", shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 20, elevation: 10,
  },
  name: { color: "#fff", fontSize: 34, fontWeight: "bold" },
  subtitle: { color: "#b0b0b0", fontSize: 16, marginTop: 8 },
  infoRow: {
    flexDirection: "row", alignItems: "center",
    marginTop: 10, gap: 6,
  },
  infoText: { color: "#cfcfcf", fontSize: 14 },
  description: {
    color: "#d0d0d0", textAlign: "center", fontSize: 15,
    lineHeight: 24, marginTop: 18, paddingHorizontal: 10,
  },
  cardsContainer: { gap: 18 },
  card: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 24, padding: 25,
    flexDirection: "row", alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 8,
  },
  cardText: { color: "#fff", fontSize: 20, marginLeft: 20, fontWeight: "600" },
  footer: { marginTop: 40, alignItems: "center" },
  footerText: { color: "#4facfe", fontSize: 16, fontWeight: "600" },
  footerVersion: { color: "#888", marginTop: 5 },
});

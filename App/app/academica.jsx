import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Academico() {
  const materias = [
    {
      icon: "computer", title: "Programação",
      subtitle: "Desenvolvimento de lógica computacional, algoritmos, estruturas de repetição e criação de aplicações modernas.",
      color: "#4facfe",
    },
    {
      icon: "dns", title: "Banco de Dados",
      subtitle: "Modelagem relacional, comandos SQL, consultas, organização e gerenciamento eficiente de informações.",
      color: "#00e676",
    },
    {
      icon: "devices", title: "Desenvolvimento Web & Mobile",
      subtitle: "Criação de aplicações web e mobile modernas com React Native, Expo, interfaces responsivas e foco em experiência do usuário.",
      color: "#ff9800",
    },
    {
      icon: "router", title: "Redes de Computadores",
      subtitle: "Estudo de protocolos, roteamento IP, infraestrutura de redes e comunicação entre dispositivos.",
      color: "#ff4d6d",
    },
    {
      icon: "games", title: "Computação Gráfica",
      subtitle: "Renderização gráfica, algoritmos 2D/3D, transformações geométricas e conceitos visuais computacionais.",
      color: "#b388ff",
    },
    {
      icon: "storage", title: "Estrutura de Dados",
      subtitle: "Manipulação de listas, filas, pilhas, árvores e otimização de algoritmos e processamento.",
      color: "#00bcd4",
    },
    {
      icon: "api", title: "APIs e Integrações",
      subtitle: "Consumo de APIs, comunicação entre sistemas e integração de aplicações modernas.",
      color: "#ffd54f",
    },
  ];

  return (
    <LinearGradient colors={["#0f0f0f", "#1a1a2e", "#16213e"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Animated.Text entering={FadeInDown.duration(700)} style={styles.title}>
          Experiência Acadêmica
        </Animated.Text>

        <Animated.Text entering={FadeInDown.delay(200)} style={styles.description}>
          Conhecimentos desenvolvidos ao longo da graduação em Ciência da Computação,
          explorando programação, redes, desenvolvimento de software e tecnologias modernas.
        </Animated.Text>

        {/* Card da instituição */}
        <Animated.View entering={FadeInDown.delay(250)} style={styles.institutionCard}>
          <View style={styles.institutionIconContainer}>
            <FontAwesome5 name="graduation-cap" size={28} color="#4facfe" />
          </View>
          <View style={styles.institutionInfo}>
            <Text style={styles.institutionName}>Universidade Católica de Pernambuco</Text>
            <Text style={styles.institutionCourse}>Ciência da Computação</Text>
            <View style={styles.institutionBadge}>
              <Text style={styles.institutionBadgeText}>5º Período • Em andamento</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.timeline}>
          {materias.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 150 + 300)}
              style={styles.card}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}25` }]}>
                <MaterialIcons name={item.icon} size={30} color={item.color} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { color: "#fff", fontSize: 34, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  description: { color: "#cfcfcf", fontSize: 16, lineHeight: 26, marginBottom: 25 },

  institutionCard: {
    flexDirection: "row",
    backgroundColor: "rgba(79,172,254,0.10)",
    borderRadius: 24, padding: 22, marginBottom: 28,
    borderWidth: 1, borderColor: "rgba(79,172,254,0.25)",
    alignItems: "center",
  },
  institutionIconContainer: {
    width: 60, height: 60, borderRadius: 18,
    backgroundColor: "rgba(79,172,254,0.15)",
    justifyContent: "center", alignItems: "center", marginRight: 18,
  },
  institutionInfo: { flex: 1 },
  institutionName: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  institutionCourse: { color: "#4facfe", fontSize: 14, marginBottom: 8 },
  institutionBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(79,172,254,0.15)",
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 12, borderWidth: 1,
    borderColor: "rgba(79,172,254,0.3)",
  },
  institutionBadgeText: { color: "#4facfe", fontSize: 12, fontWeight: "600" },

  timeline: { gap: 18 },
  card: {
    flexDirection: "row", backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 24, padding: 22,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  iconContainer: {
    width: 65, height: 65, borderRadius: 20,
    justifyContent: "center", alignItems: "center", marginRight: 18,
  },
  cardContent: { flex: 1, justifyContent: "center" },
  cardTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  cardSubtitle: { color: "#cfcfcf", fontSize: 15, lineHeight: 24 },
});

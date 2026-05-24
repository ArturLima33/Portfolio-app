import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import {
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function Projetos() {

  const projects = [

    {
      icon: "smartphone",
      title: "Portfólio Mobile",

      subtitle:
        "Aplicação desenvolvida em React Native + Expo com navegação moderna, animações e design responsivo.",

      tech: "React Native • Expo • Expo Router",

      color: "#4facfe",
    },

    {
      icon: "language",
      title: "Website Responsivo",

      subtitle:
        "Criação de interfaces web modernas focadas em experiência do usuário, responsividade e design visual.",

      tech: "HTML • CSS • JavaScript",

      color: "#00e676",
    },

    {
      icon: "router",
      title: "Projeto de Redes",

      subtitle:
        "Simulação de redes utilizando roteamento IP, configuração de dispositivos e comunicação entre hosts.",

      tech: "Mininet • Redes • Linux",

      color: "#ff9800",
    },

    {
      icon: "games",
      title: "Jogo Interativo",

      subtitle:
        "Desenvolvimento de jogo integrado ao aplicativo utilizando lógica, interação e elementos gráficos.",

      tech: "JavaScript • Lógica • Game Dev",

      color: "#ff4d6d",
    },

    {
      icon: "storage",
      title: "Sistema de Dados",

      subtitle:
        "Projeto voltado para organização e gerenciamento de informações utilizando conceitos de banco de dados.",

      tech: "SQL • Modelagem • Estruturas",

      color: "#b388ff",
    },
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

        <Animated.Text
          entering={FadeInDown.duration(700)}
          style={styles.title}
        >
          Projetos
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200)}
          style={styles.description}
        >
          Alguns projetos desenvolvidos durante
          minha trajetória acadêmica e estudos
          na área de tecnologia.
        </Animated.Text>

        <View style={styles.projectsContainer}>

          {projects.map((item, index) => (

            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 150)}
              style={styles.card}
            >

              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: `${item.color}25`,
                  },
                ]}
              >

                <MaterialIcons
                  name={item.icon}
                  size={30}
                  color={item.color}
                />

              </View>

              <View style={styles.cardContent}>

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardSubtitle}>
                  {item.subtitle}
                </Text>

                <View style={styles.techBadge}>

                  <Text style={styles.techText}>
                    {item.tech}
                  </Text>

                </View>

              </View>

            </Animated.View>

          ))}

        </View>

        <Animated.View
          entering={FadeInDown.delay(1000)}
          style={styles.footerCard}
        >

          <FontAwesome5
            name="laptop-code"
            size={32}
            color="#4facfe"
          />

          <Text style={styles.footerTitle}>
            Desenvolvimento de Projetos
          </Text>

          <Text style={styles.footerText}>
            Projetos focados em desenvolvimento de interfaces modernas,
            lógica de programação e soluções
            tecnológicas criativas.
          </Text>

        </Animated.View>

      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    color: "#fff",

    fontSize: 34,

    fontWeight: "bold",

    marginTop: 20,

    marginBottom: 10,
  },

  description: {
    color: "#cfcfcf",

    fontSize: 16,

    lineHeight: 26,

    marginBottom: 35,
  },

  projectsContainer: {
    gap: 18,
  },

  card: {

    flexDirection: "row",

    backgroundColor: "rgba(255,255,255,0.08)",

    borderRadius: 24,

    padding: 22,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.12)",
  },

  iconContainer: {

    width: 65,

    height: 65,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 18,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: "#fff",

    fontSize: 20,

    fontWeight: "bold",

    marginBottom: 8,
  },

  cardSubtitle: {
    color: "#cfcfcf",

    fontSize: 15,

    lineHeight: 24,

    marginBottom: 14,
  },

  techBadge: {

    alignSelf: "flex-start",

    backgroundColor: "rgba(79,172,254,0.15)",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 16,

    borderWidth: 1,

    borderColor: "rgba(79,172,254,0.25)",
  },

  techText: {
    color: "#fff",

    fontSize: 13,

    fontWeight: "600",
  },

  footerCard: {

    marginTop: 35,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderRadius: 28,

    padding: 28,

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.12)",
  },

  footerTitle: {
    color: "#fff",

    fontSize: 24,

    fontWeight: "bold",

    marginTop: 18,

    marginBottom: 12,

    textAlign: "center",
  },

  footerText: {
    color: "#cfcfcf",

    fontSize: 15,

    lineHeight: 26,

    textAlign: "center",
  },
});
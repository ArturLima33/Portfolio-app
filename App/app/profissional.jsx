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

export default function Profissional() {

  const experiences = [

    {
      icon: "code",
      title: "Projetos Acadêmicos",

      subtitle:
            "Participação no desenvolvimento de sistemas, interfaces interativas e aplicações voltadas para desafios acadêmicos e tecnológicos.",

      color: "#4facfe",
    },

    {
      icon: "devices",
      title: "Desenvolvimento Mobile",

      subtitle:
        "Criação de aplicações mobile modernas utilizando React Native, Expo e componentes interativos.",

      color: "#ff9800",
    },

    {
      icon: "language",
      title: "Desenvolvimento Web",

      subtitle:
        "Experiência com criação de interfaces web modernas, responsivas e focadas em experiência do usuário.",

      color: "#00e676",
    },

    {

      icon: "groups",
      title: "Trabalho em Equipe",

      subtitle:
        "Participação em atividades acadêmicas colaborativas envolvendo desenvolvimento e resolução de problemas.",

      color: "#ff4d6d",
    },

    {
      icon: "rocket-launch",
      title: "Aprendizado Contínuo",

      subtitle:
        "Estudo constante de novas tecnologias, desenvolvimento de software e tendências do mercado de tecnologia.",

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
          Experiência Profissional
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200)}
          style={styles.description}
        >
          Experiências desenvolvidas através
          de projetos acadêmicos, estudos,
          desenvolvimento de aplicações e
          aprendizado contínuo em tecnologia.
        </Animated.Text>

        <View style={styles.timeline}>

          {experiences.map((item, index) => (

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

              </View>

            </Animated.View>

          ))}

        </View>

        <Animated.View
          entering={FadeInDown.delay(1000)}
          style={styles.footerCard}
        >

          <FontAwesome5
            name="briefcase"
            size={32}
            color="#4facfe"
          />

          <Text style={styles.footerTitle}>
            Em Desenvolvimento Profissional
          </Text>

          <Text style={styles.footerText}>
            Atualmente focado no aprimoramento
            das habilidades em desenvolvimento de software e tecnologias modernas,
            buscando crescimento profissional e
            novas oportunidades na área de tecnologia.
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

  timeline: {
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
    justifyContent: "center",
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
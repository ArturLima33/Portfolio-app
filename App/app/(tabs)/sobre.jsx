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

export default function Sobre() {

  const cards = [

    {
      icon: "school",
      title: "Formação",

      text:
        "Estudante de Ciência da Computação apaixonado por tecnologia, desenvolvimento de software, aplicações mobile e soluções computacionais modernas.",
    },

    {
      icon: "code",
      title: "Desenvolvimento",

      text:
        "Experiência com React Native, JavaScript, APIs e criação de aplicações modernas e interativas.",
    },

    {
      icon: "rocket-launch",
      title: "Objetivo",

      text:
        "Buscar crescimento profissional na área de tecnologia desenvolvendo projetos modernos, criativos e funcionais.",
    },
  ];

  const interests = [
    "📱 Web e Mobile",
    "⚙️ Full Stack",
    "🧠 Inteligência Artificial",
    "🗄️ Banco de Dados",
    "📡 APIs",
    "🎮 Jogos",
    "🤖 Automação",
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
          Sobre Mim
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200)}
          style={styles.description}
        >
          Desenvolvedor apaixonado por tecnologia,
          programação e soluções criativas.
        </Animated.Text>

        <View style={styles.cardsContainer}>

          {cards.map((item, index) => (

            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 150)}
              style={styles.card}
            >

              <View style={styles.iconContainer}>

                <MaterialIcons
                  name={item.icon}
                  size={30}
                  color="#4facfe"
                />

              </View>

              <View style={styles.cardContent}>

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardText}>
                  {item.text}
                </Text>

              </View>

            </Animated.View>

          ))}

        </View>

        <Animated.View
          entering={FadeInDown.delay(600)}
          style={styles.techCard}
        >

          <View style={styles.techHeader}>

            <View style={styles.techIconContainer}>

              <MaterialIcons
                name="memory"
                size={30}
                color="#4facfe"
              />

            </View>

            <Text style={styles.techTitle}>
              Tecnologias Utilizadas
            </Text>

          </View>

          <View style={styles.techs}>

            <View style={styles.tech}>
              <FontAwesome5
                name="react"
                size={22}
                color="#61dafb"
              />

              <Text style={styles.techText}>
                React Native
              </Text>
            </View>

            <View style={styles.tech}>
              <FontAwesome5
                name="js"
                size={22}
                color="#f7df1e"
              />

              <Text style={styles.techText}>
                JavaScript
              </Text>
            </View>

            <View style={styles.tech}>
              <MaterialIcons
                name="smartphone"
                size={22}
                color="#4facfe"
              />

              <Text style={styles.techText}>
                Expo Go
              </Text>
            </View>

          </View>

        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(800)}
          style={styles.interestCard}
        >

          <Text style={styles.interestTitle}>
            Áreas de Interesse
          </Text>

          <View style={styles.interestsContainer}>

            {interests.map((item, index) => (

              <View
                key={index}
                style={styles.interestChip}
              >

                <Text style={styles.interestText}>
                  {item}
                </Text>

              </View>

            ))}

          </View>

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

    marginBottom: 10,

    marginTop: 20,
  },

  description: {
    color: "#cfcfcf",

    fontSize: 16,

    lineHeight: 26,

    marginBottom: 35,
  },

  cardsContainer: {
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

    width: 60,

    height: 60,

    borderRadius: 18,

    backgroundColor: "rgba(79,172,254,0.15)",

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

  cardText: {
    color: "#cfcfcf",

    fontSize: 15,

    lineHeight: 24,
  },

  techCard: {

    marginTop: 35,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderRadius: 24,

    padding: 22,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.12)",
  },

  techHeader: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 20,
  },

  techIconContainer: {

    width: 60,

    height: 60,

    borderRadius: 18,

    backgroundColor: "rgba(79,172,254,0.15)",

    justifyContent: "center",

    alignItems: "center",
  },

  techTitle: {
    color: "#fff",

    fontSize: 22,

    fontWeight: "bold",

    marginLeft: 14,
  },

  techs: {
    gap: 16,
  },

  tech: {

    flexDirection: "row",

    alignItems: "center",
  },

  techText: {
    color: "#fff",

    fontSize: 16,

    marginLeft: 14,
  },

  interestCard: {

    marginTop: 35,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderRadius: 24,

    padding: 22,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.12)",
  },

  interestTitle: {
    color: "#fff",

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 20,
  },

  interestsContainer: {

    flexDirection: "row",

    flexWrap: "wrap",

    gap: 12,
  },

  interestChip: {

    backgroundColor: "rgba(79,172,254,0.15)",

    paddingHorizontal: 18,

    paddingVertical: 10,

    borderRadius: 20,

    borderWidth: 1,

    borderColor: "rgba(79,172,254,0.25)",
  },

  interestText: {
    color: "#fff",

    fontSize: 15,

    fontWeight: "600",
  },
});
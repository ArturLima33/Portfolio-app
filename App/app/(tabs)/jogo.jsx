import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { FontAwesome5 } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BOARD_WIDTH = 380;
const BOARD_HEIGHT = 460;
const CELL_SIZE = 20;

const COLS = Math.floor(BOARD_WIDTH / CELL_SIZE);
const ROWS = Math.floor(BOARD_HEIGHT / CELL_SIZE);

const SKINS_LIST = [
  { id: "Neon", name: "Classic Neon", body: "#007AFF", head: "#00F0FF", price: 0 },
  { id: "Lava", name: "Magma Ativo", body: "#ff4500", head: "#ffcc00", price: 15 },
  { id: "Matrix", name: "Digital Grid", body: "#00ff33", head: "#ffffff", price: 30 },
  { id: "Vaporwave", name: "Vaporwave 80s", body: "#ff007f", head: "#00ffff", price: 50 },
  { id: "Glitch", name: "Cyber Glitch", body: "#7b00ff", head: "#00ffaa", price: 75 },
  { id: "Ice", name: "Zero Absoluto", body: "#00d2ff", head: "#ffffff", price: 100 },
  { id: "Gold", name: "Golden Snake", body: "#facc15", head: "#fff7ae", price: 120 },
  { id: "Shadow", name: "Shadow Core", body: "#111827", head: "#6b7280", price: 140 },
  { id: "Candy", name: "Candy Pop", body: "#ff66c4", head: "#ffd6ec", price: 160 },
  { id: "Ocean", name: "Ocean Deep", body: "#2563eb", head: "#7dd3fc", price: 180 },
  { id: "Toxic", name: "Toxic Slime", body: "#84cc16", head: "#d9f99d", price: 200 },
  { id: "Ruby", name: "Ruby Fire", body: "#dc2626", head: "#fca5a5", price: 220 },
  { id: "Galaxy", name: "Galaxy Warp", body: "#4c1d95", head: "#c4b5fd", price: 240 },
  { id: "CyberRed", name: "Cyber Red", body: "#b91c1c", head: "#f87171", price: 260 },
  { id: "Mint", name: "Mint Shock", body: "#10b981", head: "#a7f3d0", price: 280 },
  { id: "Sunset", name: "Sunset Drive", body: "#fb7185", head: "#fdba74", price: 300 },
  { id: "Inferno", name: "Inferno X", body: "#ff3b30", head: "#ffd60a", price: 320 },
  { id: "Crystal", name: "Crystal Sky", body: "#67e8f9", head: "#ecfeff", price: 340 },
  { id: "Storm", name: "Thunder Storm", body: "#475569", head: "#cbd5e1", price: 360 },
  { id: "Emerald", name: "Emerald Core", body: "#22c55e", head: "#bbf7d0", price: 380 },
  { id: "Night", name: "Night Hunter", body: "#020617", head: "#38bdf8", price: 400 },
  { id: "Blood", name: "Blood Venom", body: "#991b1b", head: "#fca5a5", price: 420 },
  { id: "Aura", name: "Purple Aura", body: "#9333ea", head: "#e9d5ff", price: 440 },
  { id: "Cloud", name: "Cloud Byte", body: "#94a3b8", head: "#f8fafc", price: 460 },
  { id: "Radioactive", name: "Radioactive", body: "#65a30d", head: "#d9f99d", price: 480 },
  { id: "DarkBlue", name: "Dark Blue", body: "#1d4ed8", head: "#93c5fd", price: 500 },
];

const POWERUPS_POOL = [
  {
    id: "magnet",
    title: "🧲 Super Ímã",
    desc: "Dobra pontos.",
    rarity: "Comum",
    color: "#86efac",
    chance: 0.22,
  },
  {
    id: "freeze",
    title: "❄️ Freeze",
    desc: "Congela inimigos.",
    rarity: "Raro",
    color: "#93c5fd",
    chance: 0.16,
  },
  {
    id: "shield",
    title: "🛡️ Escudo",
    desc: "Bloqueia uma morte.",
    rarity: "Épico",
    color: "#c084fc",
    chance: 0.12,
  },
  {
    id: "clear",
    title: "💥 Limpeza",
    desc: "Remove traps.",
    rarity: "Lendário",
    color: "#fde047",
    chance: 0.04,
  },
  {
    id: "ghost",
    title: "👻 Fantasma",
    desc: "Atravessa inimigos.",
    rarity: "Épico",
    color: "#f9a8d4",
    chance: 0.1,
  },
  {
    id: "slow",
    title: "🐢 Slow Motion",
    desc: "Diminui velocidade.",
    rarity: "Raro",
    color: "#fdba74",
    chance: 0.12,
  },
  {
    id: "doublefood",
    title: "🍎 Food Rush",
    desc: "Mais comidas.",
    rarity: "Comum",
    color: "#bef264",
    chance: 0.14,
  },
  {
    id: "tiny",
    title: "📏 Mini Snake",
    desc: "Reduz tamanho.",
    rarity: "Raro",
    color: "#ddd6fe",
    chance: 0.1,
  },
];

export default function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [foods, setFoods] = useState([]);
  const [traps, setTraps] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [unlockedSkins, setUnlockedSkins] = useState(["Neon"]);
  const [skin, setSkin] = useState("Neon");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(180);
  const [wave, setWave] = useState(1);
  const [deathCause, setDeathCause] = useState("");
  const [showUpgradeMenu, setShowUpgradeMenu] = useState(false);
  const [availableUpgrades, setAvailableUpgrades] = useState([]);
  const [activePowerup, setActivePowerup] = useState(null);

  const directionRef = useRef("RIGHT");
  directionRef.current = direction;

  const foodGlow = useSharedValue(1);

  useEffect(() => {
    foodGlow.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 350 }),
        withTiming(1, { duration: 350 })
      ),
      -1,
      true
    );
  }, []);

  const foodAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: foodGlow.value }],
  }));

  const currentSkin =
    SKINS_LIST.find((s) => s.id === skin) || SKINS_LIST[0];

  useEffect(() => {
    loadGameData();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key === "ArrowUp" && directionRef.current !== "DOWN") {
        setDirection("UP");
      }

      if (key === "ArrowDown" && directionRef.current !== "UP") {
        setDirection("DOWN");
      }

      if (key === "ArrowLeft" && directionRef.current !== "RIGHT") {
        setDirection("LEFT");
      }

      if (key === "ArrowRight" && directionRef.current !== "LEFT") {
        setDirection("RIGHT");
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);

  const loadGameData = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem("@snake_highScore");
      const savedTotalPoints = await AsyncStorage.getItem("@snake_totalPoints");
      const savedSkins = await AsyncStorage.getItem("@snake_unlockedSkins");
      const savedCurrentSkin = await AsyncStorage.getItem("@snake_currentSkin");

      if (savedHighScore) setHighScore(parseInt(savedHighScore));
      if (savedTotalPoints) setTotalPoints(parseInt(savedTotalPoints));
      if (savedSkins) setUnlockedSkins(JSON.parse(savedSkins));
      if (savedCurrentSkin) setSkin(savedCurrentSkin);
    } catch (e) {}
  };

  const saveGameData = async (
    newHigh,
    newTotal,
    newSkins,
    newSkin
  ) => {
    try {
      if (newHigh !== undefined) {
        await AsyncStorage.setItem("@snake_highScore", newHigh.toString());
      }

      if (newTotal !== undefined) {
        await AsyncStorage.setItem("@snake_totalPoints", newTotal.toString());
      }

      if (newSkins !== undefined) {
        await AsyncStorage.setItem("@snake_unlockedSkins", JSON.stringify(newSkins));
      }

      if (newSkin !== undefined) {
        await AsyncStorage.setItem("@snake_currentSkin", newSkin);
      }
    } catch (e) {}
  };

  const generateSafeCoordinates = (
    currentSnake,
    existingObjects = [],
    count = 1
  ) => {
    let positions = [];

    const head = currentSnake[0] || { x: 5, y: 5 };

    while (positions.length < count) {
      let pos = {
        x: Math.floor(Math.random() * (COLS - 2)) + 1,
        y: Math.floor(Math.random() * (ROWS - 2)) + 1,
        variant: Math.random() > 0.5 ? "⚡" : "💥",
        enemyVariant: Math.random() > 0.5 ? "👾" : "👻",
      };

      const inSnake = currentSnake.some(
        (c) => c.x === pos.x && c.y === pos.y
      );

      const inExisting = existingObjects.some(
        (o) => o.x === pos.x && o.y === pos.y
      );

      const inCurrent = positions.some(
        (p) => p.x === pos.x && p.y === pos.y
      );

      const closeToHead =
        Math.abs(pos.x - head.x) <= 3 &&
        Math.abs(pos.y - head.y) <= 3;

      if (
        !inSnake &&
        !inExisting &&
        !inCurrent &&
        !closeToHead
      ) {
        positions.push(pos);
      }
    }

    return positions;
  };

  const rollRarityPowerup = () => {
    const pool = [...POWERUPS_POOL];
    const selected = [];

    while (selected.length < 3 && pool.length > 0) {
      const totalChance = pool.reduce((acc, item) => acc + item.chance, 0);

      let random = Math.random() * totalChance;

      for (let i = 0; i < pool.length; i++) {
        random -= pool[i].chance;

        if (random <= 0) {
          selected.push(pool[i]);
          pool.splice(i, 1);
          break;
        }
      }
    }

    return selected;
  };

  const applyUpgrade = (upgradeId) => {
    setActivePowerup(upgradeId);

    if (upgradeId === "clear") {
      setTraps([]);
      setEnemies([]);
    }

    if (upgradeId === "slow") {
      setSpeed((old) => old + 40);
    }

    if (upgradeId === "doublefood") {
      const extraFoods = generateSafeCoordinates(
        snake,
        [...foods, ...traps, ...enemies],
        2
      );

      setFoods((prev) => [...prev, ...extraFoods]);
    }

    if (upgradeId === "tiny") {
      setSnake((prev) => prev.slice(0, Math.max(5, prev.length - 5)));
    }

    setShowUpgradeMenu(false);
  };

  const buySkin = (selectedSkin) => {
    if (unlockedSkins.includes(selectedSkin.id)) {
      setSkin(selectedSkin.id);

      saveGameData(
        undefined,
        undefined,
        undefined,
        selectedSkin.id
      );

      return;
    }

    if (totalPoints >= selectedSkin.price) {
      const updatedPoints =
        totalPoints - selectedSkin.price;

      const updatedSkins = [
        ...unlockedSkins,
        selectedSkin.id,
      ];

      setTotalPoints(updatedPoints);
      setUnlockedSkins(updatedSkins);
      setSkin(selectedSkin.id);

      saveGameData(
        undefined,
        updatedPoints,
        updatedSkins,
        selectedSkin.id
      );
    }
  };

  useEffect(() => {
    if (isPaused || isGameOver || showUpgradeMenu) return;

    const gameCycle = () => {
      if (activePowerup !== "freeze") {
        setEnemies((prevEnemies) =>
          prevEnemies.map((enemy) => {
            const dirs = [
              { x: 1, y: 0 },
              { x: -1, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: -1 },
            ];

            const randomDir =
              dirs[Math.floor(Math.random() * dirs.length)];

            let nextX = Math.min(
              Math.max(enemy.x + randomDir.x, 1),
              COLS - 2
            );

            let nextY = Math.min(
              Math.max(enemy.y + randomDir.y, 1),
              ROWS - 2
            );

            return {
              ...enemy,
              x: nextX,
              y: nextY,
            };
          })
        );
      }

      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (directionRef.current) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

        if (
          head.x < 0 ||
          head.x >= COLS ||
          head.y < 0 ||
          head.y >= ROWS
        ) {
          setDeathCause("Você colidiu com a parede.");
          setIsGameOver(true);
          setActivePowerup(null);
          return prevSnake;
        }

        const collidedTrap = traps.find(
          (t) => t.x === head.x && t.y === head.y
        );

        if (collidedTrap) {
          if (activePowerup === "shield") {
            setActivePowerup(null);
          } else {
            setDeathCause("Você bateu em uma armadilha.");
            setIsGameOver(true);
            setActivePowerup(null);
            return prevSnake;
          }
        }

        const collidedEnemy = enemies.find(
          (e) => e.x === head.x && e.y === head.y
        );

        if (collidedEnemy && activePowerup !== "ghost") {
          if (activePowerup === "shield") {
            setActivePowerup(null);
          } else {
            setDeathCause("Você foi eliminado.");
            setIsGameOver(true);
            setActivePowerup(null);
            return prevSnake;
          }
        }

        if (
          prevSnake.some(
            (cell, index) =>
              index > 3 &&
              cell.x === head.x &&
              cell.y === head.y
          )
        ) {
          if (prevSnake.length >= 16) {
            setDeathCause("Você colidiu consigo mesmo.");
            setIsGameOver(true);
            setActivePowerup(null);
            return prevSnake;
          }
        }

        const newSnake = [head, ...prevSnake];

        let foodEatenIndex = foods.findIndex(
          (f) => f.x === head.x && f.y === head.y
        );

        if (foodEatenIndex !== -1) {
          let remainingFoods = foods.filter(
            (_, i) => i !== foodEatenIndex
          );

          setScore((s) => {
            let bonus = activePowerup === "magnet" ? 20 : 10;

            const nextScore = s + bonus;

            if (nextScore > highScore) {
              setHighScore(nextScore);
            }

            setTotalPoints((t) => {
              const nt = t + bonus;

              saveGameData(
                nextScore > highScore
                  ? nextScore
                  : undefined,
                nt,
                undefined,
                undefined
              );

              return nt;
            });

            return nextScore;
          });

          if (remainingFoods.length === 0) {
            const nextWave = wave + 1;

            setWave(nextWave);

            setActivePowerup(null);

            setSpeed((oldSpeed) =>
              Math.max(oldSpeed - 5, 70)
            );

            const foodCount = Math.min(
              Math.floor(nextWave / 2) + 1,
              6
            );

            const trapCount = Math.min(
              Math.floor(nextWave / 2),
              12
            );

            const enemyCount = Math.min(
              Math.floor(nextWave / 3),
              8
            );

            const generatedTraps =
              generateSafeCoordinates(
                newSnake,
                [],
                trapCount
              );

            const generatedEnemies =
              generateSafeCoordinates(
                newSnake,
                generatedTraps,
                enemyCount
              );

            const generatedFoods =
              generateSafeCoordinates(
                newSnake,
                [...generatedTraps, ...generatedEnemies],
                foodCount
              );

            setTraps(generatedTraps);
            setEnemies(generatedEnemies);
            setFoods(generatedFoods);

            if (
              nextWave >= 2 &&
              Math.random() > 0.35
            ) {
              setAvailableUpgrades(
                rollRarityPowerup()
              );

              setShowUpgradeMenu(true);
            }
          } else {
            setFoods(remainingFoods);
          }
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(gameCycle, speed);

    return () => clearInterval(interval);
  }, [
    isPaused,
    isGameOver,
    showUpgradeMenu,
    foods,
    traps,
    enemies,
    speed,
    wave,
    activePowerup,
  ]);

  const startGame = () => {
    const initialSnake = [{ x: 5, y: 5 }];

    setSnake(initialSnake);

    setDirection("RIGHT");

    setWave(1);

    setDeathCause("");

    setActivePowerup(null);

    const initialTraps =
      generateSafeCoordinates(initialSnake, [], 1);

    const initialFoods =
      generateSafeCoordinates(
        initialSnake,
        initialTraps,
        1
      );

    setTraps(initialTraps);

    setEnemies([]);

    setFoods(initialFoods);

    setScore(0);

    setSpeed(180);

    setIsGameOver(false);

    setIsPaused(false);

    setShowUpgradeMenu(false);
  };

  return (
    <LinearGradient
      colors={["#060b14", "#0a1120"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            🐍 Cyber Matrix
          </Text>

          <View style={styles.highlightedPts}>
            <Text style={styles.highlightedText}>
              ⭐ BANCO: {totalPoints} MOEDAS
            </Text>
          </View>
        </View>

        {(!isPaused || isGameOver) && (
          <View style={styles.scoreBox}>
            <Text style={styles.score}>
              {score}
            </Text>

            <Text style={styles.scoreLabel}>
              SCORE
            </Text>
          </View>
        )}
      </View>

      <View style={styles.board}>
        {activePowerup && (
          <View
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#111827",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#00ff99",
              zIndex: 999,
            }}
          >
            <Text
              style={{
                color: "#00ff99",
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              POWER: {activePowerup.toUpperCase()}
            </Text>
          </View>
        )}

        {(!isPaused || isGameOver) &&
          foods.map((food, index) => (
            <Animated.View
              key={`f-${index}`}
              style={[
                styles.elementCell,
                foodAnimatedStyle,
                styles.foodHighlight,
                {
                  left: food.x * CELL_SIZE,
                  top: food.y * CELL_SIZE,
                },
              ]}
            >
              <Text style={{ fontSize: 13 }}>
                🍎
              </Text>
            </Animated.View>
          ))}

        {(!isPaused || isGameOver) &&
          traps.map((trap, index) => (
            <View
              key={`t-${index}`}
              style={[
                styles.elementCell,
                styles.trapCell,
                {
                  left: trap.x * CELL_SIZE,
                  top: trap.y * CELL_SIZE,
                },
              ]}
            >
              <Text style={styles.pastelEmoji}>
                {trap.variant}
              </Text>
            </View>
          ))}

        {(!isPaused || isGameOver) &&
          enemies.map((enemy, index) => (
            <View
              key={`e-${index}`}
              style={[
                styles.elementCell,
                styles.enemyCell,
                {
                  left: enemy.x * CELL_SIZE,
                  top: enemy.y * CELL_SIZE,
                },
              ]}
            >
              <Text style={styles.pastelEmoji}>
                {enemy.enemyVariant}
              </Text>
            </View>
          ))}

        {(!isPaused || isGameOver) &&
          snake.map((cell, index) => (
            <View
              key={`s-${index}`}
              style={[
                styles.snakeCell,
                {
                  width: CELL_SIZE - 1,
                  height: CELL_SIZE - 1,
                  left: cell.x * CELL_SIZE,
                  top: cell.y * CELL_SIZE,
                  backgroundColor:
                    index === 0
                      ? currentSkin.head
                      : currentSkin.body,
                  borderRadius:
                    index === 0 ? 5 : 3,
                },
              ]}
            />
          ))}

        {showUpgradeMenu && (
          <View style={styles.overlay}>
            <Text style={styles.upgradeMainTitle}>
              HACK TERMINAL
            </Text>

            {availableUpgrades.map((up) => (
              <TouchableOpacity
                key={up.id}
                style={[
                  styles.upgradeCard,
                  { borderColor: up.color },
                ]}
                onPress={() =>
                  applyUpgrade(up.id)
                }
              >
                <Text
                  style={styles.upgradeCardTitle}
                >
                  {up.title}
                </Text>

                <Text
                  style={styles.upgradeCardDesc}
                >
                  {up.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {isPaused &&
          !isGameOver &&
          !showUpgradeMenu && (
            <View style={styles.overlay}>
              <Text style={styles.menuTitle}>
                🐍 Cyber Matrix
              </Text>

              <TouchableOpacity
                style={styles.playButton}
                onPress={startGame}
              >
                <Text style={styles.playText}>
                  ▶ INICIAR
                </Text>
              </TouchableOpacity>

              <Text style={styles.shopTitle}>
                ⚡ SKINS
              </Text>

              <ScrollView
                contentContainerStyle={
                  styles.skinContainer
                }
                style={styles.skinScroll}
              >
                {SKINS_LIST.map((item) => {
                  const isUnlocked =
                    unlockedSkins.includes(
                      item.id
                    );

                  const isSelected =
                    skin === item.id;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.skinButton,

                        isSelected && {
                          borderColor:
                            "#00ff99",
                        },

                        !isUnlocked && {
                          opacity: 0.4,
                        },
                      ]}
                      onPress={() =>
                        buySkin(item)
                      }
                    >
                      <View
                        style={[
                          styles.skinPreviewDot,
                          {
                            backgroundColor:
                              item.body,
                          },
                        ]}
                      />

                      <Text
                        style={styles.skinText}
                      >
                        {item.name}
                      </Text>

                      {!isUnlocked && (
                        <Text
                          style={styles.priceText}
                        >
                          🪙{item.price}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

        {isGameOver && (
          <View style={styles.overlay}>
            <View style={styles.gameOverHeader}>
              <FontAwesome5
                name="skull"
                size={36}
                color="#ef4444"
                style={{ marginRight: 10 }}
              />

              <Text style={styles.gameOverText}>
                GAME OVER
              </Text>
            </View>

            <Text style={styles.deathReportTitle}>
              CAUSA DA MORTE:
            </Text>

            <Text style={styles.deathReportText}>
              {deathCause}
            </Text>

            <Text style={styles.finalScore}>
              Dados coletados: +{score} MB
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={startGame}
            >
              <Text style={styles.playText}>
                🔄 RECOMEÇAR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToMenuButton}
              onPress={() => {
                setIsGameOver(false);
                setIsPaused(true);
              }}
            >
              <Text style={styles.backToMenuText}>
                🏠 MENU PRINCIPAL
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            🏆 Recorde: {highScore}
          </Text>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            🌊 Wave: {wave}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    width: BOARD_WIDTH,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  highlightedPts: {
    backgroundColor: "rgba(0,255,153,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2,
  },

  highlightedText: {
    color: "#00ff99",
    fontSize: 10,
    fontWeight: "bold",
  },

  scoreBox: {
    backgroundColor: "#131f37",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },

  score: {
    color: "#00ff99",
    fontSize: 16,
    fontWeight: "bold",
  },

  scoreLabel: {
    color: "#64748b",
    fontSize: 8,
  },

  board: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    backgroundColor: "#091122",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#233554",
    position: "relative",
  },

  snakeCell: {
    position: "absolute",
  },

  elementCell: {
    position: "absolute",
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },

  foodHighlight: {
    backgroundColor: "rgba(255,38,38,0.35)",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ff2626",
  },

  pastelEmoji: {
    fontSize: 13,
    opacity: 0.85,
  },

  trapCell: {
    backgroundColor: "rgba(71,85,105,0.25)",
    borderRadius: 5,
  },

  enemyCell: {
    backgroundColor: "rgba(51,65,85,0.3)",
    borderRadius: 5,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(6,11,22,0.98)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },

  menuTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  playButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  retryButton: {
    backgroundColor: "#2563eb",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },

  backToMenuButton: {
    borderWidth: 1,
    borderColor: "#334155",
    width: "100%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  backToMenuText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
  },

  playText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  shopTitle: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    alignSelf: "flex-start",
  },

  skinScroll: {
    width: "100%",
    maxHeight: 160,
  },

  skinContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  skinButton: {
    backgroundColor: "#131f37",
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 6,
    margin: 2,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  skinPreviewDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },

  skinText: {
    color: "#fff",
    fontSize: 9,
  },

  priceText: {
    color: "#eab308",
    fontSize: 8,
    fontWeight: "bold",
    marginLeft: 3,
  },

  upgradeMainTitle: {
    color: "#00ff99",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },

  upgradeCard: {
    backgroundColor: "#0f172a",
    width: "100%",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1.5,
  },

  upgradeCardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },

  upgradeCardDesc: {
    color: "#94a3b8",
    fontSize: 9,
  },

  gameOverHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  gameOverText: {
    color: "#ef4444",
    fontSize: 24,
    fontWeight: "bold",
  },

  deathReportTitle: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },

  deathReportText: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "500",
    backgroundColor: "rgba(239,68,68,0.08)",
    padding: 10,
    borderRadius: 6,
    width: "100%",
    marginBottom: 10,
    textAlign: "center",
  },

  finalScore: {
    color: "#94a3b8",
    fontSize: 11,
  },

  footer: {
    width: BOARD_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  footerBox: {
    backgroundColor: "#131f37",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  footerText: {
    color: "#94a3b8",
    fontSize: 9,
  },
});
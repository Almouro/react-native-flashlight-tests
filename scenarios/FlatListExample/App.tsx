import React, { memo } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { images } from "./imageMap.js";

interface Pokemon {
  gameIndex: string;
  name: string;
  types: { name: string }[];
  imageUrl: string;
}

// Taken directly from https://github.com/MatheusPires99/pokedex
const POKEMON_TYPE_COLORS: { [type: string]: string } = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#FA6C6C",
  water: "#6890F0",
  grass: "#48CFB2",
  electric: "#FFCE4B",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
};

const pokedex: Pokemon[] = require("./pokedex.json");

const COLUMN_COUNT = 4;

const cardStyles = StyleSheet.create({
  container: { width: `${100 / COLUMN_COUNT}%` },
  innerContainer: {
    padding: (10 * 2) / COLUMN_COUNT,
    paddingRight: 0,
    margin: (5 * 2) / COLUMN_COUNT,
    borderRadius: (10 * 2) / COLUMN_COUNT,
    elevation: 7,
  },
  name: {
    fontSize: (16 * 2) / COLUMN_COUNT,
    color: "white",
    fontWeight: "bold",
    flex: 1,
    paddingRight: (5 * 2) / COLUMN_COUNT,
  },
  typeContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6662",
    borderRadius: (10 * 2) / COLUMN_COUNT,
    marginTop: (5 * 2) / COLUMN_COUNT,
    padding: (5 * 2) / COLUMN_COUNT,
  },
  nameAndIndexContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingRight: (10 * 2) / COLUMN_COUNT,
  },
  index: { fontSize: (12 * 2) / COLUMN_COUNT, color: "#6666" },
  type: {
    color: "#fffa",
    fontSize: (12 * 2) / COLUMN_COUNT,
  },
  image: { width: (100 * 2) / COLUMN_COUNT, height: (100 * 2) / COLUMN_COUNT },
  typesContainer: { flex: 1, paddingTop: (20 * 2) / COLUMN_COUNT },
  typeRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

let renderMemoCount = 0;

const time = new Date().getTime();

const PokemonCard = memo(({ item }: { item: Pokemon }) => {
  renderMemoCount += 1;

  if (renderMemoCount === 448) {
    console.log("[FLASHLIGHT] Last render memo", new Date().getTime() - time);
  }

  return (
    <View style={cardStyles.container}>
      <View
        style={[
          cardStyles.innerContainer,
          {
            backgroundColor: POKEMON_TYPE_COLORS[item.types[0].name],
          },
        ]}
      >
        <View style={cardStyles.nameAndIndexContainer}>
          <Text numberOfLines={1} style={cardStyles.name}>
            {item.name.toUpperCase()}
          </Text>
          <Text style={cardStyles.index}>#{item.gameIndex}</Text>
        </View>
        <View style={cardStyles.typeRow}>
          <View style={cardStyles.typesContainer}>
            {item.types.map((type) => (
              <View key={type.name} style={cardStyles.typeContainer}>
                <Text style={cardStyles.type}>{type.name}</Text>
              </View>
            ))}
          </View>
          {item.imageUrl && (
            <Image
              source={
                images[
                  item.imageUrl.replace(
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/",
                    ""
                  )
                ]
              }
              style={cardStyles.image}
            />
          )}
        </View>
      </View>
    </View>
  );
});

let renderItemCount = 0;

const renderItem = ({ item }: { item: Pokemon }) => {
  renderItemCount += 1;
  return <PokemonCard item={item} />;
};

const styles = StyleSheet.create({ list: { paddingHorizontal: 5 } });

setTimeout(
  () =>
    console.log("[FLASHLIGHT] 10s mark", { renderItemCount, renderMemoCount }),
  10000
);
setTimeout(
  () =>
    console.log("[FLASHLIGHT] 30s mark", { renderItemCount, renderMemoCount }),
  30000
);

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <FlatList
        numColumns={COLUMN_COUNT}
        keyExtractor={(item) => item.name}
        /**
         * Slicing here to make sure we always render the same amount of items
         * It seems that on certain iterations FlatList would render one more page and have a worse Flashlight score
         *
         * By default windowSize is 21, so at start, we render 11 screens, which should amount to 448 items
         */
        data={pokedex.slice(0, 448)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default App;

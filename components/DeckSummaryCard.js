import React from "react"
import pluralize from "pluralize"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { white, gray, lightgray  } from "../utils/colors"

let toggle = 0

function toggleColorGenerator() {
  if(toggle === 0) {
    toggle = 1
    return white
  } else {
    toggle = 0
    return lightgray
  }
}

const DeckSummaryCard = ({ id, name, cardCount, navigation }) => (
  <TouchableOpacity
    style={[styles.container, {backgroundColor: toggleColorGenerator()}]}
    onPress={() =>
      navigation.navigate("DeckDetail", { deckId: id, name: name })
    }
  >
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.count}>{`${cardCount} ${pluralize(
      "Card",
      cardCount
    )}`}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: white,
    minHeight: 150,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: gray
  },
  name: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 5
  },
  count: {
    fontSize: 20,
    textAlign: "center",
    color: gray,
    marginBottom: 5
  }
})

export default DeckSummaryCard

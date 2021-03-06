import React, { Component } from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet, FlatList } from "react-native"
import DeckSummaryCard from "./DeckSummaryCard"
import StyledButton from "./StyledButton"
import { receiveDecks } from "../actions"
import { retrieveDecks } from "../utils/api"
import { white } from "../utils/colors"

class Decks extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    retrieveDecks()
      .then(decks => this.props.receiveDecks(decks))
      .then(() => {
        this.setState({ ready: true })
      })
  }

  render() {
    const { decks, navigation } = this.props

    if (!this.state.ready) {
      return (
        <View style={styles.empty}>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      return Object.values(decks).length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={Object.values(decks)}
            renderItem={({ item }) => (
              <DeckSummaryCard
                id={item.id}
                name={item.name}
                cardCount={item.cards.length}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={(item, index) => item.name}
          />
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={{ fontSize: 18 }}>You don't have any decks yet.</Text>
          <StyledButton
            onPress={() => {
              navigation.navigate("AddDeck")
            }}
          >
            Create Deck
          </StyledButton>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start"
  },
  empty: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  }
})

const mapStateToProps = decks => ({
  decks
})

const mapDispatchToProps = dispatch => ({
  receiveDecks: decks => dispatch(receiveDecks(decks))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks)

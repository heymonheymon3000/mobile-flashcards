import React, { Component } from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { View, StatusBar,Platform } from "react-native"
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { Feather } from "@expo/vector-icons"
import { white, purple, gray } from "./utils/colors"
import { setLocalNotification } from "./utils/helpers"
import reducer from "./reducers"
import Decks from "./components/Decks"
import AddDeck from "./components/AddDeck"
import AddCard from "./components/AddCard"
import DeckDetail from "./components/DeckDetail"
import Quiz from "./components/Quiz"

const FlashcardsStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Feather name="list" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => (
        <Feather name="plus" size={30} color={tintColor} />
      )
    }
  }
}

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 60,
      backgroundColor: white,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    labelStyle: {
      paddingTop: 3,
      fontSize: 14,
      fontWeight: "bold"
    }
  }
}

const TabNav = createAppContainer(
  createBottomTabNavigator(Tabs, navigationOptions))

const MainNavigator = createAppContainer(createStackNavigator({
    Home: TabNav,
    DeckDetail: DeckDetail,
    AddCard: AddCard,
    Quiz: Quiz
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: purple },
      headerTitleStyle: { fontWeight: "bold" }
    }
  }))


class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar
            backgroundColor={purple}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

export default App

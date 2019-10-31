import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import pluralize from "pluralize";
import { white, gray } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

import QuizCard from "./QuizCard";
import QuizActions from "./QuizActions";
import QuizResults from "./QuizResults";

const defaultState = {
  correctAnswerCount: 0,
  incorrectAnswerCount: 0,
  currentQuestionIndex: 0, // tracks which card is currently being shown
  showResults: false
};

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam("deck").name} Quiz`
  });

  state = defaultState;

  _getRemainingCountMessage = () => {
    const { correctAnswerCount, incorrectAnswerCount } = this.state;
    const remainingQuestions =
      this._getDeck().cards.length -
      (correctAnswerCount + incorrectAnswerCount + 1);
    return `${remainingQuestions} ${pluralize(
      "question",
      remainingQuestions
    )} remaining.`;
  };

  _getDeck = () => {
    return this.props.navigation.getParam("deck");
  };

  restartQuiz = () => {
    this.setState(defaultState);
  };

  /* 
   * Plays a vital role in managing quix state, will update 
   * correct/incorrect answer count, trigger display of next card 
   * and trigger display of quiz results at the end of Quiz.
   */
  recordAnswer = knewAnswer => {
    // Update answer count.
    let {
      correctAnswerCount,
      incorrectAnswerCount,
      showResults,
      currentQuestionIndex
    } = this.state;

    // Update the count.
    if (knewAnswer) {
      correctAnswerCount++;
    } else {
      incorrectAnswerCount++;
    }

    // Determine whether to show another card or quiz results.
    const deck = this._getDeck();
    if (currentQuestionIndex === deck.cards.length - 1) {
      // time to show results.
      showResults = true;

      // User completed a quiz, disable today's notification.
      clearLocalNotification();
      // Set tomorrow's notification.
      setLocalNotification();
    } else {
      // show next card.
      currentQuestionIndex++;
    }

    // Update state with new values.
    this.setState(state => ({
      correctAnswerCount,
      incorrectAnswerCount,
      showResults,
      currentQuestionIndex
    }));
  };

  render() {
    const {
      correctAnswerCount,
      incorrectAnswerCount,
      currentQuestionIndex,
      showResults
    } = this.state;

    return !showResults ? (
      <View style={styles.container}>
        <QuizCard card={this._getDeck().cards[currentQuestionIndex]} />
        <Text style={styles.count}>{this._getRemainingCountMessage()}</Text>
        <QuizActions recordAnswer={this.recordAnswer} />
      </View>
    ) : (
      <QuizResults
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        restartQuiz={this.restartQuiz}
        navigation={this.props.navigation}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: white,
    padding: 10
  },
  count: {
    color: gray,
    fontSize: 20,
    marginTop: 10
  }
});

export default Quiz;

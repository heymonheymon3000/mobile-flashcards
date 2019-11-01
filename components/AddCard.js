import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet } from "react-native";
import StyledButton from "./StyledButton";
import { white, gray } from "../utils/colors";
import { createCard } from "../actions";
import { saveCard } from "../utils/api";

class AddCard extends Component {
  static navigationOptions = () => ({
    title: "Add Card"
  });

  state = {
    question: "",
    answer: ""
  };

  handleSubmit = () => {
    deckId = this.props.navigation.getParam("deckId");
    const { question, answer } = this.state;

    this.props.createCard(deckId, question, answer);
    saveCard(deckId, { question, answer });

    this.props.navigation.goBack();

    this.setState({
      question: "",
      answer: ""
    });
  };

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.element}>
          <Text style={styles.label}>What's the question?</Text>
          <TextInput
            style={styles.input}
            value={question}
            placeholder="Write question here?"
            onChangeText={question => this.setState({ question })}
          />
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>What's the answer?</Text>
          <TextInput
            style={styles.input}
            value={answer}
            placeholder="Here is my question."
            onChangeText={answer => this.setState({ answer })}
          />
        </View>
        <StyledButton onPress={this.handleSubmit}>
          <Text>Create Card</Text>
        </StyledButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  element: {
    margin: 20
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    backgroundColor: white,
    width: 350,
    fontSize: 20,
    height: 50,
    padding: 10,
    borderRadius: 1,
    borderColor: gray,
    margin: 20
  }
});

const mapDispatchToProps = dispatch => ({
  createCard: (deckId, question, answer) =>
    dispatch(createCard(deckId, question, answer))
});

export default connect(
  null,
  mapDispatchToProps
)(AddCard);

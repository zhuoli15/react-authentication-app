import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null }
  //Automatically invoke
  componentWillMount() {
    firebase.initializeApp ({
        apiKey: 'AIzaSyAFA1DAuFlFLRdaFQ0tuQHq-BC3al5mwN8',
        authDomain: 'auth-254ac.firebaseapp.com',
        databaseURL: 'https://auth-254ac.firebaseio.com',
        projectId: 'auth-254ac',
        storageBucket: 'auth-254ac.appspot.com',
        messagingSenderId: '300223415644'
      });

      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({loggedIn: true});
        } else {
          this.setState({loggedIn: false});
        }

      });
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return (
          <Button onPressing={() => firebase.auth().signOut()}>
          Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }
  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;

import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';

import AntsCarousel from './Carousel';
import Logout from './Logout';
import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
});

class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Ants Racing',
      headerRight: (
        <Button
          onPress={() => {
            navigation.state.params.calculate();
          }}
          title="Calculate"
          color="#fff"
        />
      ),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  state = {
    data: [],
  }

  componentDidMount () {
    this.props.navigation.setParams({calculate: this._calculateAll});
  }

  _calculateAll = () => {
    this._list.calculateAll();
  };

  render () {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <List
          ref={component => this._list = component}
          updateCarousel={(data) => { this.setState({data})}} />
        <AntsCarousel data={this.state.data}/>
        <Logout navigation={navigation}/>
      </View>
    );
  }
}

export default Home;
import React, {Component} from 'react';
import {FlatList , Text, View, StyleSheet} from 'react-native';

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Item from './Item';
import Header from './Header';
import Ant from './Model';

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
});


class List extends Component {

  state = {
    antsListStatus: 'not yet run',
    data: null,
    loading: false,
  }

  calculated = 0;

  calculateAll () {
    if (this.state.antsListStatus === 'calculated') {
      this.calculated = 0;
      const antList = this._resetPercentageAndState();
      this.setState({ antsListStatus: 'in progress', data: antList, loading: true });
      setTimeout(() => {
        this.setState({ loading: false})
      }, 1);
    }
  };

  _resetPercentageAndState () {
    const antListCopy = this.state.data.slice();
    const antList = antListCopy.map(ant => {
      return ant.setOdds(0).setState('not yet run');
    });
    return antList;
  }

  _percentageListener = (antSelected, odds) => {
    const antListCopy = this.state.data.slice();
    const antList = antListCopy.map(ant => {
      if (ant.name === antSelected.name) {
        return antSelected.setOdds(odds).setState('calculated');
      }
      return ant;
    });
    this._updateData(antList);
  }

  _updateData(antList) {
    const antListSorted = this._sortAntList(antList);
    this.setState({data: antListSorted});
    this._increase();
  }

  _sortAntList  = antList => antList.sort((a, b) => (a.odds < b.odds) ? 1 : -1); 

  _renderItem = ({item}) => {
    return (
      <Item
        ant={item}
        percentageListener={this._percentageListener}
      />
    );
  }

  _increase() {
    this.calculated += 1;
    if (this.calculated === this.state.data.length) {
      this.setState({ antsListStatus: 'calculated' });
      const data = this.state.data.slice();
      this.props.updateCarousel(data);
    }
  }

  _keyExtractor = (item, index) => item.name;

  _transformAntEntityCollection(data = []) {
    let count = 0;
    const antList = data.flatMap(ant => {
      const {name} = ant;
      const antObject = new Ant(name, 'not yet run', 0, count);
      count += 1;
      return antObject;
    });
    this.setState({data: antList, antsListStatus: 'in progress'});
  }

  _renderList() {
    const {antsListStatus, data} = this.state;
    return (
      <React.Fragment>
        <Text>{antsListStatus}</Text>
        <FlatList
          ref={component => {
            this.listComponent = component;
          }}
          bounces={false}
          data={data}
          extraData={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={<Header />}
        />
      </React.Fragment>
    )
  }

  render () {
    const {loading, data} = this.state;

    if (loading) {
      return <View style={styles.container}/>
    }

    if (data) {
      return (
        <View style={styles.container}>
          {this._renderList()}
        </View>
      );}
    
    return (
      <Query
        query={gql`
        {
          ants {
            name,
            color
          }
        }
      `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>{'Loading...'}</Text>;
          if (error) return <Text>{'Error :('}</Text>;
          this._transformAntEntityCollection(data.ants);
          return null;
        }}
      </Query>
    )
  }
}

export default List;
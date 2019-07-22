import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';

class AntsCarousel extends React.PureComponent{

  renderItem = ({item}) => {
    return (
      <View style={styles.slide1} key={item.name}>
        <Text style={styles.image}>{'🐜'}</Text>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
        <Text style={styles.text}>{`${item.odds}%`}</Text>
      </View>
    )
  };

  render () {
    const {data} = this.props;
    return (
      <View style={styles.wrapper}>
        <Carousel
          layout={'default'}
          data={data}
          loop={true}
          firstItem={data.length - 2}
          loopClonesPerSide={10}
          renderItem={this.renderItem}
          sliderWidth={350}
          itemWidth={120}
        />
      </View>
    )
  }
}

export default AntsCarousel;

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  image: {
    fontSize: 30,
    marginBottom: 10,
  }
});
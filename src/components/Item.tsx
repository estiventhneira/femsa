/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../types/Product';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type StackParamList = {
  ProductDetail: {item: Product} | undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

const Item = ({item}) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      testID="product-item"
      onPress={() => {
        navigation.navigate('ProductDetail', {item});
      }}
      key={item.id}
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-around',
      }}>
      <Image
        source={{
          uri: item.image,
        }}
        style={{height: 55, width: 55, borderRadius: 10}}
      />
      <View
        style={{
          marginLeft: 11,
          justifyContent: 'space-evenly',
          width: 180,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.product}</Text>
        <Text style={{fontWeight: '300'}}>
          {new Date(item.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row'}}>
          {item.is_redemption ? (
            <Text style={{fontWeight: 'bold', color: '#FF0000'}}>-</Text>
          ) : (
            <Text style={{fontWeight: 'bold', color: '#00B833'}}>+</Text>
          )}
          <Text style={{fontWeight: 'bold'}}> {item.points}</Text>
        </View>
        <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 10}}>
          {'>'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {Product} from '../types/Product';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RouteParams = {
  params: {item: Product} | undefined;
};

type Item = RouteProp<RouteParams>;

type StackParamList = {
  ProductDetail: {item: Product} | undefined;
  Home;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

const ProductDetail = () => {
  const navigation = useNavigation<NavigationProps>();
  const {params} = useRoute<Item>();
  const {item} = params;

  console.log(item);

  console.log(item);
  return (
    <View>
      <View
        style={{
          height: 350,
          width: '90%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          margin: 20,
          shadowOpacity: 0.64,
          shadowRadius: 3.32,
          elevation: 16,
          justifyContent: 'flex-start',
        }}>
        <Image
          source={{uri: item.image}}
          style={{height: '100%', width: '100%', borderRadius: 15}}
        />
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: '#9B9898',
          marginLeft: 20,
          marginTop: 10,
        }}>
        Detalles del producto:
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          marginLeft: 20,
          marginTop: 10,
        }}>
        Comprado el{' '}
        {new Date(item.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          marginLeft: 20,
          marginTop: 25,
          color: '#9B9898',
        }}>
        Con esta compra acumulaste:
      </Text>
      <View
        style={{flexDirection: 'row', alignItems: 'baseline', paddingLeft: 20}}>
        {item.is_redemption ? (
          <Text style={{fontWeight: 'bold', color: '#FF0000', fontSize: 40}}>
            -
          </Text>
        ) : (
          <Text style={{fontWeight: 'bold', color: '#00B833', fontSize: 40}}>
            +
          </Text>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 40,
            marginTop: 15,
          }}>
          {item.points}
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{
            backgroundColor: '#334FFA',
            paddingVertical: 17,
            paddingHorizontal: 150,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
            Aceptar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

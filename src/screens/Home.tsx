/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Product} from '../types/Product';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type StackParamList = {
  ProductDetail: {item: Product} | undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

export default function Home() {
  const textSpanish = require('../assets/textSpanish.json');
  const navigation = useNavigation<NavigationProps>();
  const [points, setPoints] = useState(0);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const userName = 'Ruben Rodriguez';
  const baseUrl = 'https://6222994f666291106a29f999.mockapi.io/api/v1/products';

  useEffect(() => {
    fetch(baseUrl).then(promise => {
      promise.json().then(response => {
        setProducts(response);
        setOriginalData(response);
      });
    });
  }, []);

  useEffect(() => {
    setPoints(
      products.reduce((acumulador, actual) => {
        if (actual.is_redemption) {
          return acumulador - actual.points;
        }
        return acumulador + actual.points;
      }, 0),
    );
  }, [products]);

  return (
    <SafeAreaView
      style={{
        height: '100%',
      }}>
      <View
        style={{
          paddingLeft: 15,
          paddingTop: 20,
          marginBottom: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          {textSpanish.header}
        </Text>
        <Text style={{fontWeight: '300', fontSize: 16}}>{userName}</Text>
      </View>
      <View>
        <Text
          style={{
            paddingLeft: 15,
            fontWeight: '800',
            color: '#9B9898',
            fontSize: 15,
          }}>
          TUS PUNTOS
        </Text>
        <View
          style={{
            marginHorizontal: 53,
            backgroundColor: '#334FFA',
            marginTop: 20,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.32,
            elevation: 16,
            marginBottom: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '800',
              fontSize: 16,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 7,
            }}>
            Diciembre
          </Text>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              testID="points"
              style={{
                color: 'white',
                fontWeight: '800',
                fontSize: 31,
                paddingBottom: 50,
              }}>
              {points} pts
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{
            paddingLeft: 15,
            fontWeight: '800',
            color: '#9B9898',
            fontSize: 15,
          }}>
          TUS MOVIMIENTOS
        </Text>
        <ScrollView
          style={{
            backgroundColor: 'white',
            margin: 15,
            paddingVertical: 25,
            paddingHorizontal: 10,
            borderRadius: 15,
            height: '40%',
          }}>
          {products.map(item => {
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
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {item.product}
                  </Text>
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
                      <Text style={{fontWeight: 'bold', color: '#FF0000'}}>
                        -
                      </Text>
                    ) : (
                      <Text style={{fontWeight: 'bold', color: '#00B833'}}>
                        +
                      </Text>
                    )}
                    <Text style={{fontWeight: 'bold'}}> {item.points}</Text>
                  </View>
                  <Text
                    style={{fontSize: 17, fontWeight: 'bold', marginLeft: 10}}>
                    {'>'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={{height: 30}} />
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {filterOn ? (
            <TouchableOpacity
              onPress={() => {
                setFilterOn(false);
                setProducts(originalData);
              }}
              style={{
                backgroundColor: '#334FFA',
                paddingVertical: 17,
                paddingHorizontal: 150,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Todos</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setProducts(
                    products.filter(product => {
                      if (!product.is_redemption) {
                        return product;
                      }
                    }),
                  );
                  setFilterOn(true);
                }}
                style={{
                  backgroundColor: '#334FFA',
                  paddingVertical: 17,
                  paddingHorizontal: 55,
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Ganados
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setProducts(
                    products.filter(product => {
                      if (product.is_redemption) {
                        return product;
                      }
                    }),
                  );
                  setFilterOn(true);
                }}
                style={{
                  backgroundColor: '#334FFA',
                  paddingVertical: 17,
                  paddingHorizontal: 55,
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Canjeados
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

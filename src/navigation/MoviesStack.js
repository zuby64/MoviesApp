import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  MoviesList  from '../screens/MoviesList';
import  MovieDescription  from '../screens/MovieDescription';
import { ScreenNames } from '../core/Constats';
import { screenOptions } from '../core/Constats';
const Stack = createStackNavigator();

export function MoviesStack(){
  
   return( 
   <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={ScreenNames.MoviesList} component={MoviesList} />
    <Stack.Screen name={ScreenNames.MoviesDescription} component={MovieDescription} />
  </Stack.Navigator>
   )
  
}



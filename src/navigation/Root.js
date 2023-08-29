import React from 'react';
import { SafeAreaView ,StyleSheet,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MoviesStack } from './MoviesStack';
export function  Root(){
    return(
        <SafeAreaView style={styles.container}>
        <NavigationContainer>
           <MoviesStack/>
        </NavigationContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
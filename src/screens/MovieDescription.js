import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MovieDescription = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
  },
});

export default MovieDescription;

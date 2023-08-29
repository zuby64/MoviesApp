
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPopularMovies } from '../services/Api';

const MoviesList = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoviesData = async () => {
    try {
      setIsLoading(true);
      setError(null); 

      const newMovies = await fetchPopularMovies(page);

      if (page === 1) {
        setMovies(newMovies);
      } else {
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
      }

      setHasMore(newMovies.length > 0);
    } catch (error) {
    }
     finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleEndReached = () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const refreshData = () => {
    if (isLoading) {
      return;
    }

    setIsRefreshing(true);
    setPage(1);
    setMovies([]); // Clear existing data when refreshing
  };

  const handlePressMovie = (movie) => {
    navigation.navigate('MovieDescription', { movie });
  };

  useEffect(() => {
    fetchMoviesData();
  }, [page]);

  useEffect(() => {
    if (isRefreshing) {
      fetchMoviesData();
    }
  }, [isRefreshing]);

  const handleScreenFocus = useCallback(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    setError(null);
    fetchMoviesData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', handleScreenFocus);

    return () => {
      unsubscribe();
    };
  }, [navigation, handleScreenFocus]);

  const renderLoader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator />
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text>{error || 'No movies found'}</Text>
    </View>
  );
const renderItem = ()=>(
    <TouchableOpacity onPress={() => handlePressMovie(item)}>
    <View style={styles.movieCard}>
      <Text>{item.title}</Text>
    </View>
  </TouchableOpacity>
)
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={refreshData}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoviesList;


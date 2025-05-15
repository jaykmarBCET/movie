import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useMovieStore } from '@/services/movie.store';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const { getSearchMovie, searchMovie,isLoading } = useMovieStore();

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      getSearchMovie({page:1,query});
      Keyboard.dismiss(); 
      if(!isLoading){
        setQuery("")
      }
    }
  }, [query,getSearchMovie,isLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Movies</Text>

      <TextInput
        style={styles.input}
        placeholder="Type movie name..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        placeholderTextColor="#777"
      />

      {searchMovie.length === 0 ? (
        <Text style={styles.emptyText}>Search results will appear here</Text>
      ) : (
        <FlatList
          data={searchMovie}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2229',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign:'center',
    marginTop:20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Search;

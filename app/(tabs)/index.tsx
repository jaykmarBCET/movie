import React, { useEffect, useState } from "react";
import {
  Text,
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList, // Using FlatList for potentially better performance with lists
} from "react-native";
import MovieCard from "../components/MovieCard"; // Assuming this is in the correct relative path
import { useMovieStore } from "@/services/movie.store"; // Adjust the path if necessary
import { LinearGradient } from 'expo-linear-gradient'


const HomePage = () => {
  const { getPopularMovie, popularMovie, upcomingMovie, getUpcomingMovie, topRatedMovie, getTopRatedMovie } = useMovieStore();
  const [page, setPage] = useState<number>(1);

  const getImageUrl = (image: string) => {
    return `https://image.tmdb.org/t/p/original${image}`;
  };

  useEffect(() => {
    getPopularMovie(page);
    getUpcomingMovie(page);
    getTopRatedMovie(page)

  }, [getPopularMovie, getUpcomingMovie, page, getTopRatedMovie]);

  return (
    <LinearGradient colors={["#0f0f0f", "#1a1a1a", "#262626"]} style={styles.main}>

      {upcomingMovie.length > 0 && (
        <ImageBackground
          style={[styles.featuredHeader, {}]}
          imageStyle={styles.featuredHeaderImage}
          source={{ uri: getImageUrl(upcomingMovie[0].backdrop_path) }}
        >
          <View style={styles.featuredContent}>
            {/* <Text style={styles.featuredTitle}>Featured Movie</Text> */}
            {popularMovie.length > 0 && (
              <Image
                style={styles.featuredPoster}
                source={{ uri: getImageUrl(popularMovie[0].poster_path) }}
              />
            )}
            <Text style={styles.featuredOverview} numberOfLines={3}>
              {popularMovie.length > 0 ? popularMovie[0].overview : 'No overview available.'}
            </Text>
          </View>
        </ImageBackground>
      )}
      <ScrollView>
        {/* Upcoming Movies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Movies</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={upcomingMovie}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Ensure a key
            renderItem={({ item }) => (
              <View style={styles.movieCardHorizontal}>
                <MovieCard movie={item} />
              </View>
            )}
          />
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Movies</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularMovie}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => (
              <View style={styles.movieCardHorizontal}>
                <MovieCard movie={item} />
              </View>
            )}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated Movie</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={topRatedMovie}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => (
              <View style={styles.movieCardHorizontal}>
                <MovieCard movie={item} />
              </View>
            )}
          />
        </View>
      </ScrollView>
      <View style={{ height: 20 }} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  featuredHeader: {
    width: '100%',
    height: 250, // More concise header
    marginBottom: 1,
    justifyContent: 'flex-end', // Content at the bottom,
    backgroundColor: '#1E1E1E'
  },
  featuredHeaderImage: {
    opacity: 0.5,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  featuredContent: {
    padding: 15,
    alignItems: 'flex-start',
  },
  featuredTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  featuredPoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  featuredOverview: {
    color: '#BDBDBD',
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    paddingVertical: 10,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  movieContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  movieCardHorizontal: {
    marginRight: 10,
  },
});

export default HomePage;
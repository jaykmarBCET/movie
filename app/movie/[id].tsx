import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useSearchParams } from 'expo-router/build/hooks'
import { useMovieStore } from '@/services/movie.store'
import { WebView } from 'react-native-webview'

const MovieInfo = () => {
  const searchParams = useSearchParams()
  const movieId = Number(searchParams.get('id'))
  const { getVideos, videos } = useMovieStore()

  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null)

  useEffect(() => {
    if (movieId) {
      getVideos(movieId)
    }
  }, [getVideos, movieId])

  useEffect(() => {
    if (videos?.length) {
      const defaultVideo = videos.find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer'
      )
      setSelectedVideoKey(defaultVideo?.key || videos[0].key)
    }
  }, [videos])

  return (
    <View style={styles.container}>
      <Text style={[styles.header, {marginTop:30, textAlign:'center'}]}>Watch Trailer</Text>

      {selectedVideoKey ? (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${selectedVideoKey}?controls=1&modestbranding=1` }}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            startInLoadingState
            renderLoading={() => <ActivityIndicator size="large" color="#fff" />}
          />
        </View>
      ) : (
        <Text style={styles.noVideoText}>No video available</Text>
      )}

      <Text style={styles.subHeader}>More Videos</Text>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedVideoKey(item.key)}
            style={[
              styles.videoItem,
              item.key === selectedVideoKey && styles.selectedItem,
            ]}
          >
            <Text style={styles.videoTitle}>{item.name}</Text>
            <Text style={styles.videoType}>{item.type}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Full black background
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  videoContainer: {
    width: '100%',
    height: (Dimensions.get('window').width * 9) / 16,
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  videoItem: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  selectedItem: {
    backgroundColor: '#333',
  },
  videoTitle: {
    fontSize: 16,
    color: '#fff',
  },
  videoType: {
    color: '#aaa',
    fontSize: 12,
  },
  noVideoText: {
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
})

export default MovieInfo

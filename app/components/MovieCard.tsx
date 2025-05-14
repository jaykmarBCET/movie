import { movieInfo } from '@/api/api';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.55;

interface MovieCardProps {
    movie: movieInfo
    onPress?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
    const router = useRouter()
    const backdropImage = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : 'https://via.placeholder.com/600x400?text=No+Backdrop'; // Fallback
    const posterImage = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Poster'; // Fallback
    const displayTitle = movie.title || movie.name || 'Untitled';
    const displayDate = movie.first_air_date ? movie.first_air_date.substring(0, 4) : movie.release_date; // Extract year
    const playVideo = (id:number)=>{
        router.push(`/movie/${id}`)
    }

    return (
        <TouchableOpacity onPress={()=>playVideo(movie.id)} activeOpacity={0.8} style={styles.touchable}>
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: backdropImage }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 16 }}
                >
                    {/* Gradient Effect Using a View */}
                    <View style={styles.gradient} />
                    <View style={styles.content}>
                        <Image source={{ uri: posterImage }} style={styles.poster} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{displayTitle}</Text>
                            <Text style={styles.subtitle}>
                                {displayDate} • ⭐ {movie.vote_average.toFixed(1)}
                            </Text>
                            <Text numberOfLines={2} style={styles.overview}>
                                {movie.overview}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        borderRadius: 16,
        overflow: 'hidden',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.5)', // Solid color overlay
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
    },
    poster: {
        width: 70,
        height: 105,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    subtitle: {
        color: '#ddd',
        fontSize: 13,
        marginVertical: 2,
    },
    overview: {
        color: '#aaa',
        fontSize: 12,
    },
});

export default MovieCard;

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';


const Loading = () => {
    return (
        <LinearGradient
            colors={['#ffcccc', colors.red]} // rojo suave a fuerte
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffffff" />
                <Text style={styles.titleText}>Cargando...</Text>
            </View>
        </LinearGradient>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start'

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    titleText: {
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.white
    }
})
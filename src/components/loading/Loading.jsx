import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';


const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.titleText}>Cargando...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    titleText:{
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        fontSize: 16,
        color : colors.black
    }
})
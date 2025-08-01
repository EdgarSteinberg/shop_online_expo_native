import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'


const ErrorMessage = ({ message }) => {
    return (
        <View style={styles.errorContainer}>
            <Text style={styles.titleText}>
                {typeof message === 'string' ? message : 'Ocurrió un error inesperado.'}
            </Text>
        </View>
    );
};

export default ErrorMessage

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    titleText: {
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.red
    }
})
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'
 

const ErrorMessage = () => {
  return (
       <View style={styles.errorContainer}>
                <Text style={styles.titleText}>Error al cargar las categorías.</Text>
            </View>
  )
}

export default ErrorMessage

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
     titleText:{
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.red
    }
})
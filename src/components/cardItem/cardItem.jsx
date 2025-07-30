import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const CardItem = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default CardItem;


const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        margin: '0 auto',
        backgroundColor: colors.grisClaro,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: 20, 
        margin: 8,
        width: '100%',  
        shadowColor: colors.black,
        elevation: 6,
        borderRadius:12
    }

});
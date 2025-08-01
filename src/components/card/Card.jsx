import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const Card = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        margin: '0 auto',
        backgroundColor: colors.lightGray,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: 6, 
        margin: 8,
        width: 180,  
        shadowColor: colors.black,
        elevation: 6,
        borderRadius:12,
        backgroundColor: colors.lightGray
    }

});
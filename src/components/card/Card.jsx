import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const Card = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: colors.lightGray,
        alignItems: 'center',
        paddingVertical: 24,
        margin: 16,
        shadowColor: colors.black,
        elevation: 6,
        borderEndStartRadius: 12,
        borderBottomLeftRadius: 12
    }
});
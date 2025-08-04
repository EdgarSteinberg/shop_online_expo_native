import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../components/theme/colors';
import { useGetOrdersByIdQuery, useGetOrderByIdQuery } from '../../services/orders/orders';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import CardItem from '../../components/cardItem/cardItem';

const OrdersByIdScreen = ({ navigation, route }) => {

    const userEmail = useSelector(state => state.userReducer.userEmail);
    /* const { data: ordersById, isLoading, error } = useGetOrdersByIdQuery(userEmail);
 */  const orderId = route?.params?.orderId;
    /*    console.log(orderId) */
    const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);


    if (isLoading) return <Loading />
    if (error) return <ErrorMessage message={`Error al cargar las órdenes. ${error?.message || error}`} />;

    return (
        <LinearGradient
            colors={['#ffcccc', colors.red]} // rojo suave a fuerte
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Text style={styles.title}>Detalle de la compra</Text>
            <CardItem>
                <View>
                    <Text style={styles.itemText}>Fecha: {order.date}</Text>
                    <Text style={styles.itemText}>Email: {order.email}</Text>

                    <View style={{ marginTop: 10 }}>
                        {order.items?.map((pr, index) => (
                            <Text key={index} style={styles.itemText}>• {pr.title} x {pr.quantity}</Text>
                        ))}
                    </View>
                    <Text style={styles.itemText}>Total: ${order.total}</Text>
                </View>
            </CardItem>

            <Pressable
                onPress={() => navigation.navigate('Shop', { screen: 'Categorias' })}
                style={styles.btn}
            >
                <Text style={styles.btnText}>Ir a Categorías</Text>
            </Pressable>
        </LinearGradient>
    )
}

export default OrdersByIdScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.red,
        paddingVertical: 34
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Poppins-bold',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 16
    },
    itemText: {
        textAlign: 'center',
        fontFamily: 'Poppins-bold',
        fontSize: 14,
        fontWeight: 'bold',

    },
    btn: {
        padding: 12,
        backgroundColor: colors.black,
        borderRadius: 16,
        marginTop: 24,
        width: 180,
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    },
})
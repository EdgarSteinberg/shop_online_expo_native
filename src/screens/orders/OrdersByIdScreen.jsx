import { FlatList, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../components/theme/colors';
import { useGetOrdersByIdQuery } from '../../services/orders/orders';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import CardItem from '../../components/cardItem/cardItem';

const OrdersByIdScreen = () => {
    const userEmail = useSelector(state => state.userReducer.userEmail);
    const { data: ordersById, isLoading, error } = useGetOrdersByIdQuery(userEmail);

    const renderOrder = ({ item }) => (
        <CardItem>
            <View >
                <Text style={styles.itemText}>Fecha: {item.date}</Text>
                <View style={{ marginTop: 10 }}>
                    {item.items?.map((pr, index) => (
                        <Text key={index} style={styles.itemText}>• {pr.title}</Text>
                    ))}
                </View>
                <Text  style={styles.itemText}>Total: ${item.total}</Text>
            </View>
        </CardItem>
    );

    if (isLoading) return <Loading />
    if (error) return <ErrorMessage message={`Error al cargar las órdenes. ${error?.message || error}`} />;

    return (
        <LinearGradient
            colors={['#ffcccc', colors.red]} // rojo suave a fuerte
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View>
                <Text style={styles.title}>OrdersByIdScreen</Text>
                <FlatList
                    data={ordersById}
                    renderItem={renderOrder}
                    keyExtractor={item => item.date}
                />
            </View>
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
})
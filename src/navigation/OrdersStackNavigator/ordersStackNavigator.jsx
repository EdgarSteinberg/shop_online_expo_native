import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../../components/header/Header';
import OrdersScreen from '../../screens/orders/OrdersScreen';
import OrdersByIdScreen from '../../screens/orders/OrdersByIdScreen';

const Stack = createNativeStackNavigator();

const OrdersStackNavigator = () => {

    return (
        <Stack.Navigator
            initialRouteName='Ordenes'
            screenOptions={{
                header: () => <Header />
            }}
        >
            <Stack.Screen name='Ordenes' component={OrdersScreen} />
            <Stack.Screen name='OrdenesId' component={OrdersByIdScreen} />
        </Stack.Navigator>
    )
}

export default OrdersStackNavigator;


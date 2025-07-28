import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../../components/header/Header';
import OrdersScreen from '../../screens/orders/OrdersScreen';

const Stack = createNativeStackNavigator();

const OrdersStackNavigator = () => {

    return(
        <Stack.Navigator
            initialRouteName='Ordenes'
            screenOptions={{
                header: () => <Header/>
            }}
        >
            <Stack.Screen name='Ordenes' component={OrdersScreen}/>
        </Stack.Navigator>
    )
}

export default OrdersStackNavigator;


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../../components/header/Header';
import CartScreen from '../../screens/cart/CartScreen';

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => {

    return(
        <Stack.Navigator
            initialRouteName='Carrito'
            screenOptions={{
                header: () => <Header/>
            }}
        >
            <Stack.Screen name='Carrito' component={CartScreen}/>
        </Stack.Navigator>
    )
}

export default CartStackNavigator;


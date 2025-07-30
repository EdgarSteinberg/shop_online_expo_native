import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from '../shopNavigator/shopStackNavigator';
import CartStackNavigator from '../cartStackNavigator/cartStackNavigator';
import OrdersStackNavigator from '../OrdersStackNavigator/ordersStackNavigator';
import ProfileStackNavigator from '../profileStackNavigator/profileStackNavigator';
import Icons from 'react-native-vector-icons/Entypo';
import { useWindowDimensions } from 'react-native';
import { colors } from '../../components/theme/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { width, height } = useWindowDimensions();
    console.log(width, height)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icons name='home' size={30} color={focused ? colors.grisOscuro : colors.grisClaro} />
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icons name='shopping-cart' size={24} color={focused ? colors.grisOscuro : colors.grisClaro} />
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icons name='ticket' size={24} color={focused ? colors.grisOscuro : colors.grisClaro} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <Icons name='user' size={24} color={focused ? colors.grisOscuro : colors.grisClaro} />
                }}
            />

        </Tab.Navigator>
    );
}

export default TabNavigator;
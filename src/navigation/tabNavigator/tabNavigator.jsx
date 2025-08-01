import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from '../shopNavigator/shopStackNavigator';
import CartStackNavigator from '../cartStackNavigator/cartStackNavigator';
import OrdersStackNavigator from '../OrdersStackNavigator/ordersStackNavigator';
import ProfileStackNavigator from '../profileStackNavigator/profileStackNavigator';
import Icons from 'react-native-vector-icons/Entypo';
import { useWindowDimensions } from 'react-native';
import { colors } from '../../components/theme/colors';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { width, height } = useWindowDimensions();

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
                    tabBarIcon: ({ focused }) => {
                        const totalQuantity = useSelector(state =>
                            state.cartReducer.cart.reduce((acc, item) => acc + item.quantity, 0)
                        );

                        return (
                            <View>
                                <Icons
                                    name="shopping-cart"
                                    size={24}
                                    color={focused ? colors.grisOscuro : colors.grisClaro}
                                />
                                {totalQuantity > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{totalQuantity}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    }
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


const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

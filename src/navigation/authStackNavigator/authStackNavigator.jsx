import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/LoginScren';
import SignupScreen from '../../screens/auth/SignupScreen';

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false
            }}
            
        >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />

        </Stack.Navigator>
    )
}

export default AuthStackNavigator;
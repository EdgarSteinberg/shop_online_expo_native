import ProfileScreen from "../../screens/user/profileScreen";
import Header from "../../components/header/Header";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {

    return (
        <Stack.Navigator
            initialRouteName="Perfil"
            screenOptions={{
                header: ({route}) => <Header title="Mundo Geek" subTitle={route.name}/>
            }}
        >
            <Stack.Screen name='Perfil'component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator;


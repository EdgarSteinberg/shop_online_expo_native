import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "../authStackNavigator/authStackNavigator";
import TabNavigator from '../tabNavigator/tabNavigator';
import { useSelector } from "react-redux";

const MainNavigator = () => {
 
    const userEmail = useSelector(state => state.userReducer.userEmail); 
    console.log(userEmail)
    return (
        <NavigationContainer>
            {
                userEmail ? <TabNavigator/> : <AuthStackNavigator/>
            }
        </NavigationContainer>
    )
}

export default MainNavigator;
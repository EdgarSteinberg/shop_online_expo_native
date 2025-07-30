import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "../authStackNavigator/authStackNavigator";
import TabNavigator from '../tabNavigator/tabNavigator';
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../../services/user/userApi";
import { setProfilePicture } from "../../features/user/userSlice";
import { useEffect } from "react";

const MainNavigator = () => {

    const userEmail = useSelector(state => state.userReducer.userEmail);
    const localId = useSelector(state => state.userReducer.localId);
    /* console.log(`email:`, userEmail, `localId:`, localId) */
    const dispatch = useDispatch();
    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId);

    useEffect(() => {
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image));
        }
    }, [profilePicture]);
    return (
        <NavigationContainer>
            {
                userEmail ? <TabNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator;
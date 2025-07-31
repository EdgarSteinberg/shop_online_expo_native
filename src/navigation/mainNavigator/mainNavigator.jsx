import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "../authStackNavigator/authStackNavigator";
import TabNavigator from '../tabNavigator/tabNavigator';
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../../services/user/userApi";
import { setProfilePicture, setUser } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { initSessionTable, getSession } from "../../db";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { StyleSheet } from "react-native";
import { colors } from "../../components/theme/colors";

const MainNavigator = () => {
    const [loading, setLoading] = useState(true);
    const userEmail = useSelector(state => state.userReducer.userEmail);
    const localId = useSelector(state => state.userReducer.localId);
    /* console.log(`email:`, userEmail, `localId:`, localId) */
    const dispatch = useDispatch();
    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId);

    useEffect(() => {
        const createTable = async () => {
            await initSessionTable();
            const session = await getSession();
            if (session) {
                console.log('session', session);
                dispatch(setUser({ email: session.email, localId: session.localId }));
            }
            setLoading(false);
        }
        createTable()
    }, []);

    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image));
        }
    }, [profilePicture]);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage />;

    // Spinner session
    if (loading) return <Loading />

    return (
        
        <NavigationContainer>
            {
                userEmail ? <TabNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator;
 
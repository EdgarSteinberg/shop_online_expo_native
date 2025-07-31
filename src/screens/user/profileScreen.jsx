import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { colors } from '../../components/theme/colors.js';
import * as ImagePicker from 'expo-image-picker';/*image - picker */
import Camera from '../../components/camera/Camera.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { usePutProfilePictureMutation } from '../../services/user/userApi.js';
import { setProfilePicture } from '../../features/user/userSlice.jsx';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {

    const user = useSelector(state => state.userReducer.userEmail);
    const localId = useSelector(state => state.userReducer.localId);
    const image = useSelector(state => state.userReducer.profilePicture);
    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();


    const dispatch = useDispatch();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        });

        console.log(result);

        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setProfilePicture(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })
        }
    };

    return (
        <LinearGradient
            colors={['#ffcccc', colors.red]} // rojo suave a fuerte
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.profileContainer}>
                <View style={styles.imageProfileContainer}>
                    {
                        image ? (
                            <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        ) : (
                            <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                        )
                    }
                    <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                        <Camera />
                    </Pressable>
                </View>
                <Text style={styles.correo}>Email: {user}</Text>
            </View>
        </LinearGradient>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: colors.red,
        paddingVertical: 34
    },
    profileContainer: {
        paddingTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.white,
        fontSize: 48,
    },
    correo: {
        paddingVertical: 16,
        fontSize: 20,
        fontFamily: 'Poppins-bold',
        fontWeight: 'bold'
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },

})
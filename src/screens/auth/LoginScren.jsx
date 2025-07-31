import { StyleSheet, Text, View, Pressable, Dimensions, TextInput, Switch } from "react-native";
import { colors } from "../../components/theme/colors";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { LinearGradient } from 'expo-linear-gradient';
import { clearSession, saveSession } from "../../db";


const textInputWidth = Dimensions.get('window').width * 0.7;

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [persistSession, setPersistSession] = useState(false);
    console.log(persistSession)
    const [triggerLogin, result] = useLoginMutation();

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (email.trim() === '' || password.trim() === '') {
            setError(true);
            setMessageError('No puedes enviar datos vacíos!');
            return;
        }
        triggerLogin({
            email, password
        })
    }
    /* 
        useEffect(() => {
            if (result.status === 'fulfilled') {
                dispatch(setUser({ email: result.data.email, localId: result.data.localId }));
                setError(false);
            } else if (result.status === 'rejected') {
                setError(true);
                setMessageError('Credenciales invalidas!');
                return;
            }
        }, [result]); */

    useEffect(() => {
        const saveLoginSession = async () => {
            if (result.status === 'fulfilled') {
                try {
                    const { localId, email } = result.data;
                    if (persistSession) {
                        await saveSession(localId, email);
                    } else {
                        await clearSession();
                    }
                     dispatch(setUser({ localId, email }));
                } catch (error) {
                    setError(true);
                    console.error(error);
                    setMessageError('Error al persistir sesión');
                    return;
                }
            } else if (result.status === 'rejected') {
                setError(true);
                setMessageError('Credenciales invalidas!');
                return;
            }
        }
        saveLoginSession();
    }, [result])

    useEffect(() => {
        setError(false)

    }, [email, password]);

    return (
        <LinearGradient
            colors={['#ffcccc', colors.red]} // rojo suave a fuerte
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View  >
                {

                    error && <Text style={styles.errorText}>{messageError}</Text>

                }
                <Text style={styles.title}>BodegónApp!</Text>
                <Text style={styles.subTitle}>Inicia sesión</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor={colors.black}
                        placeholder="Email"
                        style={styles.textInput}
                    />
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor={colors.black}
                        placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cuentaText}>¿No tienes una cuenta?</Text>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.crearText}>Click aqui!</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.btn} onPress={handleSubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
                <View style={styles.sessionContainer}>
                    <Text style={styles.sessionText}>Mantener la sesíon iniciada?</Text>
                    <Switch
                        onValueChange={() => setPersistSession(!persistSession)}
                        value={persistSession}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                    />
                </View>
            </View>
        </LinearGradient>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red
    },
    title: {
        color: colors.black,
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 30,
        alignItems: 'center',
    },
    textInput: {
        padding: 10,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.white,
        width: textInputWidth,
        color: colors.black,
        fontWeight: 'bold'
    },
    textContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    cuentaText: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 18,
    },
    crearText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 12,
        backgroundColor: colors.black,
        borderRadius: 16,
        marginTop: 24,
        width: 180,
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    },
    errorText: {
        padding: 12,
        backgroundColor: 'transparent',
        borderRadius: 8,
        color: colors.red,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
    },
    sessionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    sessionText: {
        color: colors.black,
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold'
    }
})
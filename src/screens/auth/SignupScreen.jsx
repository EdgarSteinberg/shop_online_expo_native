import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../components/theme/colors';
import { useEffect, useState } from 'react';
import { useSignupMutation } from '../../services/auth/authApi';
import { LinearGradient } from 'expo-linear-gradient';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const [triggerSignup, result] = useSignupMutation();

    const handleSubmit = () => {
        if (email.trim() === '' && password.trim() === '') {
            setError(true);
            setMessageError('No puedes enviar datos vacios!');
        }

        if (password !== confirmPassword) {
            setError(true);
            setMessageError('Las contraseñas no coinciden!');

            return;
        }
        triggerSignup({ email, password });
    };

    console.log(result)

    useEffect(() => {
        if (result.status === 'fulfilled') {
            navigation.navigate('Login');
        }
    }, [result]); // 


    useEffect(() => {
        setError(false);
    }, [email, password]);

    return (
        <LinearGradient
            colors={['#ffcccc', colors.red]} // rojo suave a fuerte
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View >
                {
                    error && <Text style={styles.errorText}>{messageError}</Text>
                }
                <Text style={styles.title}>BodegónApp!</Text>
                <Text style={styles.subTitle}>Registrate</Text>
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
                    <TextInput
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholderTextColor={colors.black}
                        placeholder='Confirmar contraseña:'
                        style={styles.textInput}
                        secureTextEntry
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cuentaText}>¿Ya tienes una cuenta?</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.crearText}>Iniciar sesión</Text>
                    </Pressable>
                </View>

                <Pressable style={styles.btn} onPress={handleSubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>

            </View>
        </LinearGradient>
    )
}

export default SignupScreen;

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
})
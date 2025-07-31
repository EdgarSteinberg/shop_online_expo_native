import { Pressable, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { useCreateOrderMutation } from '../../services/orders/orders';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { useState } from 'react';
import { colors } from '../../components/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';


const textInputWidth = Dimensions.get('window').width * 0.7

const OrdersScreen = () => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [triggerCreateOrder, { isLoading, error }] = useCreateOrderMutation();
  const userEmail = useSelector(state => state.userReducer.userEmail);
  const cart = useSelector(state => state.cartReducer.cart);
  const total = useSelector(state => state.cartReducer.total);


  const handleCreateOrder = () => {
    const newOrder = {
      userId: userEmail,
      name,
      last_name,
      email,
      items: [...cart],
      total,
      date: new Date().toISOString(),
    };

    triggerCreateOrder(newOrder);
  };

  if (isLoading) return <Loading />
  if (error) return <ErrorMessage />

  return (
    <LinearGradient
      colors={['#ffcccc', colors.red]} // rojo suave a fuerte
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.subTitle}>Completar compra</Text>
      <View style={styles.inputContainer}>

        <TextInput
          onChangeText={(text) => setName(text)}
          placeholderTextColor={colors.black}
          placeholder='Nombre'
          style={styles.textInput}
          secureTextEntry
        />
        <TextInput
          onChangeText={(text) => setLastName(text)}
          placeholderTextColor={colors.black}
          placeholder='Apellido'
          style={styles.textInput}
          secureTextEntry
        />
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.black}
          placeholder="Email"
          style={styles.textInput}
        />

      </View>
      <View style={styles.textContainer}>
        <Pressable onPress={handleCreateOrder} style={styles.button}>
          <Text style={styles.buttonText}>Comprar</Text>
        </Pressable>
      </View>
    </LinearGradient>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: colors.red,
    paddingVertical: 34
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
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
  button: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
    width:286
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

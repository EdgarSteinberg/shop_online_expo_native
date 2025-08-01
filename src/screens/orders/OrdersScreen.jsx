import { Pressable, StyleSheet, Text, View, TextInput, Dimensions, FlatList } from 'react-native';
import { useCreateOrderMutation } from '../../services/orders/orders';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { useState } from 'react';
import { colors } from '../../components/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import { clearCart } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';


const textInputWidth = Dimensions.get('window').width * 0.7;

const OrdersScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const [triggerCreateOrder, { isLoading, error }] = useCreateOrderMutation();
  const userEmail = useSelector(state => state.userReducer.userEmail);
  const cart = useSelector(state => state.cartReducer.cart);
  const total = useSelector(state => state.cartReducer.total);


  const handleCreateOrder = async () => {
    const newOrder = {
      userId: userEmail,
      name,
      last_name,
      email,
      items: [...cart],
      total,
      date: new Date().toISOString(),
    };

    await triggerCreateOrder(newOrder).unwrap(); // <- Esto espera que la promesa termine correctamente
    dispatch(clearCart()); // ✅ Vaciás el carrito
  };

  const handleCart = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text>{item.title}</Text>
      <Text> Cantidad:{item.quantity}</Text>
      <Text> ${item.price}</Text>
    </View>
  );

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
      {
        cart.length > 0 && (
          <>
            <FlatList
              data={cart}
              renderItem={handleCart}
              keyExtractor={item => item.id}
              style={{ maxHeight: height * 0.1 }} // 30% del alto de pantalla
              scrollEnabled={cart.length > 3} // solo scroll si hay muchos productos
            />
            <Text>Total de la compra: ${total}</Text>
          </>
        )
      }
      <View style={styles.inputContainer}>

        <TextInput
          onChangeText={(text) => setName(text)}
          placeholderTextColor={colors.black}
          placeholder='Nombre'
          style={styles.textInput}

        />
        <TextInput
          onChangeText={(text) => setLastName(text)}
          placeholderTextColor={colors.black}
          placeholder='Apellido'
          style={styles.textInput}

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

      <Pressable onPress={() => navigation.navigate('OrdenesId')}>
        <Text>Orden</Text>
      </Pressable>
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
    width: 286
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7
  }
});

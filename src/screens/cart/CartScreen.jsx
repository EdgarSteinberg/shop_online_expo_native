import { FlatList, StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import CardItem from '../../components/cardItem/cardItem';
import { colors } from '../../components/theme/colors';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { deleteProduct, clearCart } from '../../features/cart/cartSlice';

const CartScreen = () => {
  const cart = useSelector(state => state.cartReducer.cart);
  const total = useSelector(state => state.cartReducer.total);

  const dispatch = useDispatch();

  const cartRender = ({ item }) => {
    return (

      <CardItem>
        <Text style={styles.titleProduct}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Image
          source={{ uri: item.image }}
          style={styles.img}
        />
        <Text style={styles.cantidad}>Cantidad: {item.quantity}</Text>
        <Text style={styles.price}>Precio unitario: ${item.price}</Text>
        <Text style={styles.total}>Total: ${item.price * item.quantity}</Text>
        <Pressable onPress={() => dispatch(deleteProduct(item.id))} >
          <Icon name='trash-2' size={28} color={colors.red} />
        </Pressable>
      </CardItem>

    );
  };

  const renderFooter = () => (
    <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Total: ${total}</Text>
      <Pressable onPress={() => dispatch(clearCart())}>
        <Icon name="trash-2" size={28} color={colors.red} />
      </Pressable>
    </View>
  );

  return (
    <>
      {
        cart.length > 0 ? (
          <FlatList
            data={cart}
            renderItem={cartRender}
            keyExtractor={item => item.id}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <View style={styles.containerTitleClear}>
            <Text style={styles.titleClearText}>El carrito esta vacio</Text>
          </View>
        )
      }
    </>
  );
}

export default CartScreen

const styles = StyleSheet.create({

  containerTitleClear: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 220,
  },
  titleClearText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-bold',
    fontWeight: 'bold',
  },
  titleProduct: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 4,
    color: colors.black
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  cantidad: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 8,
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.darkGray,
  },
  total: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.black,
    marginTop: 6,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 12
  },
  totalContainer: {
      flexDirection: 'row',
      justifyContent: 'center', 
      alignSelf: 'center',
      gap: 10,
      marginVertical: 10
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 4,
    color: colors.black,
    fontSize: 24
  },

})
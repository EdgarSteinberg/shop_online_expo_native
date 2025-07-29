import { FlatList, StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import Card from '../../components/card/Card';
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

      <Card>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
        />
        <Text>Cantidad: {item.quantity}</Text>
        <Text>Precio unitario: ${item.price}</Text>
        <Text>Total: ${item.price * item.quantity}</Text>
        <Pressable onPress={() => dispatch(deleteProduct(item.id))} >
          <Icon name='trash-2' size={32} color={colors.red} />
        </Pressable>
      </Card>

    );
  };

  const renderFooter = () => (
    <View>
      <Text>Total: ${total}</Text>
      <Pressable onPress={() => dispatch(clearCart())}>
        <Icon name="trash-2" size={32} color={colors.red} />
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

            ListHeaderComponent={() => <Text>CartScreen</Text>}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Text>El carrito esta vacio</Text>
        )
      }
    </>
  );
}

export default CartScreen

const styles = StyleSheet.create({})
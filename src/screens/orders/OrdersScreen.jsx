import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCreateOrderMutation } from '../../services/orders/orders';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

const OrdersScreen = () => {
  const [triggerCreateOrder, { isLoading, error }] = useCreateOrderMutation();
  const userEmail = useSelector(state => state.userReducer.userEmail);
  const cart = useSelector(state => state.cartReducer.cart);
  const total = useSelector(state => state.cartReducer.total);


  const handleCreateOrder = () => {
    const newOrder = {
      userId: userEmail,
      items: [...cart],
      total,
      date: new Date().toISOString(),
    };

    triggerCreateOrder(newOrder);
  };

  if (isLoading) return <Loading />
  if (error) return <ErrorMessage />

  return (
    <View>
      <Text>OrdersScreen</Text>
      <Pressable onPress={handleCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </Pressable>
    </View>
  )
}

export default OrdersScreen

 const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

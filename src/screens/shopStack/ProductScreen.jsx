import { View, Text, Image, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../components/theme/colors';
import { addItem } from '../../features/cart/cartSlice';
import Counter from '../../components/counter/counter';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const ProductDetailScreen = ({ navigation }) => {
  const product = useSelector(state => state.shopReducer.productSelected);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

 
  if (!product) {
    return <Text>No hay producto seleccionado</Text>;
  }

  return (
    <LinearGradient
      colors={['#ffcccc', colors.red]} // rojo suave a fuerte
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.productContainer}>
        <Image
          source={{ uri: product.image }}
          alt={product.title}
          width='100%'
          height={width * .7}
          resizeMode='contain'
        />
        <Text style={styles.textTitle}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Precio: ${product.price}</Text>

        <View style={styles.btnContainer}>
          <Counter setQuantity={setQuantity} />

          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
            onPress={
              () => {
                dispatch(addItem({ product: product, quantity }))
                navigation.navigate('Cart')
              }} >
            <Text style={styles.textAddToCart}>Agregar al carrito</Text>
          </Pressable>
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start'
  },
  img: {
    borderRadius: 9
  },
  productContainer: {
    paddingHorizontal: 16,
    margin: '0 auto',
    backgroundColor: colors.white
  },
  textBrand: {
    color: colors.grisOscuro,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.black
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 8,
    color: colors.black

  },
  btnContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 10,
    color: colors.black

  },
  addToCartButton: {
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.red,
    borderRadius: 16,
    marginVertical: 16
  },
  textAddToCart: {
    color: colors.white,
    fontSize: 22,
    textAlign: 'center',
  }
})
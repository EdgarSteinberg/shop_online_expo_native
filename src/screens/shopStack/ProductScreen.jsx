import { View, Text, Image, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../components/theme/colors';
import { addItem } from '../../features/cart/cartSlice';
import Counter from '../../components/counter/counter';
import { useState } from 'react';

const ProductDetailScreen = () => {
  const product = useSelector(state => state.shopReducer.productSelected);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1)
  console.log('quantity', quantity)
  if (!product) {
    return <Text>No hay producto seleccionado</Text>;
  }

  return (
    <ScrollView style={styles.productContainer}>
      <Image
        source={{ uri: product.image }}
        alt={product.title}
        width='100%'
        height={width * .7}
        resizeMode='contain'
      />
      <Text style={styles.textTitle}>{product.title}</Text>
      <Text style={styles.longDescription}>{product.description}</Text>
      <Text style={styles.textBrand}>{product.brand}</Text>
      <Text style={styles.price}>Precio: ${product.price}</Text>

      <View style={styles.tags}>
        <Counter setQuantity={setQuantity} />

        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
          onPress={() => dispatch(addItem({ product: product, quantity }))}>
          <Text style={styles.textAddToCart}>Agregar al carrito</Text>
        </Pressable>
      </View>

    </ScrollView>
  )
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  productContainer: {
    paddingHorizontal: 16,
    marginVertical: 16
  },
  textBrand: {
    color: colors.grisOscuro,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center'
  },
  longDescription: {
    fontSize: 16,
    textAlign: 'justify',
    paddingVertical: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  },
  tags: {
    flexDirection: 'row',
    gap: 5,
  },
  tagText: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.purple
  },
  price: {
    fontWeight: '800',
    fontSize: 18,
 
  },
  discount: {
    backgroundColor: colors.brightOrange,
    width: 52,
    height: 52,
    borderRadius: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  discountText: {
    color: colors.white,
    textAlign: 'center',
    verticalAlign: 'center'
  },
  noStockText: {
    color: colors.red
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
     
  },
  addToCartButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.red,
    borderRadius: 16,
    marginVertical: 16
  },
  textAddToCart: {
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
  }
})
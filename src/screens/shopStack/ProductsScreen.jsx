import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/card/Card';
import { setProductSelected } from '../../features/shop/shopSlice';

const ProductsScreen = ({ navigation }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    const products = useSelector(state => state.shopReducer.products);
    const category = useSelector(state => state.shopReducer.categorySelected);
    const productsFilterCategory = useSelector(state => state.shopReducer.productsFiltredByCategory);

    const dispatch = useDispatch();

    useEffect(() => {
        setFilteredProducts(productsFilterCategory);
    }, [category]);

    const renderProducts = ({ item }) => {
        return (
            <Pressable onPress={
                () => {
                    dispatch(setProductSelected(item))
                    navigation.navigate('Producto');
                }}>
                <Card>
                    <View style={styles.ProductContainer}>
                        <Text>{item.title}</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                                resizeMode="contain"
                            />

                        </View>
                    </View>
                </Card>
            </Pressable>

        );
    };

    return (
        <View>
            <FlatList
                data={filteredProducts}
                renderItem={renderProducts}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Poppins-Bold'
    },
    ProductContainer: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
    },
});

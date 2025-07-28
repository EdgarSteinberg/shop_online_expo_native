import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import products from '../../data/products.json';
import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';

const ProductsScreen = ({ route,navigation }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { category } = route.params;


    useEffect(() => {
        const filter = products.filter(
            product =>
                product.categoryId === category

        );
        setFilteredProducts(filter);
    }, [category]);

    const renderProducts = ({ item }) => {
        return (
            <Pressable onPress={() => navigation.navigate('Producto', {product: item})}>
                <Card>
                    <View style={styles.ProductContainer}>
                        <Text style={styles.title}>{item.title}</Text>
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

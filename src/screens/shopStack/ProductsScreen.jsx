import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/card/Card';
import { setProductSelected } from '../../features/shop/shopSlice';
import { useGetProductsByCategoryQuery } from '../../services/shop/shopApi';
import { useWindowDimensions } from 'react-native';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../components/theme/colors';

const ProductsScreen = ({ navigation }) => {
    const windowWidth = useWindowDimensions().width;
    const numColumns = windowWidth > 600 ? 2 : 1;
    const [filteredProducts, setFilteredProducts] = useState([]);

    const products = useSelector(state => state.shopReducer.products);
    const category = useSelector(state => state.shopReducer.categorySelected);

    const { data: productsFilterCategory, isLoading, error } = useGetProductsByCategoryQuery(category);

    const dispatch = useDispatch();

    useEffect(() => {
        if (productsFilterCategory && category) {
            setFilteredProducts(productsFilterCategory);
        }
    }, [productsFilterCategory, category]);

    const renderProducts = ({ item }) => {
        return (
            <Pressable onPress={
                () => {
                    dispatch(setProductSelected(item))
                    navigation.navigate('Producto');
                }}>
                <Card>
                    <View style={styles.ProductContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                                resizeMode="corven"
                            />
                            <Text style={styles.title}>{item.title}</Text>

                        </View>
                    </View>
                </Card>
            </Pressable>

        );
    };
    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <ErrorMessage />
        );
    }
    return (
        <LinearGradient
            colors={['#ffcccc', colors.red]} // rojo suave a fuerte
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <FlatList
                data={filteredProducts}
                renderItem={renderProducts}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.cardContainer}
            />
        </LinearGradient>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start'
    },
    cardContainer: {
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        textAlign: 'center'
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

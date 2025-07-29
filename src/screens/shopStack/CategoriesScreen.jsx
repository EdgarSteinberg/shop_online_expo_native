import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import Card from '../../components/card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorieSelected, filterProducts } from '../../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../../services/shop/shopApi';

const CategoriesScreen = ({ navigation }) => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    const dispatch = useDispatch();

    const renderCategoryItem = ({ item }) => (
        <Pressable
            onPress={() => {
                dispatch(setCategorieSelected(item.id));
                dispatch(filterProducts());
                navigation.navigate('Productos');
            }}
        >
            <Card>
                <View style={styles.categoryContainer}>
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

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando categorías...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Error al cargar las categorías.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Poppins-Bold'
    },
    categoryContainer: {
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
        objectFit: 'cover',
        borderRadius: 50,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import Card from '../../components/card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorieSelected, filterProducts } from '../../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../../services/shop/shopApi';
import { useWindowDimensions } from 'react-native';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';

const CategoriesScreen = ({ navigation }) => {
    const windowWidth = useWindowDimensions().width;
    const numColumns = windowWidth > 600 ? 2 : 1;
    
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
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </View>
            </Card>
        </Pressable>
    );

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    if (error) {
        return (
            <ErrorMessage/>
        );
    }

    return (
        <FlatList
            key={numColumns}
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.cardContainer}
        />
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    },
    categoryContainer: {
        flexDirection: 'column',
        gap: 10,
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
    
});
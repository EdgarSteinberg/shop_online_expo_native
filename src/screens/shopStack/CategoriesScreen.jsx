import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import Card from '../../components/card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorieSelected , filterProducts} from '../../features/shop/shopSlice';

const CategoriesScreen = ({ navigation }) => {
    const categories = useSelector(state => state.shopReducer.categories);

    const dispatch = useDispatch();

    const renderCategoryItem = ({ item }) => (
        <Pressable
            onPress={
                () => {
                    dispatch(setCategorieSelected(item.id));
                    dispatch(filterProducts());
                    navigation.navigate('Productos');
                }
                }>

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

    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
        />
    )
}

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
});
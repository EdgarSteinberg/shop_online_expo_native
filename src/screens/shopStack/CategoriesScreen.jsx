import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import Card from '../../components/card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorieSelected, filterProducts } from '../../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../../services/shop/shopApi';
import { useWindowDimensions } from 'react-native';
import Loading from '../../components/loading/Loading';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../components/theme/colors';

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
                    </View>
                        <Text style={styles.title}>{item.title}</Text>
                </View>
            </Card>
        </Pressable>
    );

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
                key={numColumns}
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.cardContainer}
            />
        </LinearGradient>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start'

    },
    cardContainer: {
        alignItems: 'center',
        padding: 10,
        
    },
    title: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
       
    },
    categoryContainer: {
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    imageContainer: {
        width: 100,
        height: 100,
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
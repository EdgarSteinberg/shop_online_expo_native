import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import Search from '../search/Search';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategorieSelected } from '../../features/shop/shopSlice';
import { filterProducts } from '../../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../../services/shop/shopApi';
import { useGetProductsByCategoryQuery } from '../../services/shop/shopApi';
import { setProductSelected } from '../../features/shop/shopSlice';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loading from "../loading/Loading";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();
  const dispatch = useDispatch();

  const { data: categories, isLoading, error } = useGetCategoriesQuery();
/*   const { data: productFilter, isLoading, error } = useGetProductsByCategoryQuery(category); */

  useEffect(() => {
    if (!categories || searchQuery.trim() === '') return;

    const query = searchQuery.toLowerCase();

    const filteredCategory = categories.find((cat) =>
      cat.title.toLowerCase().includes(query)
    );

    if (filteredCategory) {
      dispatch(setCategorieSelected(filteredCategory.id));
      dispatch(filterProducts());
      navigation.navigate('Productos');
      setSearchQuery('');
    }
  }, [searchQuery, categories]);

  if (isLoading) return <Loading />

  if (error) return <ErrorMessage />

  return (
    <View style={styles.container}>
      <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      {/*    <Text style={styles.titleText}>{title}</Text> */}
      {
        canGoBack &&
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()} >
          <Icon name='chevrons-left' size={32} color={colors.white} />
        </Pressable>
      }
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.red,
    
  },
  titleText: {
    fontSize: 34,
    color: '#fff'
  },
  goBack: {
    positiom: 'absolute',
    botton: 100,
    right: 180
  }
});
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../../screens/shopStack/CategoriesScreen';
import ProductsScreen from '../../screens/shopStack/ProductsScreen';
import ProductScreen from '../../screens/shopStack/ProductScreen';
import Header from '../../components/header/Header';

const Stack = createNativeStackNavigator();

const ShopStackNavigator = () => {
  return (
     <Stack.Navigator
      initialRouteName='Categorias'
      screenOptions={{
        header: () => <Header/>
      }}
      >
        
       <Stack.Screen name='Categorias' component={CategoriesScreen}   />
       <Stack.Screen name='Productos' component={ProductsScreen}   />
       <Stack.Screen name='Producto' component={ProductScreen}   />
       
     </Stack.Navigator>
     
  )
}

export default ShopStackNavigator;

 
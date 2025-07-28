import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import Search from '../search/Search';
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/Feather';

const Header = ({ title, searchQuery, setSearchQuery }) => {
  const navigation = useNavigation();
  
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
   {/*    <Text style={styles.titleText}>{title}</Text> */}
   {
    canGoBack && 
    <Pressable style={styles.goBack} onPress={() => navigation.goBack()} >
      <Icon name='chevrons-left' size={32} color={colors.white}/>
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
  goBack:{
    positiom: 'absolute',
    botton: 200,
    right: 180
  }
});
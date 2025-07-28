import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const SearchInput = ({searchQuery, setSearchQuery}) => {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar productos..."
                placeholderTextColor="#000"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <Ionicons name="search" size={20} color={colors.red} style={styles.icon} />
        </View>
    );
};

export default SearchInput;

const styles = StyleSheet.create({
 container: {
  width: 400,
  height: 45,
  justifyContent: 'center',
  marginTop: 70,
  backgroundColor: 'rgba(0,0,255,0.1)', // <- azul clarito para ver el contenedor
},
  input: {
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 35, // espacio para el ícono
    paddingRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -10 }], // para centrar verticalmente el ícono de 20px
    zIndex: 1,
  },
});

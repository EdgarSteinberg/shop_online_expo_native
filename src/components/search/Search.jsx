import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: "https://i.postimg.cc/fSW3yJF0/p-rellena.webp" }}
        style={styles.image}
      /> */}
      <Text style={styles.title}>BodegónApp!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar productos..."
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Ionicons name="search" size={20} color={colors.red} style={styles.icon} />
      </View>

    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 40
  },
 
  container: {
    width: 400,
    marginTop: 1,
    alignItems: 'center',
    paddingBottom: 4,
  },
  inputContainer: {
    width: '95%',
    height: 45,
    justifyContent: 'center',
  },
  input: {
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 35,
    paddingRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',

  },
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  image: {
    width: 400,
    height: 140,
    marginTop: 10,
    resizeMode: 'corver',
    borderRadius: 12,

  },
});

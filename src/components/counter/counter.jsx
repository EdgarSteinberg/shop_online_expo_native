import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const Counter = ({ setQuantity }) => {
    const [counter, setCounter] = useState(1);

    const increment = () => {
        setCounter(prev => prev + 1);
    };

    const decrement = () => {
        if (counter > 1) {
            setCounter(prev => prev - 1);
        }
    };

    useEffect(() => {
        setQuantity(counter)
    }, [counter])

    return (
        <View style={styles.container}>
            <Pressable onPress={decrement} style={styles.button}>
                <Text style={styles.symbol}>-</Text>
            </Pressable>
            <Text style={styles.count}>{counter}</Text>
            <Pressable onPress={increment} style={styles.button}>
                <Text style={styles.symbol}>+</Text>
            </Pressable>
        </View>
    );
};

export default Counter;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#ddd',
        borderRadius: 16,
        width: '36%',           
        alignSelf: 'center'    
    },
    button: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 5,
        marginHorizontal: 10
    },
    symbol: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    count: {
        fontSize: 18,
        fontWeight: '500'
    }
});

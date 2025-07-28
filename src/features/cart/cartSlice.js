import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        total: 0,
        date: new Date().toLocaleString()
    },
    reducers: {
        addItem: (state, action) => {
            const { product, quantity } = action.payload;
            console.log('Agregando producto al carrito', product, 'cantidad', quantity);

            const productInCart = state.cart.find((item) => item.id === product.id);

            if (productInCart) {
                productInCart.quantity += quantity;
            } else {
                state.cart.push({ ...product, quantity });
            }

            state.total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.date = new Date().toLocaleString();
            console.log(current(state.cart));
        },
        deleteProduct: (state, action) => {
            const productId = action.payload;

            // Filtramos el producto a eliminar
            state.cart = state.cart.filter((item) => item.id !== productId);

            // Recalculamos el total
            state.total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            // Actualizamos la fecha
            state.date = new Date().toLocaleString();

            // Log de control (opcional)
            /* console.log(current(state.cart)); */
        }
    }
});

export const { addItem, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;

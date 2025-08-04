import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL;

export const ordersApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `orders.json`,
        }),

        getOrdersById: builder.query({
            query: (userEmail) =>
                `orders.json?orderBy="userId"&equalTo="${userEmail}"`,
            transformResponse: (response) => Object.values(response),
        }),
        getOrderById: builder.query({
            query: (orderId) => `orders/${orderId}.json`,
        }),
        createOrder: builder.mutation({
            query: (orderData) => {
                console.log('Enviando orden', orderData);
                return {
                    url: 'orders.json',
                    method: 'POST',
                    body: orderData,
                };
            },
        }),
    }),
});

export const { useGetOrdersQuery, useGetOrdersByIdQuery, useCreateOrderMutation, useGetOrderByIdQuery} = ordersApi;
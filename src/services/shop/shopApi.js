import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL;

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseRTDBURL }),
    endpoints: (builder) => ({
        getCategories: builder.query({ query: () => 'categories.json' }),

        getProductsByCategory: builder.query({
            query: (categoryId) =>
                `products.json?orderBy="categoryId"&equalTo=${categoryId}`,

            transformResponse: (response) => {
                return Object.values(response)
            }
        })
    })
});


export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi;

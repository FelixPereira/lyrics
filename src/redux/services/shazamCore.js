import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '096a94f349mshf718d724429a544p1208d1jsn12614840c9d8');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongsDetails: builder.query({ query: (songid) => `/tracks/details?track_id=${songid}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsDetailsQuery,
} = shazamCoreApi;

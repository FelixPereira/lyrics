/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(countryCode);

  const whereAmI = (latitude, longitude) => {
    axios.get(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=330610516493881468693x29960`)
      .then((response) => {
        setCountryCode(response.data.prov);
        setCountryName(response.data.country);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((posiction) => {
      const { latitude } = posiction.coords;
      const { longitude } = posiction.coords;

      whereAmI(latitude, longitude);
    });
  }, [countryCode]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error && countryCode) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Most playes in  <span className="font-black">{countryName}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-centr gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default AroundYou;

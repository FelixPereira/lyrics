import { useParams } from 'react-router-dom';

const ArtistDetails = () => {
  const { songId } = useParams();
  return <div>{songId}</div>;
};

export default ArtistDetails;

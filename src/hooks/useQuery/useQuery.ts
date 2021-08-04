import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

const useQuery = () => {
  const { search } = useLocation();
  return parse(search, { ignoreQueryPrefix: true });
};

export default useQuery;

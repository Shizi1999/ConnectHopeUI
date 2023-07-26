import { useSearchParams } from 'react-router-dom';

export function useQueryString() {
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries([...searchParams]);
  return searchParamsObject;
}

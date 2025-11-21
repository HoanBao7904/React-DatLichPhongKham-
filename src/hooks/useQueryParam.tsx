import { useSearchParams } from 'react-router-dom'

export default function useQueryParam() {
  //đây là hook lấy được queryParam trên URL
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}

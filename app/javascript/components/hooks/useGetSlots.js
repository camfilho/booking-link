import { useQuery } from "@tanstack/react-query";

export default function useGetSlots({ date }) {
  const getSlots = () =>
    fetch("/api/v1/slots?date=" + String(date)).then((res) => res.json());

  return useQuery({
    queryKey: [`querySlots${String(date)}`],
    queryFn: getSlots,
  });
}

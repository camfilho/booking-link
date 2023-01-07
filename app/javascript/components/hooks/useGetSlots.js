import { useQuery } from "@tanstack/react-query";

export default function useGetSlots({ date, duration }) {
  const getSlots = () =>
    fetch(`/api/v1/slots?date=${String(date)}&duration=${duration}`).then(
      (res) => res.json()
    );

  return useQuery({
    queryKey: [`querySlots${String(date)}${duration}}`],
    queryFn: getSlots,
  });
}

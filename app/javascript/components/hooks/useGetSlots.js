import { useQuery } from "@tanstack/react-query";

export default function useGetSlots({ date, duration, setAlertData }) {
  const getSlots = () =>
    fetch(`/api/v1/slots?date=${String(date)}&duration=${duration}`).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((error) => Promise.reject(error));
      }
    );

  return useQuery({
    queryKey: [`querySlots${String(date)}${duration}}`],
    queryFn: getSlots,
    onError: (error) => {
      setAlertData({
        message: { error },
        success: false,
        open: true,
      });
    },
    retry: false,
  });
}

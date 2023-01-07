import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePostSlot({ duration, setAlertData }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dateTime) => {
      const token = document.querySelector('meta[name="csrf-token"]').content;

      return fetch("/api/v1/slots", {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: {
            date_time: dateTime,
            duration: duration,
          },
        }),
      }).then((response, error) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((error) => Promise.reject(error));
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      setAlertData({
        message: {
          endDate: `${data.end.slice(0, 10)} ${data.end.slice(11, 16)}`,
          startDate: `${data.start.slice(0, 10)} ${data.start.slice(11, 16)}`,
        },
        success: true,
        open: true,
      });
    },
    onError: (error) => {
      console.log(error);
      setAlertData({
        message: { error },
        success: false,
        open: true,
      });
      console.error(error);
    },
  });
}

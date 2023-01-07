import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SlotsChannel from "../../channels/slots_channel";

const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    SlotsChannel.received = () => {
      queryClient.invalidateQueries();
    };
  }, []);
};
export default useReactQuerySubscription;

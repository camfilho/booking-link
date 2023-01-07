import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SlotsChannel from "../../channels/slots_channel";

const useReactQuerySubscription = ({date}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    SlotsChannel.received = () => {
      queryClient.invalidateQueries(`querySlots${String(date)}`);
    };
  }, []);
};
export default useReactQuerySubscription;

import consumer from "./consumer";

const SlotsChannel = consumer.subscriptions.create("SlotsChannel", {
  connected() {},

  disconnected() {},

  received(data) {},
});

export default SlotsChannel;

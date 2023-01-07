class SlotsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'slots'
  end

  def unsubscribed; end
end

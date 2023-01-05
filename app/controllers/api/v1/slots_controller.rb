module Api
  module V1
    class SlotsController < ApplicationController
      def index
        date = DateTime.parse(params[:date].to_s)
        slots = Slot.get_by_date(date) + Slot.get_by_date(date + 1.day)

        render json: slots.map { { id: _1.id, start: _1.start_time, end: _1.end_time } }, status: :ok
      end

      def create
        head :created
      end
    end
  end
end

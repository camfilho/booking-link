module Api
  module V1
    class SlotsController < ApplicationController
      def index
        date = DateTime.parse(params[:date].to_s)
        slots = Slot.get_by_date(date) + Slot.get_by_date(date + 1.day)

        # render json: slots.map { { id: _1.id, start: _1.start_time, end: _1.end_time } }, status: :ok
        # render json: SlotsCollectionSerializer.new(slots).to_json, status: :ok
        render json: slots, each_serializer: SlotSerializer, status: :ok
      end

      def create
        duration = slot_params[:duration].to_i
        start_date = slot_params[:date_time].to_s
        company_name = slot_params[:company_name].to_s

        slot = Slot.create!(start_time: start_date, end_time: DateTime.parse(start_date).utc + duration.minutes,
                            company_name: company_name)

        # render json: {id: slot.id, start: slot.start_time.iso8601, end: slot.end_time.iso8601 }, status: :created
        render json: SlotSerializer.new(slot).to_json, status: :created
      end

      private

      def slot_params
        params.require(:slot).permit(:date_time, :duration)
      end
    end
  end
end

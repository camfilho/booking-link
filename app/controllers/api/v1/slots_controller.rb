module Api
  module V1
    class SlotsController < ApplicationController
      def index
        date = DateTime.parse(params[:date].to_s)
        slots = Slot.get_by_date(date) + Slot.get_by_date(date + 1.day)

        render json: slots, each_serializer: SlotSerializer, status: :ok
      end

      def create
        duration = slot_params[:duration].to_i
        start_date = slot_params[:date_time].to_s
        company_name = slot_params[:company_name].to_s

        slot = Slot.new(start_time: start_date, end_time: DateTime.parse(start_date).utc + duration.minutes,
                        company_name: company_name)

        if slot.save
          ActionCable.server.broadcast('slots', 'success')

          render json: SlotSerializer.new(slot).to_json, status: :created
        else
          render json: slot.errors, status: :unprocessable_entity
        end
      end

      private

      def slot_params
        params.require(:slot).permit(:date_time, :duration)
      end
    end
  end
end

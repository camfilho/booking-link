module Api
  module V1
    class SlotsController < ApplicationController
      def index
        slots = Slot::Get.new(date: params[:date].to_s, duration: params[:duration].to_i).call

        if slots.valid?
          render json: slots.get, each_serializer: SlotSerializer, status: :ok
        else
          render json: slots.errors, status: :bad_request
        end
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

module Api
  module V1
    class SlotSerializer < ActiveModel::Serializer
      attributes :id, :start, :end

      def start
        object.start_time.iso8601
      end

      def end
        object.end_time.iso8601
      end
    end
  end
end

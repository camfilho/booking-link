# Purpose: Get slots by date and duration
module Slot
  class Get
    include ActiveModel::Validations

    attr_reader :date, :duration

    DAY_IN_MINUTES = 1440

    validates :date, presence: true
    validates :duration, presence: true, numericality: { only_integer: true }

    validate :duration_must_be_lower_than_3_days

    def initialize(date:, duration:)
      @date = date
      @duration = duration
    end

    def call
      return self unless validate

      start_time = DateTime.parse(date)
      end_time = start_time + 1.day + duration.minutes

      @slots = Slot.where(start_time: start_time..end_time).or(Slot.where(end_time: start_time..end_time))

      self
    end

    def get
      @slots || Slot.where
    end

    private

    def duration_must_be_lower_than_3_days
      errors.add(:duration, 'must be lower than 3 days') if duration.to_i > DAY_IN_MINUTES * 3
    end
  end
end

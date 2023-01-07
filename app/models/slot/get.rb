  # Purpose: Get slots by date and duration
  class Slot::Get
    include ActiveModel::Validations

    attr_reader :date, :duration

    DAY_IN_MINUTES = 1440
    
    validates :date, presence: true
    validates :duration, presence: true

    validate :duration_must_be_lower_than_3_days

    def initialize(date:, duration:)
      @date = date
      @duration = duration
    end

    def call
      return self unless validate

      date_time = DateTime.parse(date)
      @slots = Slot.get_by_date(date_time)

      ((duration + DAY_IN_MINUTES) / DAY_IN_MINUTES).times do |i|
        @slots += Slot.get_by_date(date_time + i.day)
      end

      self
    end

    def get
      @slots
    end

    private

    def duration_must_be_lower_than_3_days
      errors.add(:duration, 'must be lower than 3 days') if duration > DAY_IN_MINUTES * 3
    end
  end

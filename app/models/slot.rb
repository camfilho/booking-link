class Slot < ApplicationRecord
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :end_time_must_be_after_start_time, if: -> { start_time.present? && end_time.present? }
  validate :end_start_time_within_another_slot, if: -> { start_time.present? && end_time.present? }
  validate :start_date_must_be_later_than_current_date, if: -> { start_time.present? && end_time.present? }

  scope :get_by_date, ->(date) { where('start_time <= ? AND end_time>= ?', date.end_of_day, date.beginning_of_day) }

  private

  def end_time_must_be_after_start_time
    errors.add(:end_time, 'must be after start time') if end_time < start_time
  end

  def end_start_time_within_another_slot
    errors.add(:slot_time, 'This is not is not available anymore') if Slot.exists?(['start_time <= ? AND end_time>= ?',
                                                                                    start_time, end_time])
  end

  def start_date_must_be_later_than_current_date
    errors.add(:start_time, 'must be not be a date in the past') if start_time < Date.today
  end
end

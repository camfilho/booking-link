class Slot < ApplicationRecord
  validates :start_time, presence: true
  validates :end_time, presence: true

  scope :get_by_date, ->(date) { where('start_time <= ? AND end_time>= ?', date.end_of_day, date.beginning_of_day) }
end

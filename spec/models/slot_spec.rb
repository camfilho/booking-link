require 'rails_helper'

RSpec.describe Slot, type: :model do
  it { is_expected.to validate_presence_of(:start_time) }
  it { is_expected.to validate_presence_of(:end_time) }
end

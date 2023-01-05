require 'rails_helper'

RSpec.describe Slot, type: :model do
  it { is_expected.to validate_presence_of(:start_time) }
  it { is_expected.to validate_presence_of(:end_time) }

  describe '.get_by_date' do
    let(:slot) { Slot.create!(start_time: Date.today, end_time: Date.today + 1.hour) }

    it 'returns all slots for a given date' do
      slot = Slot.create!(start_time: Date.today, end_time: Date.today + 1.hour)
      expect(described_class.get_by_date(Date.today)).to eq([slot])
    end
    context 'when slots ends earlier than the given date' do
      let(:date) { slot.end_time + 1.day }

      it 'returns not slots' do
        expect(described_class.get_by_date(date)).to eq([])
      end
    end

    context 'when slots starts later than the given date' do
      let(:date) { slot.start_time - 1.day }

      it 'returns not slots' do
        expect(described_class.get_by_date(date)).to eq([])
      end
    end
  end
end

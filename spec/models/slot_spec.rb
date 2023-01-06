require 'rails_helper'

RSpec.describe Slot, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:start_time) }
    it { is_expected.to validate_presence_of(:end_time) }

    context 'when start_time is later than the end time' do
      let(:start_time) { Time.zone.now }
      let(:end_time) { start_time - 1.hour }

      it 'does not allow to save' do
        expect(Slot.new(start_time: start_time, end_time: end_time)).not_to be_valid
      end
    end

    context "when new slot is within another slot's time range" do
      it 'does not allow to save' do
        slot = Slot.create(start_time: Time.zone.now, end_time: 1.hour.from_now)
        expect(Slot.new(start_time: slot.start_time + 1.minute, end_time: slot.end_time - 1.minute)).not_to be_valid
      end
    end

    context "when new slot's time range is older than today" do
      it 'does not allow to save' do
        expect(Slot.new(start_time: 1.day.ago, end_time: 1.hour.ago)).not_to be_valid
        expect(Slot.new(start_time: 1.day.ago, end_time: 1.hour.ago)).not_to be_valid
      end
    end
  end
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

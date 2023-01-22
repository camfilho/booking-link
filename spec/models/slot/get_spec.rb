require 'rails_helper'

RSpec.describe Slot::Get do
  describe 'validations' do
    it 'validates presence of date' do
      expect(described_class.new(date: '2023-01-01', duration: 30).valid?).to eq(true)
      expect(described_class.new(date: '', duration: 30).valid?).to eq(false)
    end
    it 'validates presence of duration' do
      expect(described_class.new(date: '2023-01-01', duration: nil).valid?).to eq(false)
      expect(described_class.new(date: '2023-01-01', duration: 30).valid?).to eq(true)
    end

    it 'validates duration numerical' do
      expect(described_class.new(date: '2023-01-01', duration: '30b').valid?).to eq(false)
      expect(described_class.new(date: '2023-01-01', duration: 30).valid?).to eq(true)
    end
  end
end

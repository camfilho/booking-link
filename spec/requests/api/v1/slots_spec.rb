require 'rails_helper'

RSpec.describe 'Api::V1::Slots', type: :request do
  describe 'GET /api/v1/slots' do
    it 'returns http success' do
      slot = Slot.create!(start_time: DateTime.now, end_time: DateTime.now + 1.hour)
      date = Date.today.to_s
      get "/api/v1/slots?date=#{date}"
      expect(response).to have_http_status(:success)
      expect(json_response).to be_a(Array)
      expect(json_response.first).to eq({
        'id' => slot.id,
        'start' => slot.start_time,
        'end' => slot.end_time
      }.as_json)
    end
  end

  describe 'POST /create' do
    it 'returns http success' do
      post '/api/v1/slots'
      expect(response).to have_http_status(:created)
    end
  end
end

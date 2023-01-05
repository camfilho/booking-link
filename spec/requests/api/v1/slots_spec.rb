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
        'start' => slot.start_time.iso8601,
        'end' => slot.end_time.iso8601
      }.as_json)
    end
  end

  describe 'POST /create' do
    it 'returns http success' do
      params = { slot: { date_time: DateTime.now.utc.iso8601, duration: 30 } }
      post '/api/v1/slots', params: params
      expect(response).to have_http_status(:created)
      expect(json_response).to eq({
                                    'id' => Slot.last.id,
                                    'start' => params[:slot][:date_time],
                                    'end' => (DateTime.parse(params[:slot][:date_time]).utc + 30.minutes).iso8601
                                  })
    end
  end
end

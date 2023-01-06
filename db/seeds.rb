slots = [
  { id: 'bd8fc476-ac50-3327-4ece-d73897796852', start: '2023-02-01T20:00:00.000Z',
    end: '2023-02-01T22:30:00.000Z' },
  { id: '8c73d0ca-d999-4081-1558-e5ee6a40fcc2', start: '2023-01-03T23:00:00.000Z',
    end: '2023-01-05T06:00:00.000Z' },
  { id: '086e3a96-2c74-3d2a-e839-ad10c82626d5', start: '2023-02-01T10:15:00.000Z',
    end: '2023-02-01T10:45:00.000Z' },
  { id: '9e323a9e-adf9-605f-9386-c939a9a6af3f', start: '2023-02-01T13:55:00.000Z',
    end: '2023-02-01T14:30:00.000Z' },
  { id: '0510de47-c86e-a64c-bb86-461c039b1012', start: '2023-02-02T10:00:00.000Z',
    end: '2023-02-02T20:00:00.000Z' },
  { id: '4b24e6ab-bdc6-6b2c-e405-a8e01f0fde84', start: '2023-02-01T09:00:00.000Z',
    end: '2023-02-01T10:00:00.000Z' },
  { id: '087ddebe-dd41-7e39-bda8-f617d8c4385d', start: '2023-02-01T11:30:00.000Z',
    end: '2023-02-01T13:00:00.000Z' },
  { id: '5117e557-8d86-4180-9326-1ce0cf733982', start: '2023-02-01T13:00:00.000Z',
    end: '2023-02-01T13:10:00.000Z' }
]

slots.map(&:with_indifferent_access).each do |slot|
  Slot.create!(id: slot['id'], start_time: slot['start'], end_time: slot['end'])
end

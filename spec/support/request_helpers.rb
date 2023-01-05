module RequestsHelpers
  def json_response
    @json_response ||= begin
      result = JSON.parse(response.body)
      result.is_a?(Hash) ? result.with_indifferent_access : result
    end
  end
end

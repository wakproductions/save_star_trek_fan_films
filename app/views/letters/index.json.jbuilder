json.array!(@letters) do |letter|
  json.extract! letter, :id, :email, :name, :return_address, :body, :closing
  json.url letter_url(letter, format: :json)
end

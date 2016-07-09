json.array!(@letters) do |letter|
  json.extract! letter, :id, :email, :name, :return_address, :body, :salutation
  json.url letter_url(letter, format: :json)
end

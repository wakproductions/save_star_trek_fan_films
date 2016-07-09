class Letter < ActiveRecord::Base
  validates_presence_of :email
  validates_presence_of :name
  validates_presence_of :return_address, message: 'should at the very least, please include a city and state'
  validates_presence_of :body, message: 'should contain your message to CBS/Paramount'
end

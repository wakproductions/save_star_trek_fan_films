class Letter < ActiveRecord::Base
  validates_presence_of :email, message: '- please enter an email address address so we can keep you updated!'
  validates_presence_of :name, message: '- please enter your name, which will appear on the letter'
  validates_presence_of :return_address, message: 'should at the very least, please include a city and state'
  validates_presence_of :body, message: 'should contain your message to CBS/Paramount'

  after_initialize :set_defaults

  def set_defaults
    self.written_date ||= Date.current
  end
end

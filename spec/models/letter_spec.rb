require 'spec_helper'
require 'shoulda/matchers'

RSpec.describe Letter do
  describe 'defaults' do
    describe '#written_date' do
      subject { described_class.new.written_date }
      it { is_expected.to eql(Date.current) }
    end
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:name) }
    it {
      is_expected.to validate_presence_of(:return_address)
        .with_message('should at the very least, please include a city and state')
    }
    it {
      is_expected.to validate_presence_of(:body)
        .with_message('should contain your message to CBS/Paramount')
    }

  end
end
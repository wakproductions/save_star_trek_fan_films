require 'spec_helper'
require 'utilities'

describe Utilities::FriendlyErrors do
  let(:input) do
    {
      email: ["can't be blank", "must be a valid address"],
      body: ["should contain your message to CBS/Paramount"],
    }
  end
  let(:expected_output) do
    [
      "Email can't be blank",
      "Email must be a valid address",
      "Body should contain your message to CBS/Paramount",
    ]
  end

  describe "output.friendly_errors" do
    subject { described_class.(errors: input).friendly_errors }

    it { is_expected.to eql(expected_output) }
  end

end
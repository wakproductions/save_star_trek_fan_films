require 'rails_helper'

RSpec.describe LettersController, type: :controller do

  let(:valid_attributes) {
    {
      email:          "test@example.com",
      return_address: "1325 Avenue of the Americas\nNew York, NY 10017",
      body:           "This is my complaint about the Star Trek Fan Film guidelines...",
      closing:        "Sincerely",
      name:           "B. Jones",
    }
  }

  let(:invalid_attributes) {
    # Required attribute email is missing
    valid_attributes[:email] = nil
    valid_attributes
  }

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Letter" do
        expect {
          xhr :post, :create, {format: :json, letter: valid_attributes}
        }.to change(Letter, :count).by(1)
      end

      it "renders json attributes of the Letter" do
        xhr :post, :create, {format: :json, letter: valid_attributes}
        expect(response).to render_template('letters/show') # Jbuilder template
        expect(response.content_type).to eql('application/json')
      end
    end

    context "with invalid params" do
      context 'missing email' do
        let(:errors) do
          { errors: ["Email can't be blank"] }
        end

        it "responds with an error message" do
          xhr :post, :create, {format: :json, letter: invalid_attributes}
          expect(response.content_type).to eql('application/json')
          expect(response.body).to eql(errors.to_json)
        end
      end
    end
  end
end

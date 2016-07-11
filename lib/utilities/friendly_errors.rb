module Utilities
  class FriendlyErrors
    include Actionizer

    attr_reader :friendly_errors

    # Converts an ActiveRecord hash of errors into strings that can easily be rendered in the view
    #
    # {
    #   email: ["can't be blank", "must be a valid address"],
    #   body: ["should contain your message to CBS/Paramaount"],
    # }
    #
    # becomes:
    # [
    # "Email can't be blank",
    # "Email must be a valid address",
    # "Body should contain your message to CBS/Paramount",
    # ]
    def call
      output.friendly_errors = convert_error_hash
    end

    private

    def convert_error_hash
      @friendly_errors = []
      error_hash.each do |attribute, errors|
        errors.each do |message|
          @friendly_errors << "#{attribute.to_s.capitalize} #{message}"
        end
      end
      friendly_errors
    end

    def error_hash
      @error_hash ||= input.errors
    end

  end
end
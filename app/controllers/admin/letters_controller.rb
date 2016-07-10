class Admin::LettersController < ApplicationController

  # GET /admin/letters
  def index
    @letters = Letter.all
  end

  def show
  end

end

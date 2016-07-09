class CreateLetters < ActiveRecord::Migration
  def change
    create_table :letters do |t|
      t.string :email
      t.string :name
      t.string :return_address
      t.string :body
      t.string :salutation

      t.timestamps null: false
    end
  end
end

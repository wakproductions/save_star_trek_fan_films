class AddWrittenDateToLetters < ActiveRecord::Migration
  def change
    add_column :letters, :written_date, :date
  end
end

class RenameLetterSalutationToClosing < ActiveRecord::Migration
  def change
    rename_column :letters, :salutation, :closing
  end
end

class CreateRates < ActiveRecord::Migration
  def change
    create_table :rates do |t|
      t.string :name
      t.float :rate
			t.integer :term
      t.float :principal
      t.integer :user_id

      t.timestamps
    end
  end
end

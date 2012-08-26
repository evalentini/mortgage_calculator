class CreateRates < ActiveRecord::Migration
  def change
    create_table :rates do |t|
      t.string :name
      t.float :rate
      t.float :amt_borrowed
      t.integer :house_id
      t.integer :user_id

      t.timestamps
    end
  end
end

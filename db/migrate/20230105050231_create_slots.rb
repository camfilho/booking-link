class CreateSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :slots, id: :uuid do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.string :company_name

      t.index :start_time
      t.index :end_time
      t.timestamps
    end
  end
end

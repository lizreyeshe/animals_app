class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.string :tittle
      t.string :text
      t.string :symptoms
      t.integer :animal_id
      t.integer :user_id

      t.timestamps
    end
  end
end

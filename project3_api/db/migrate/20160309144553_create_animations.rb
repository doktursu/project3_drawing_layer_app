class CreateAnimations < ActiveRecord::Migration
  def change
    create_table :animations do |t|
      t.text :frameOrder
      t.integer :frameInterval
      t.text :layerOrder
      t.text :layerInfo
      t.text :canvasJSON

      t.timestamps null: false
    end
  end
end

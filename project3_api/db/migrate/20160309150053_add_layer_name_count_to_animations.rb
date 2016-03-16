class AddLayerNameCountToAnimations < ActiveRecord::Migration
  def change
    add_column :animations, :layerNameCount, :integer
  end
end

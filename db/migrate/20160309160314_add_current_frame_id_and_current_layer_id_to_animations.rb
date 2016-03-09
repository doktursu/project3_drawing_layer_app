class AddCurrentFrameIdAndCurrentLayerIdToAnimations < ActiveRecord::Migration
  def change
    add_column :animations, :currentFrameID, :string
    add_column :animations, :currentLayerID, :string
  end
end

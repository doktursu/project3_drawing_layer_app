class AnimationSerializer < ActiveModel::Serializer
  attributes :id, :frameOrder, :frameInterval, :layerOrder, :layerInfo, :canvasJSON
end

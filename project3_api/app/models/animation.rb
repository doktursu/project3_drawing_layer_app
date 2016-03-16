class Animation < ActiveRecord::Base
    serialize :frameOrder, Array
    serialize :layerOrder, Array
    serialize :layerInfo, Hash
end

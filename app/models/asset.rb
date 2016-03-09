class Asset < ActiveRecord::Base
    serialize :objects, Array
end

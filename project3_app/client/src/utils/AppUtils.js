function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var idIncrement = 0;

module.exports = {

    newID: function() {
        idIncrement++;
        return Date.now() + idIncrement;
    },

    newFrameID: function() {
        return 'f_' + this.newID();
    },

    newLayerID: function() {
        return 'l_' + this.newID();
    },

    convertRawAsset: function(rawAsset) {
        return {
            id: rawAsset.id,
            name: rawAsset.name,
            objects: rawAsset.objects.map(function(object) {
                return this.convertRawObject(object);
            }.bind(this))
        };
    },

    convertRawObject: function(rawObject) {
        var type = capitalize(rawObject.type);
        if (type === 'Path') {
            var path = new fabric[type](rawObject.path);
            path.set(rawObject);
            return (path);
        }
        return (new fabric[type](rawObject));
    },

};
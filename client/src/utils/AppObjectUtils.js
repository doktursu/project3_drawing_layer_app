function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {

    convertRawObject: function(rawObject) {
        var type = capitalize(rawObject.type);
        return (new fabric[type](rawObject));
    }

};
/**
 * Inherits child from parent
 * @param {Object} child
 * @param {Object} parent
 */
var inherit = function(child, parent) {
    var tmp = function() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
};

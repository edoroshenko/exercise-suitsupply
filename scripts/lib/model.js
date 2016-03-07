/**
 * Model base class
 */
var Model = function() {

};

inherit(Model, Observable);

Model.prototype.init = function() {
    throw 'Unimplemented';
}

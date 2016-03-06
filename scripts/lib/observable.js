var Observable = function() {
    this._handlers = {};
}

Observable.prototype.on = function(eventName, cb) {
    (this._handlers[eventName] = this._handlers[eventName] || []).push(cb);
};

Observable.prototype.un = function(eventName, cb) {
    this._handlers[eventName] = (this._handlers[eventName] || []).filter(function(handler) {
        if (handler !== cb) {
            return handler;
        }
    });
};

Observable.prototype.trigger = function(eventName, opts) {
    (this._handlers[eventName] || []).forEach(function(handler) {
        handler.call(this, opts);
    });
};

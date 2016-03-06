var Service = function(opts) {
    this.getUrl = opts.getUrl;
};

Service.prototype.load = function(params, onLoad) {
    this.request = new XMLHttpRequest();
    this.request.addEventListener("load", onLoad);

    this.request.open("GET", this.getUrl(params));
    this.request.send();
};

Service.prototype._onLoad = function(cb) {
    
};

Service.prototype.getUrl = function() {
    throw 'Unipmlemented';
};

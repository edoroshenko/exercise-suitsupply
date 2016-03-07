/**
 * Service base class
 */
var Service = function(opts) {
    this.getUrl = opts.getUrl;
};

/**
 * Loads data from server with passed params
 * @param {Object} params
 * @param {Function} onLoad
 */
Service.prototype.load = function(params, onLoad) {
    this.request = new XMLHttpRequest();
    this.request.addEventListener("load", onLoad);

    this.request.open("GET", this.getUrl(params));
    this.request.send();
};

/**
 * Should return {Srting} url to be requested
 * @param {Object} params
 */
Service.prototype.getUrl = function(params) {
    throw 'Unipmlemented';
};

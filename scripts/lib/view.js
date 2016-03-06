var View = function() {
    View.parent.constructor.apply(this, arguments);

    this._parent = null;
};

inherit(View, Observable);

View.prototype._render = function() {
    throw 'Unimplemented';
};

View.prototype.renderAt = function(node) {
    this._parent = node;
    this._node = this._render();
    node.appendChild(this._node);
};

View.prototype.update = function() {
    var newNode;

    if (this._node && this._parent) {
        newNode = this._render();

        this._parent.replaceChild(newNode, this._node);
        this._node = newNode;
    }
};

View.prototype.createElement = function(tagName, opts) {
    var element = document.createElement(tagName);
    var key;

    if (opts.textContent) {
        element.innerHTML = opts.textContent;
    }

    if (opts.classes) {
        opts.classes.forEach(function(className) {
            element.classList.add(className);
        });
    }

    if (opts.attrs) {
        for (key in opts.attrs) {
            element.setAttribute(key, opts.attrs[key]);
        }
    }

    return element;
};

var ToolbarView = function(articles) {
    ToolbarView.parent.constructor.apply(this, arguments);

    this._initValues(articles);
};

inherit(ToolbarView, View);

ToolbarView.prototype._initValues = function(articles) {
    this.yearValues = [];
    this.monthValues = [];
    this.dateValues = [];

    articles.map(function(article) {
        var date = article.data.publishedDate;
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();

        if (-1 === this.yearValues.indexOf(year)) {
            this.yearValues.push(year);
        }

        if (-1 === this.monthValues.indexOf(month)) {
            this.monthValues.push(month);
        }

        if (-1 === this.dateValues.indexOf(day)) {
            this.dateValues.push(day);
        }
    }, this);
};

ToolbarView.prototype._render = function() {
    var toolbar = this.createElement('div', {
        classes: ['view-toolbar']
    });

    toolbar.appendChild(this._renderTextFilter());
    toolbar.appendChild(this._renderDatesFilter());

    return toolbar;
};


ToolbarView.prototype._renderTextFilter = function() {
    var input = this.createElement('input', {
        classes: ['view-toolbar__text-filter'],
        attrs: {type: 'text'}
    });

    input.addEventListener('keyup', this._onKeyUpTextFilter.bind(this));

    return input;
};

ToolbarView.prototype._onKeyUpTextFilter = function(e) {
    this.trigger('filter', {
        type: 'text', value: e.target.value
    });
};

ToolbarView.prototype._renderDatesFilter = function() {
    var container = this.createElement('div', {
        classes: ['view-toolbar__date-filter']
    });

    var yearSelect = this._renderSelect(this.yearValues, {
        classes: ['view-toolbar__select', 'view-toolbar__select_name_year'],
        attrs: {name: 'year'}
    });
    var monthSelect = this._renderSelect(this.monthValues, {
        classes: ['view-toolbar__select', 'view-toolbar__select_name_month'],
        attrs: {name: 'month'}
    });
    var dateSelect = this._renderSelect(this.dateValues, {
        classes: ['view-toolbar__select', 'view-toolbar__select_name_date'],
        attrs: {name: 'date'}
    });

    container.appendChild(yearSelect);
    container.appendChild(monthSelect);
    container.appendChild(dateSelect);

    [yearSelect, monthSelect, dateSelect].forEach(function(select) {
        select.addEventListener('change', this._onSelectDatePart.bind(this));
    }, this);

    return container;
};

ToolbarView.prototype._onSelectDatePart = function(e) {
    var select = e.target;
    this.trigger('filter', {type: select.getAttribute('name'), value: select.value});
};

ToolbarView.prototype._renderSelect = function(values, opts) {
    var select = this.createElement('select', opts);

    [''].concat(values).forEach(function(value) {
        select.appendChild(this.createElement('option', {
            attrs: {
                value: value
            },
            textContent: value
        }))
    }, this);

    return select;
};

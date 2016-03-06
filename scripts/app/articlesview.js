var ArticlesView = function(articles) {
    ArticlesView.parent.constructor.apply(this, arguments);

    this.articles = articles;
    this._state = {
        filters: {
            text: null,
            year: null,
            month: null,
            date: null
        }
    };
};

inherit(ArticlesView, View);

ArticlesView.prototype._render = function() {
    return this._renderArticles(this.articles.items);
};

ArticlesView.prototype._renderArticles = function(articles) {
    var element = document.createElement('div');
    var filters;

    element.classList.add('view', 'view-articles');

    this._views = [];

    filters = this._state.filters;

    if (filters.text || filters.year || filters.month || filters.date) {
        articles = this._filterArticles(articles);
    }

    articles.forEach(function(article) {
        var view = new ArticleView(article);

        this._views.push(view);

        view.renderAt(element);
    }, this)

    return element;
};

ArticlesView.prototype._filterArticles = function(articles) {
    var filters = this._state.filters;
    var regexp;

    if (filters.text) {
        regexp = new RegExp(filters.text, 'i')
    }

    return articles.filter(function(article) {
        var data = article.data;
        var date = data.publishedDate;

        if (regexp && !regexp.test(data.title) && !regexp.test(data.content)) {
            return false;
        }

        console.log(filters.year, date.getFullYear(), filters.year);

        if (filters.year && date.getFullYear() !== Number(filters.year)) {
            return false;
        }
        if (filters.month && date.getMonth() !== Number(filters.month)) {
            return false;
        }
        if (filters.date && date.getDate() !== Number(filters.date)) {
            return false;
        }

        return true;
    }, this);
};

ArticlesView.prototype.filter = function(type, value) {
    this._state.filters[type] = value;
    this.update();
};

var ArticleView = function(article) {
    ArticleView.parent.constructor.apply(this, arguments);

    this.article = article;
    this._state = {
        expanded: false
    };
    this._views = [];
};

inherit(ArticleView, View);

ArticleView.prototype._render = function() {
    var element = this.createElement('div', {classes: ['view', 'view-article']});
    
    element.appendChild(this._renderTitle());

    if (this._state.expanded) {
        element.appendChild(this._renderBody());

        if (this.article.relatedArticles) {
            element.appendChild(this._renderRelated());
        }
    }

    return element;
};

ArticleView.prototype._renderBody = function() {
    var body = this.createElement('div', {
        classes: ['view-article__body']
    });
    var data = this.article.data;
    var imageData = data.image;
    var content = this.createElement('div', {
        classes: ['view-article__content'],
        textContent: this.article.data.content
    });

    content.appendChild(this.createElement('a', {
        classes: ['link', 'view-article__read-more'],
        attrs: {
            href: data.unescapedUrl,
            target: '_blank'
        },
        textContent: 'read more'
    }));

    body.appendChild(content);

    body.appendChild(this.createElement('img', {
        classes: ['view-article__image'],
        attrs: {
            src: imageData.tbUrl,
            width: imageData.tbWidth,
            height: imageData.tbHeight
        }
    }));

    return body;
};

ArticleView.prototype._renderRelated = function() {
    var container = this.createElement('div', {
        classes: ['view-article__relatedArticles']
    });

    container.appendChild(this.createElement('div', {
        classes: ['view-article__subtitle'],
        textContent: 'Related stories'
    }));

    this.article.relatedArticles.forEach(function(article) {
        var view = new RelatedArticleView(article);

        this._views.push(view);

        view.renderAt(container);
    }, this);

    return container;
};

ArticleView.prototype._renderTitle = function() {
    var title = this.createElement('a', {
        classes: ['link', 'view-article__title'],
        attrs: {href: '#'},
        textContent: this.article.data.title
    });

    title.addEventListener('click', this._onClickTitle.bind(this));

    return title;
};

ArticleView.prototype._onClickTitle = function(e) {
    e.preventDefault();

    this._state.expanded = !this._state.expanded;
    this.update();
};

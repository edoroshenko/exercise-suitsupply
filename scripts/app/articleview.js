/**
 * Single article view class
 */
var ArticleView = function(article) {
    ArticleView.parent.constructor.apply(this, arguments);

    this.article = article;
    this._state = {
        expanded: false
    };
    this._views = [];
};

inherit(ArticleView, View);

/**
 * Renders article's content
 * @returns {DOMElement}
 */
ArticleView.prototype._render = function() {
    var element = this.createElement('div', {classes: ['view', 'view-article']});
    
    element.appendChild(this._renderTitle());

    if (this._state.expanded) {
        element.appendChild(this._renderBody());

        if (this.article.relatedArticles.length) {
            element.appendChild(this._renderRelated());
        }
    }

    return element;
};

/**
 * Renders article's title
 * @returns {DOMElement}
 */
ArticleView.prototype._renderTitle = function() {
    var title = this.createElement('div', {
        classes: ['view-article__title', 'title'],
        textContent: this.article.data.title
    });

    title.addEventListener('click', this._onClickTitle.bind(this));

    return title;
};

/**
 * Renders article's body
 * @returns {DOMElement}
 */
ArticleView.prototype._renderBody = function() {
    var data = this.article.data;
    var imageData = data.image;

    var body = this.createElement('div', {
        classes: ['view-article__body']
    });
    var content;
    var imageLink = this.createElement('a', {
        classes: ['link', 'view-article__image-link'],
        attrs: {
            href: imageData.url,
            target: '_blank'
        }
    });

    imageLink.appendChild(this.createElement('img', {
        classes: ['view-article__image'],
        attrs: {
            src: imageData.tbUrl,
            width: imageData.tbWidth,
            height: imageData.tbHeight
        }
    }));

    body.appendChild(imageLink);

    content = this.createElement('div', {
        classes: ['view-article__content'],
        textContent: data.content
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

    return body;
};

/**
 * Renders article's related stories
 * @returns {DOMElement}
 */
ArticleView.prototype._renderRelated = function() {
    var container = this.createElement('div', {
        classes: ['view-article__relatedArticles']
    });

    container.appendChild(this.createElement('div', {
        classes: ['view-article__subtitle', 'title'],
        textContent: 'Related stories:'
    }));

    this.article.relatedArticles.forEach(function(article) {
        var view = new RelatedArticleView(article);

        this._views.push(view);

        view.renderAt(container);
    }, this);

    return container;
};

/**
 * Handles expander's click event
 */
ArticleView.prototype._onClickTitle = function(e) {
    this._state.expanded = !this._state.expanded;
    this.update();
};

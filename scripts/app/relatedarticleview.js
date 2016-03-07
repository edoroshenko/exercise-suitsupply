var RelatedArticleView = function(article) {
    RelatedArticleView.parent.constructor.apply(this, arguments);

    this.article = article;
};

inherit(RelatedArticleView, View);

RelatedArticleView.prototype._render = function() {
    return this.createElement('a', {
        classes: ['link', 'view-relatedArticle', 'title'],
        attrs: {
            href: this.article.data.unescapedUrl,
            target: '_blank'
        },
        textContent: this.article.data.title
    });
};
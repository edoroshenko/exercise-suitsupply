var ArticlesModelCollection = function() {};

inherit(ArticlesModelCollection, ModelCollection);

ArticlesModelCollection.prototype.init = function(articlesData) {
    this.items = [];

    articlesData.forEach(function(articleData) {
        var article = new ArticleModel();
        article.init(articleData);

        this.items.push(article);
    }, this);
};

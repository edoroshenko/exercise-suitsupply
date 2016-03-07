/**
 * Articles model collection class
 */
var ArticlesModelCollection = function() {};

inherit(ArticlesModelCollection, ModelCollection);

/**
 * Initializes an instance from passed data
 * @param {Object} data
 */
ArticlesModelCollection.prototype.init = function(articlesData) {
    this.items = [];

    articlesData.forEach(function(articleData) {
        var article = new ArticleModel();
        article.init(articleData);

        this.items.push(article);
    }, this);
};

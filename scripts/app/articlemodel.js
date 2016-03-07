/**
 * Article model
 */
var ArticleModel = function() {};

inherit(ArticleModel, Model);

/**
 * Initializes an instance from passed data
 * @param {Object} data
 */
ArticleModel.prototype.init = function(data) {
    this.data = JSON.parse(JSON.stringify(data)); // cloning. It's important not to modify the source data
    this.relatedArticles = [];

    (this.data.relatedStories || []).forEach(function(articleData) {
        var article = new ArticleModel();
        article.init(articleData);

        this.relatedArticles.push(article);
    }, this);

    delete this.data.relatedStories;

    this.data.publishedDate = new Date(this.data.publishedDate);
};

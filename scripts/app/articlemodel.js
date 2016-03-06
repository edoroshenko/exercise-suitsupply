var ArticleModel = function() {};

inherit(ArticleModel, Model);

ArticleModel.prototype.init = function(data) {
    this.data = data;
    this.relatedArticles = [];

    (data.relatedStories || []).forEach(function(articleData) {
        var article = new ArticleModel();
        article.init(articleData);

        this.relatedArticles.push(article);
    }, this);

    delete data.relatedStories;

    this.data.publishedDate = new Date(this.data.publishedDate);
};

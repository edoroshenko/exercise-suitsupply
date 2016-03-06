var articlesService = new Service({
    getUrl: function() {
        return 'data/articles.json'
    }
});

articlesService.getArticles = function(cb) {
    this.load({}, function(e) {
        var articles = JSON.parse(e.target.responseText).results;
        return cb(articles);
    });
};

/**

 + 1. Ручками загружаю данные из сервиса

 + 2. Инициализирую модели

 3. Рисую виды

*/

var articles = new ArticlesModelCollection();

articlesService.getArticles(function(articlesData) {

    articles.init(articlesData);

    var toolbarView = new ToolbarView(articles.items);

    toolbarView.renderAt(document.body);

    var articlesView = new ArticlesView(articles);

    articlesView.renderAt(document.body);

    toolbarView.on('filter', function(e) {
        articlesView.filter(e.type, e.value);
    });
});




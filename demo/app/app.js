var BlogApp = new HydrogenApplication('BlogApp',{

    templatePath: 'app/templates',
    templateExtension: 'html',
    httpSourceBase: 'http://jsonplaceholder.typicode.com'
});

var menuSource = BlogApp.LocalSource('menu', {
    options: [
        { name: 'About us'},
        { name: 'Contact'},
        { name: 'The project'}
    ]
});

var menuPartial = BlogApp.Partial(BlogApp, 'menu', {

    templateName: 'menu',
    source: menuSource
});

$(function(){

    homePage.load();
});
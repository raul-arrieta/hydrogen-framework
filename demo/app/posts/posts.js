var postsArea = BlogApp.Area('post',{

    templatePath: 'app/posts/templates',
    templateExtension: 'html',
    httpSourceBase: 'http://jsonplaceholder.typicode.com'
});

var latestPostsSource = postsArea.HttpSource(postsArea, 'latestPosts', {

    method: 'GET',
    url: '/posts',
    params: null,
    on:{
        before: function(params) { },
        after: function(result) {

            return {
                posts: result
            };
        }
    },
    cache: false
});

var menuSource = postsArea.LocalSource('menu', {
    options: [
        { name: 'About us'},
        { name: 'Contact'},
        { name: 'The project'}
    ]
});

var latestPostsPartial = postsArea.Partial(postsArea, 'latestPosts', {

    templateName: 'list',
    source: latestPostsSource,
    on: {
        before: function(params) { },
        after: function(result) { }
    }
});

var menuPartial = postsArea.Partial(postsArea, 'menu', {

    templateName: 'menu',
    source: menuSource
});

$(function(){

    latestPostsPartial.render('#post-list');
    menuPartial.render('#menu');
});

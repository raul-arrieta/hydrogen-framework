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

var latestPostsPartial = postsArea.Partial(postsArea, 'latestPosts', {

    templateName: 'list',
    source: latestPostsSource,
    on: {
        before: function(params) { },
        after: function(result) { }
    }
});

var homePage = postsArea.Page('home',[
    { destination: '#post-list', partial: latestPostsPartial},
    { destination: '#menu', partial: menuPartial}
]);
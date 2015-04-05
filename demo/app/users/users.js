var usersArea = BlogApp.Area('users',{

    templatePath: 'app/users/templates',
    templateExtension: 'html',
    httpSourceBase: 'http://jsonplaceholder.typicode.com'
});

var allUsersPartial = usersArea.Partial(usersArea, 'allUsersSource', {

    templateName: 'list',
    source: allUsersSource
});

var usersPage = usersArea.Page('users',[
    { destination: '#main', partial: allUsersPartial },
    { destination: '#menu', partial: menuPartial },
    { destination: '#users-with-post', partial: usersWithPostPartial}
]);
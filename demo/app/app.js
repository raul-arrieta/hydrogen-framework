var app = (function(){

    var init = function(defaultUrl){

        hydrogen.styles.setCSSFramework("Bootstrap");

        hydrogen.routes.templateBasePath = "templates/";
        hydrogen.routes.templateExtension = ".html";

        hydrogen.routes.

            before(function(){

                $("#content, #otherContent").empty();
                console.log("Navigation started");
            }).

            after(function(){

                console.log("Navigation done");

                console.log("I am at " + hydrogen.routes.current());

                if(hydrogen.routes.current() === "/users"){

                    console.log("Users!!!");

                }else{

                    console.log("Not users!!!");
                }

            }).

            add({
                url: "/",
                update: [{template: "home", container: "content"}]
            }).

            add({
                url: "/users",
                update: [{template: "users", container: "content", data: app.dataProvider.getUsers}]
            }).

            add({
                url: "/about",
                update: [
                    {template: "about", container: "content"},
                    {template: "about", container: "otherContent"}

                ]
            });

        hydrogen.routes.navigateTo(defaultUrl);

        hydrogen.forms.on("#btnSubmit", "click", "frmNewUser", function(){alert("OK");}, function(){alert("Error");}, {shouldValidate: true});
    };



    return {

        init: init

    };
})();

app.dataProvider = (function(){

    var getUsers = function(callback){

        callback({users: [
            {id: 0, name: 'John'},
            {id: 1, name: 'Alfred'},
            {id: 2, name: 'Tim'},
            {id: 3, name: 'Susan'},
        ]});

    };

    return {
        getUsers: getUsers
    };
})();

app.init("/");

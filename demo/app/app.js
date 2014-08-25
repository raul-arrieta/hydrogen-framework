var app = (function(){

    var init = function(defaultUrl){

        hydrogen.routes.templateBasePath = "templates/";
        hydrogen.routes.templateExtension = ".html";

        hydrogen.routes.add({url: "/", template: "home", container: "content"});
        hydrogen.routes.add({url: "/users", template: "users", container: "content"});

        hydrogen.routes.navigateTo(defaultUrl);
    };

    return {

        init: init

    };
})();

app.init("/");

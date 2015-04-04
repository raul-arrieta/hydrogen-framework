/*exported HydrogenPartialView, HydrogenPartialViewsManager */
/*global Mustache */

var HydrogenPartialView = function(parent, name, configuration){

    var partialView = this;

    this.name = name;
    this.configuration = configuration;
    this.parent = parent;

    this.render = function(destinationSelector){

        partialView.configuration.source.fetch(function(data){

            console.log(data);
            var
                basePath = partialView.parent.configuration.templatePath,
                templateName = partialView.configuration.templateName,
                extension = partialView.parent.configuration.templateExtension,
                templateUrl = basePath + '/' + templateName + '.' + extension;

            $.ajax({
                method: 'GET',
                url: templateUrl,
                success: function(html){

                    var innerHtml = Mustache.render(html, data);

                    $(destinationSelector).html(innerHtml);
                }
            });
        });
    };
};

var HydrogenPartialViewsManager = function(){

    var partialViewManager = this;

    this._partialViews = [];

    this.Partial = function(parent, name, configuration){

        var partialView = new HydrogenPartialView(parent, name, configuration);

        partialViewManager._partialViews.push(partialView);

        return partialView;
    };
};
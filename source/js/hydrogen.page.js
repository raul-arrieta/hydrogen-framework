/*exported HydrogenPage, HydrogenPageManager */

var HydrogenPage = function(name, partials){

    var page = this;

    this.name = name;
    this.partials = partials || [];

    this.load = function(){

        for (
            var partialCounter = 0,partialTotal = page.partials.length;
            partialCounter < partialTotal;
            partialCounter++){

            var
                partial = page.partials[partialCounter].partial,
                destination = page.partials[partialCounter].destination;

            partial.render(destination);
        }

    };
};

var HydrogenPageManager = function(){

    var pageManager = this;

    this._pages = [];

    this.Page = function(name, partials){

        var page = new HydrogenPage(name, partials);

        pageManager._pages.push(page);

        return page;
    };
};
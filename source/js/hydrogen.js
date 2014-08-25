var hydrogen = (function(){

    var init = function(){

        $("a[data-control='link']").each(function(index, item){



            $(item).bind("click", function(){
                debugger;
                hydrogen.routes.navigateTo($(item).attr("data-url"));

            });

        });

    };


    return {
        init: init
    };

})();

$(function(){
    hydrogen.init();
});

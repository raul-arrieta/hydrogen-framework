var hydrogen = (function(){

    var init = function(){

        $("a[data-control='link']").each(function(index, item){

            if($(item).attr("data-action") === "back"){

                // Goes back one position in history
                $(item).bind("click", function(){

                    hydrogen.routes.back();

                });
            }
            else{
                $(item).bind("click", function(){

                    hydrogen.routes.navigateTo($(item).attr("data-url"));

                });
            }

        });

        hydrogen.styles.applyStyles();

    };


    return {
        init: init
    };

})();

$(function(){
    hydrogen.init();
});

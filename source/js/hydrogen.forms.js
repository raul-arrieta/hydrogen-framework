/*global hydrogen */
hydrogen.forms = (function () {

    var on = function(senderSelector, event, formSelector, callbackSuccess, callbackError, options){

        $(senderSelector).on(event, function(){

            var
                $form = $(formSelector),

                $inputTextControls = $("input[type='text']", $form),
                $inputEmailControls = $("input[type='email']", $form),
                $inputTextAreaControls = $("textarea", $form),

                dataToSend = {},

                isFormValid = true;

            if(options && options.shouldValidate && options.shouldValidate === true){

                // Validate components


            }

            $inputTextControls.each(function(index, item){

                dataToSend[$(item).prop("name")] = $(item).val();

            });

            $inputEmailControls.each(function(index, item){

                dataToSend[$(item).prop("name")] = $(item).val();

            });

            $inputTextAreaControls.each(function(index, item){

                dataToSend[$(item).prop("name")] = $(item).val();

            });

            if (isFormValid) {

                $.post($form.attr("action"), dataToSend).done(callbackSuccess).fail(callbackError);

            }
        });

    };


    return {

        on : on

    };

})();

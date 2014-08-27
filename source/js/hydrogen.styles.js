/*global hydrogen */

/**
 * Hosts all the functionallity refering to styling
 *
 * @module hydrogen.styles
 */
hydrogen.styles = (function () {

    var shouldApplyCSSFramework = false,

        setCSSFramework = function(framework){

            if(framework){

                shouldApplyCSSFramework = framework;

                if(shouldApplyCSSFramework === "Bootstrap"){

                    hydrogen.styles.bootstrap.init();

                }

            }

        },

        applyStyles = function($context){

            if(shouldApplyCSSFramework){

                if(shouldApplyCSSFramework === "Bootstrap"){

                    hydrogen.styles.bootstrap.applyStyles($context);

                }

            }

            return $context;
        };


    return {

        shouldApplyCSSFramework: shouldApplyCSSFramework,

        setCSSFramework: setCSSFramework,

        applyStyles: applyStyles

    };
})();

/*exported HydrogenApplication, HydrogenArea */

/**
 * This represents an area inside an Hydrogen based application.
 *
 * You can distribute code in areas. Remember all areas in the same share most functionality.
 *
 * @class HydrogenArea
 * @param {String} name Name for the area
 * @param {Object} configuration Area's configuration
 * @constructor
 */
var HydrogenArea = function(name, configuration){

    this.name = name;
    this.configuration = configuration;
};

/**
 * This represents an Hydrogen based application.
 *
 * You can have as many as you wish, as you remember that features are not shared among them.
 *
 * @class HydrogenApplication
 * @uses HydrogenArea
 * @constructor
 */
var HydrogenApplication = function(){

    var
        _areas;

    /**
     * Adds an area to the application.
     *
     * Areas allow code to be better organized and easier to maintain.
     *
     * @method Area
     * @param {String} name Name for the area
     * @param {Object} configuration Area's configuration
     * @return {Object} Returns an HydrogenArea object
     */
    this.Area = function(name, configuration){

        var new_area = new HydrogenArea(name, configuration);

        _areas = _areas || [];

        _areas.push(new_area);
    };
};
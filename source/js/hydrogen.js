/*exported HydrogenApplication */
/*global HydrogenHttpSourceManager, HydrogenPartialViewsManager, HydrogenArea */

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

    // Configure HTTP resource manager
    this._httpSourceManager = new HydrogenHttpSourceManager();
    this.HttpSource = this._httpSourceManager.HttpSource;

    // Configure partial views manager
    this._partialViewsManager = new HydrogenPartialViewsManager();
    this.Partial = this._partialViewsManager.Partial;

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

        return new_area;
    };
};
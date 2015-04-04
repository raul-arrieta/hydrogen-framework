/*exported HydrogenArea */
/*global HydrogenHttpSourceManager, HydrogenPartialViewsManager, HydrogenLocalSourceManager */

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

    // Configure HTTP resource manager
    this._httpSourceManager = new HydrogenHttpSourceManager();
    this.HttpSource = this._httpSourceManager.HttpSource;

    // Configure local resource manager
    this._localSourceManager = new HydrogenLocalSourceManager();
    this.LocalSource = this._localSourceManager.LocalSource;

    // Configure partial views manager
    this._partialViewsManager = new HydrogenPartialViewsManager();
    this.Partial = this._partialViewsManager.Partial;
};
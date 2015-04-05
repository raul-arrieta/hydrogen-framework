/*exported HydrogenArea */
/*global HydrogenHttpSourceManager, HydrogenPartialViewsManager, HydrogenLocalSourceManager, HydrogenPageManager */

/**
 * This represents an area inside an Hydrogen based application.
 *
 * You can distribute the code in your application through areas.
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

    // Configure partial views manager
    this._pageManager = new HydrogenPageManager();
    this.Page = this._pageManager.Page;
};
/**
 * MadrassatiModule module.
 * Provides the base class for Madrassati Modules - all Madrassati Modules must extend this Base class.
 * @module madrassatiModule
 */

import coreApp from 'madrassati';
import urls from 'madrassati.urls';
import setWebpackPublicPath from './_setWebpackPublicPath.js';

// Do this to set a public path for this module
setWebpackPublicPath(urls);

export default class MadrassatiModule {
  /**
   * An array of options to select from the options object passed into the constructor.
   * @type {string[]}
   */
  get madrassatiModuleOptions() {
    return [];
  }
  /**
   * The constructor function for the base MadrassatiModule object.
   * @param {object} options - an options hash to set properties of the object.
   * @param {Array} args - any additional arguments that will be passed to initialize.
   * @constructor
   */
  constructor(options, ...args) {
    /* eslint-disable no-undef */
    // __madrassatiModuleName is replaced during webpack compilation with the name derived from
    // the unique_slug that is defined on the class that defines the frontend madrassatiModule.
    this.name = __madrassatiModuleName;
    /* eslint-enable no-undef */
    const safeOptions = {};
    this.madrassatiModuleOptions.forEach(option => {
      if (options[option]) {
        safeOptions[option] = options[option];
      }
    });
    Object.assign(this, safeOptions);
    // Pass all arguments to the constructor directly to initialize for easy access.
    this.initialize(options, ...args);
    // Register the madrassatiModule with the Madrassati core app.
    this._registerMadrassatiModule();
  }

  /**
   * Method to automatically register the madrassatiModule with the Madrassati core app once it has
   * initialized.
   * @private
   */
  _registerMadrassatiModule() {
    coreApp.registerMadrassatiModuleSync(this);
  }

  /**
   * A dummy initialization function - this function will be passed anything passed to the
   * constructor.
   * Useful for setting up the madrassatiModule before it is registered against the Madrassati core app.
   */
  initialize() {}

  /**
   * A dummy ready function
   * Useful for initiating behaviour of the madrassatiModule after it is registered against the
   * Madrassati core app.
   */
  ready() {}

  /**
   * Convenience method to unregister the madrassatiModule from listening to certain events.
   * @param {string} event - the event name
   * @param {string} method - the name of the method to unbind
   */
  stopListening(event, method) {
    coreApp.stopListening(event, this, method);
  }

  /**
   * Convenience method to fire an event on the global Mediator and pass in a data payload.
   * @param {string} event - the event name
   * @param {Array} args - additional arguments to the event handler.
   */
  emit(...args) {
    coreApp.emit(...args);
  }
  get Madrassati() {
    return coreApp;
  }
}

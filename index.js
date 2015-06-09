(function(){
  'use strict';
  var async = require('async');
  var Gigbunch = function() {
    this.index = 1;
    this.gigs = {};
  };
  (function(p){
    /**
     * @memberof Gigbunch
     * @param {string} key
     * @param {function} gig
     * @return this for method chain
     */
    p.add = function(key, gig) {
      this.index++;
      if (! gig) {
	gig = key;
	key = this.index;
      }
      this.gigs[key] = gig;
      return this;
    };
    /**
     * @memberof Gigbunch
     * @param {Gigbunch} another  another gig executer
     * @return this for method chain
     */
    p.join = function(another) {
      for (var key in another.gigs) {
	this.add(key, another.gigs[key]);
      }
      return this;
    };
    /**
     * @memberof Gigbunch
     * @param {function} cb  callback
     * @return this for method chain
     */
    p.exec = function(cb) {
      if (this.gigs.length < 1) { };
      if (! cb) {
	cb = function(err, results) {
	  if (err) throw err;
	  return results;
	};
      }
      async.parallel(this.gigs, cb);
      return this;
    };
  })(Gigbunch.prototype);
  module.exports = Gigbunch;
})();

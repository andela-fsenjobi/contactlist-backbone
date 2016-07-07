// (function() {
//   var wrapError;
//   wrapError = void 0;
//   Backbone.RailsJSON = {
//     _name: function() {
//       if (!this.name) {
//         throw new Error("A 'name' property must be specified");
//       }
//       return this.name;
//     },
//     isWrapped: function(object) {
//       return object.hasOwnProperty(this._name()) && (typeof object[this._name()] === "object");
//     },
//     unwrappedAttributes: function(object) {
//       return object[this._name()];
//     },
//     wrappedAttributes: function() {
//       var object;
//       object = {};
//       object[this._name()] = _.clone(this.attributes);
//       return object;
//     },
//     maybeUnwrap: function(args) {
//       if (this.isWrapped(args)) {
//         this.set(this.unwrappedAttributes(args), {
//           silent: true
//         });
//         this.unset(this._name(), {
//           silent: true
//         });
//         return this._previousAttributes = _.clone(this.attributes);
//       }
//     }
//   };
//   wrapError = function(onError, model, options) {
//     return function(resp, status) {
//       if (onError) {
//         return onError(model, resp, options);
//       } else {
//         return model.trigger("error", model, resp, options);
//       }
//     };
//   };
//   _.extend(Backbone.Collection.prototype, Backbone.RailsJSON, {
//     fetch: function(options) {
//       var collection, success;
//       collection = void 0;
//       success = void 0;
//       options || (options = {});
//       collection = this;
//       success = options.success;
//       options.success = function(resp, status, xhr) {
//         collection[(options.add ? "add" : "reset")](collection.parse(resp, xhr), options);
//         if (success) {
//           return success(collection, resp);
//         }
//       };
//       options.error = wrapError(options.error, collection, options);
//       return (this.sync || Backbone.sync).call(this, "read", this, options);
//     },
//     parse: function(resp) {
//       this.total = parseInt(resp["total"]);
//       this.per_page = parseInt(resp["per_page"]);
//       this.current_page = parseInt(resp["current_page"]);
//       this.total_pages = parseInt(resp["total_pages"]);
//       return this.unwrappedAttributes(resp);
//     }
//   });
//   _.extend(Backbone.Model.prototype, Backbone.RailsJSON, {
//     parse: function(resp) {
//       return this.unwrappedAttributes(resp);
//     },
//     destroy: function(options) {
//       var model, success;
//       model = void 0;
//       success = void 0;
//       options || (options = {});
//       model = this;
//       success = options.success;
//       options.success = function(resp) {
//         model.trigger("destroy", model, model.collection, options);
//         if (success) {
//           return success(model, resp);
//         }
//       };
//       options.error = wrapError(options.error, model, options);
//       return (this.sync || Backbone.sync).call(this, "delete", this, options);
//     },
//     fetch: function(options) {
//       var model, success;
//       model = void 0;
//       success = void 0;
//       options || (options = {});
//       model = this;
//       success = options.success;
//       options.success = function(resp, status, xhr) {
//         if (!model.set(model.parse(resp, xhr), options)) {
//           return false;
//         }
//         model.trigger("fetched", model, model.collection, options);
//         if (success) {
//           return success(model, resp);
//         }
//       };
//       options.error = wrapError(options.error, model, options);
//       return (this.sync || Backbone.sync).call(this, "read", this, options);
//     },
//     toJSON: function() {
//       return this.wrappedAttributes();
//     },
//     initialize: function(args) {}
//   });
// }).call(this);

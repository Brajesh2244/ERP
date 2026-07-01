sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/product/ProductRepository"
], function (BaseService, ProductRepository) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.product.ProductService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new ProductRepository(oComponent);
        },
        getAll: function (bIncludeDeleted) {
            var aProducts = this._oRepository.getAll() || [];
            if (bIncludeDeleted) return aProducts;
            return aProducts.filter(function(p) { return !p.deleted; });
        },
        getById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        createRecord: function (oProduct) {
            oProduct.id = "PRD" + Date.now();
            oProduct.deleted = false;
            oProduct.createdDate = new Date().toISOString();
            oProduct.updatedDate = new Date().toISOString();
            
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Product", "ProductCreated", oProduct);
            
            return this._oRepository.create(oProduct);
        },
        updateRecord: function (sId, oProduct) {
            oProduct.updatedDate = new Date().toISOString();
            
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Product", "ProductUpdated", oProduct);
            
            return this._oRepository.update(sId, oProduct);
        },
        deleteRecord: function (sId) {
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Product", "ProductDeleted", { id: sId });
            return this._oRepository.delete(sId);
        },
        restoreRecord: function (sId) {
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Product", "ProductRestored", { id: sId });
            return this._oRepository.restore(sId);
        }
    });
});

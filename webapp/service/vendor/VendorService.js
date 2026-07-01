sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/vendor/VendorRepository"
], function (BaseService, VendorRepository) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.vendor.VendorService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new VendorRepository(oComponent);
        },
        getAll: function (bIncludeDeleted) {
            var aVendors = this._oRepository.getAll() || [];
            if (bIncludeDeleted) return aVendors;
            return aVendors.filter(function(v) { return !v.deleted; });
        },
        getById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        createRecord: function (oVendor) {
            oVendor.id = "VEND" + Date.now();
            oVendor.deleted = false;
            oVendor.createdDate = new Date().toISOString();
            oVendor.updatedDate = new Date().toISOString();
            
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Vendor", "VendorCreated", oVendor);
            
            return this._oRepository.create(oVendor);
        },
        updateRecord: function (sId, oVendor) {
            oVendor.updatedDate = new Date().toISOString();
            
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Vendor", "VendorUpdated", oVendor);
            
            return this._oRepository.update(sId, oVendor);
        },
        deleteRecord: function (sId) {
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Vendor", "VendorDeleted", { id: sId });
            return this._oRepository.delete(sId);
        },
        restoreRecord: function (sId) {
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Vendor", "VendorRestored", { id: sId });
            return this._oRepository.restore(sId);
        }
    });
});

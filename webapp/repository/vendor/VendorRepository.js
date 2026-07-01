sap.ui.define([
    "sap/erm/app/core/BaseRepository"
], function (BaseRepository) {
    "use strict";

    return BaseRepository.extend("sap.erm.app.repository.vendor.VendorRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "vendorModel", oComponent);
        },
        create: function (oVendor) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            aData.push(oVendor);
            oModel.setProperty("/", aData);
            return Promise.resolve(oVendor);
        },
        update: function (sId, oVendor) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/");
            var iIndex = aData.findIndex(function (c) { return c.id === sId; });
            if (iIndex !== -1) {
                aData[iIndex] = Object.assign(aData[iIndex], oVendor);
                oModel.setProperty("/", aData);
                return Promise.resolve(aData[iIndex]);
            }
            return Promise.reject(new Error("Vendor not found"));
        },
        delete: function (sId) {
            return this.update(sId, { deleted: true, status: "Inactive" });
        },
        restore: function (sId) {
            return this.update(sId, { deleted: false, status: "Active" });
        }
    });
});

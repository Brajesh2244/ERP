sap.ui.define([
    "sap/erm/app/core/BaseRepository"
], function (BaseRepository) {
    "use strict";

    return BaseRepository.extend("sap.erm.app.repository.customer.CustomerRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "customerModel", oComponent);
        },
        create: function (oCustomer) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            aData.push(oCustomer);
            oModel.setProperty("/", aData);
            return Promise.resolve(oCustomer);
        },
        update: function (sId, oCustomer) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/");
            var iIndex = aData.findIndex(function (c) { return c.id === sId; });
            if (iIndex !== -1) {
                aData[iIndex] = Object.assign(aData[iIndex], oCustomer);
                oModel.setProperty("/", aData);
                return Promise.resolve(aData[iIndex]);
            }
            return Promise.reject(new Error("Customer not found"));
        },
        delete: function (sId) {
            return this.update(sId, { deleted: true, status: "Inactive" });
        },
        restore: function (sId) {
            return this.update(sId, { deleted: false, status: "Active" });
        }
    });
});

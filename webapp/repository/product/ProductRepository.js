sap.ui.define([
    "sap/erm/app/core/BaseRepository"
], function (BaseRepository) {
    "use strict";

    return BaseRepository.extend("sap.erm.app.repository.product.ProductRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "productModel", oComponent);
        },
        create: function (oProduct) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            aData.push(oProduct);
            oModel.setProperty("/", aData);
            return Promise.resolve(oProduct);
        },
        update: function (sId, oProduct) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/");
            var iIndex = aData.findIndex(function (p) { return p.id === sId; });
            if (iIndex !== -1) {
                aData[iIndex] = Object.assign(aData[iIndex], oProduct);
                oModel.setProperty("/", aData);
                return Promise.resolve(aData[iIndex]);
            }
            return Promise.reject(new Error("Product not found"));
        },
        delete: function (sId) {
            return this.update(sId, { deleted: true, status: "Inactive" });
        },
        restore: function (sId) {
            return this.update(sId, { deleted: false, status: "Active" });
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseRepository"
], function (BaseRepository) {
    "use strict";

    return BaseRepository.extend("sap.erm.app.repository.MockRepositoryAdapter", {
        // Inherits getAll, getById from BaseRepository
        // Mocks create, update, delete directly on JSONModel
        create: function (oData) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            aData.push(oData);
            oModel.setProperty("/", aData);
            return Promise.resolve(oData);
        },
        update: function (sIdProperty, sIdValue, oData) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            var iIndex = aData.findIndex(function(item) { return item[sIdProperty] === sIdValue; });
            if (iIndex !== -1) {
                aData[iIndex] = Object.assign({}, aData[iIndex], oData);
                oModel.setProperty("/", aData);
                return Promise.resolve(aData[iIndex]);
            }
            return Promise.reject(new Error("Record not found"));
        },
        delete: function (sIdProperty, sIdValue) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            var aFiltered = aData.filter(function(item) { return item[sIdProperty] !== sIdValue; });
            oModel.setProperty("/", aFiltered);
            return Promise.resolve();
        }
    });
});

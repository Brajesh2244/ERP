sap.ui.define([
    "sap/erm/app/core/BaseRepository"
], function (BaseRepository) {
    "use strict";

    return BaseRepository.extend("sap.erm.app.repository.ODataRepositoryAdapter", {
        // Placeholder for future OData V4 implementation
        getAll: function () {
            // return ODataModel.bindList(...) logic
            return Promise.resolve([]);
        },
        getById: function (sId) {
            return Promise.resolve({});
        },
        create: function (oData) {
            return Promise.resolve(oData);
        },
        update: function (sIdProperty, sIdValue, oData) {
            return Promise.resolve(oData);
        },
        delete: function (sIdProperty, sIdValue) {
            return Promise.resolve();
        }
    });
});

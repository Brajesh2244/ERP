sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseService, Filter, FilterOperator) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.vendor.VendorSearchService", {
        buildSearchFilter: function (sQuery) {
            if (!sQuery) return [];
            return [new Filter({
                filters: [
                    new Filter("vendorCode", FilterOperator.Contains, sQuery),
                    new Filter("vendorName", FilterOperator.Contains, sQuery),
                    new Filter("primaryContact", FilterOperator.Contains, sQuery),
                    new Filter("email", FilterOperator.Contains, sQuery),
                    new Filter("phone", FilterOperator.Contains, sQuery),
                    new Filter("gstVat", FilterOperator.Contains, sQuery),
                    new Filter("taxId", FilterOperator.Contains, sQuery)
                ],
                and: false
            })];
        }
    });
});

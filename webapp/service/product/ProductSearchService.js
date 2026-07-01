sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseService, Filter, FilterOperator) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.product.ProductSearchService", {
        buildSearchFilter: function (sQuery) {
            if (!sQuery) return [];
            return [new Filter({
                filters: [
                    new Filter("productCode", FilterOperator.Contains, sQuery),
                    new Filter("barcode", FilterOperator.Contains, sQuery),
                    new Filter("productName", FilterOperator.Contains, sQuery),
                    new Filter("category", FilterOperator.Contains, sQuery),
                    new Filter("brand", FilterOperator.Contains, sQuery),
                    new Filter("preferredVendor", FilterOperator.Contains, sQuery)
                ],
                and: false
            })];
        }
    });
});

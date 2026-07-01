sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseService, Filter, FilterOperator) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.inventory.InventorySearchService", {
        buildSearchFilter: function (sQuery) {
            if (!sQuery) return [];
            return [new Filter({
                filters: [
                    new Filter("id", FilterOperator.Contains, sQuery),
                    new Filter("productName", FilterOperator.Contains, sQuery),
                    new Filter("productCode", FilterOperator.Contains, sQuery),
                    new Filter("batchNumber", FilterOperator.Contains, sQuery),
                    new Filter("warehouseName", FilterOperator.Contains, sQuery),
                    new Filter("bin", FilterOperator.Contains, sQuery)
                ],
                and: false
            })];
        }
    });
});

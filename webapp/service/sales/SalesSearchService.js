sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseService, Filter, FilterOperator) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.sales.SalesSearchService", {
        buildSearchFilter: function (sQuery) {
            if (!sQuery) return [];
            return [new Filter({
                filters: [
                    new Filter("id", FilterOperator.Contains, sQuery),
                    new Filter("customerName", FilterOperator.Contains, sQuery),
                    new Filter("salesExecutive", FilterOperator.Contains, sQuery),
                    new Filter("status", FilterOperator.Contains, sQuery)
                ],
                and: false
            })];
        }
    });
});

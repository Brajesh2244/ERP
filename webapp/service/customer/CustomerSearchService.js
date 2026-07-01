sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseService, Filter, FilterOperator) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.customer.CustomerSearchService", {
        buildSearchFilter: function (sQuery) {
            if (!sQuery) return [];
            return [new Filter({
                filters: [
                    new Filter("customerCode", FilterOperator.Contains, sQuery),
                    new Filter("companyName", FilterOperator.Contains, sQuery),
                    new Filter("primaryContact", FilterOperator.Contains, sQuery),
                    new Filter("email", FilterOperator.Contains, sQuery),
                    new Filter("phone", FilterOperator.Contains, sQuery),
                    new Filter("gstVat", FilterOperator.Contains, sQuery),
                    new Filter("industry", FilterOperator.Contains, sQuery)
                ],
                and: false
            })];
        }
    });
});

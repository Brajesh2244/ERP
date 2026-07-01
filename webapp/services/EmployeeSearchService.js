sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseService, Filter, FilterOperator) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.EmployeeSearchService", {
        buildSearchFilter: function (sQuery) {
            if (!sQuery) return [];
            return [new Filter({
                filters: [
                    new Filter("firstName", FilterOperator.Contains, sQuery),
                    new Filter("lastName", FilterOperator.Contains, sQuery),
                    new Filter("email", FilterOperator.Contains, sQuery),
                    new Filter("department", FilterOperator.Contains, sQuery)
                ],
                and: false
            })];
        }
    });
});

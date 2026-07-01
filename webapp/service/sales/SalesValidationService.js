sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.sales.SalesValidationService", {
        validateOrder: function (oHeader, aItems) {
            var aErrors = [];
            if (!oHeader.customerId) aErrors.push("Customer is required.");
            if (!aItems || aItems.length === 0) aErrors.push("Order must contain at least one item.");
            
            aItems.forEach(function (item, index) {
                if (item.quantity <= 0) aErrors.push("Item " + (index+1) + " quantity must be greater than zero.");
                if (item.unitPrice < 0) aErrors.push("Item " + (index+1) + " price cannot be negative.");
            });
            
            return aErrors;
        }
    });
});

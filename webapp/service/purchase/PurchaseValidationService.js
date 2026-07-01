sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.purchase.PurchaseValidationService", {
        validateOrder: function (oHeader, aItems) {
            var aErrors = [];
            if (!oHeader.vendorId) aErrors.push("Vendor is required.");
            if (!aItems || aItems.length === 0) aErrors.push("Order must contain at least one item.");
            
            aItems.forEach(function (item, index) {
                if (item.quantity <= 0) aErrors.push("Item " + (index+1) + " quantity must be greater than zero.");
                if (item.purchasePrice < 0) aErrors.push("Item " + (index+1) + " purchase price cannot be negative.");
            });
            
            return aErrors;
        }
    });
});

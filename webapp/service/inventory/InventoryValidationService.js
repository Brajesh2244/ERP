sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.inventory.InventoryValidationService", {
        validateIssue: function (oInventory, iIssueQty) {
            var aErrors = [];
            if (!oInventory) {
                aErrors.push("Inventory item not found.");
                return aErrors;
            }
            if (iIssueQty <= 0) {
                aErrors.push("Quantity must be greater than zero.");
            }
            if (oInventory.availableQuantity < iIssueQty) {
                aErrors.push("Insufficient stock. Available: " + oInventory.availableQuantity + ", Requested: " + iIssueQty);
            }
            if (new Date(oInventory.expiryDate) < new Date()) {
                aErrors.push("Cannot issue expired inventory.");
            }
            return aErrors;
        }
    });
});

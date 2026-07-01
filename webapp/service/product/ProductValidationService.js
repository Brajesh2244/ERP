sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/services/core/ValidationService"
], function (BaseService, ValidationService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.product.ProductValidationService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oValidation = new ValidationService(oComponent);
        },
        validateRecord: function (oProduct, aExisting) {
            var aErrors = [];
            if (this._oValidation.isEmpty(oProduct.productCode)) aErrors.push("Product Code (SKU) is required.");
            if (this._oValidation.isEmpty(oProduct.productName)) aErrors.push("Product Name is required.");
            if (this._oValidation.isEmpty(oProduct.categoryId)) aErrors.push("Category is required.");
            if (oProduct.costPrice < 0) aErrors.push("Cost Price cannot be negative.");
            if (oProduct.sellingPrice < oProduct.costPrice) aErrors.push("Selling Price should ideally not be less than Cost Price.");
            
            if (aExisting) {
                var bDuplicateSKU = aExisting.some(function(p) {
                    return p.productCode === oProduct.productCode && p.id !== oProduct.id;
                });
                if (bDuplicateSKU) aErrors.push("SKU is already used by another product.");
                
                var bDuplicateBarcode = aExisting.some(function(p) {
                    return p.barcode === oProduct.barcode && p.id !== oProduct.id && oProduct.barcode;
                });
                if (bDuplicateBarcode) aErrors.push("Barcode is already used by another product.");
            }
            
            return aErrors;
        }
    });
});

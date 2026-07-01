sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/services/core/ValidationService"
], function (BaseService, ValidationService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.vendor.VendorValidationService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oValidation = new ValidationService(oComponent);
        },
        validateRecord: function (oVendor, aExisting) {
            var aErrors = [];
            if (this._oValidation.isEmpty(oVendor.vendorName)) aErrors.push("Vendor Name is required.");
            if (!this._oValidation.isEmail(oVendor.email)) aErrors.push("Valid email is required.");
            if (this._oValidation.isEmpty(oVendor.primaryContact)) aErrors.push("Primary contact is required.");
            if (this._oValidation.isEmpty(oVendor.taxId)) aErrors.push("Tax ID is required.");
            
            if (aExisting) {
                var bDuplicateEmail = aExisting.some(function(v) {
                    return v.email === oVendor.email && v.id !== oVendor.id;
                });
                if (bDuplicateEmail) aErrors.push("Email is already assigned to another vendor.");
                
                var bDuplicateVendor = aExisting.some(function(v) {
                    return v.vendorName === oVendor.vendorName && v.id !== oVendor.id;
                });
                if (bDuplicateVendor) aErrors.push("Vendor Name already exists.");
            }
            
            return aErrors;
        }
    });
});

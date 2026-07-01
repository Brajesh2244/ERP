sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/services/core/ValidationService"
], function (BaseService, ValidationService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.customer.CustomerValidationService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oValidation = new ValidationService(oComponent);
        },
        validateCustomer: function (oCustomer, aExistingCustomers) {
            var aErrors = [];
            if (this._oValidation.isEmpty(oCustomer.companyName)) aErrors.push("Company Name is required.");
            if (!this._oValidation.isEmail(oCustomer.email)) aErrors.push("Valid email is required.");
            if (this._oValidation.isEmpty(oCustomer.primaryContact)) aErrors.push("Primary contact is required.");
            
            // Duplicate Checks
            if (aExistingCustomers) {
                var bDuplicateEmail = aExistingCustomers.some(function(c) {
                    return c.email === oCustomer.email && c.id !== oCustomer.id;
                });
                if (bDuplicateEmail) aErrors.push("Email is already assigned to another customer.");
                
                var bDuplicateCompany = aExistingCustomers.some(function(c) {
                    return c.companyName === oCustomer.companyName && c.id !== oCustomer.id;
                });
                if (bDuplicateCompany) aErrors.push("Company Name already exists.");
            }
            
            return aErrors;
        }
    });
});

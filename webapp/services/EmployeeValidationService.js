sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/services/core/ValidationService"
], function (BaseService, ValidationService) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.EmployeeValidationService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oValidation = new ValidationService(oComponent);
        },
        validateEmployee: function (oEmployee) {
            var aErrors = [];
            if (this._oValidation.isEmpty(oEmployee.firstName)) aErrors.push("First name is required.");
            if (this._oValidation.isEmpty(oEmployee.lastName)) aErrors.push("Last name is required.");
            if (!this._oValidation.isValidEmail(oEmployee.email)) aErrors.push("Valid email is required.");
            return aErrors;
        }
    });
});

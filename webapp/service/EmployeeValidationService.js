sap.ui.define([
    "sap/ui/base/Object",
    "sap/erm/app/util/ValidationHelper"
], function (BaseObject, ValidationHelper) {
    "use strict";

    return BaseObject.extend("sap.erm.app.service.EmployeeValidationService", {
        constructor: function(oEmployeeService) {
            this._employeeService = oEmployeeService;
        },

        validateEmployee: function (oEmployee) {
            var aErrors = [];

            if (ValidationHelper.isEmpty(oEmployee.FirstName)) {
                aErrors.push("First Name is required.");
            }
            if (ValidationHelper.isEmpty(oEmployee.LastName)) {
                aErrors.push("Last Name is required.");
            }
            if (ValidationHelper.isEmpty(oEmployee.Email)) {
                aErrors.push("Email is required.");
            } else if (!ValidationHelper.isValidEmail(oEmployee.Email)) {
                aErrors.push("Email format is invalid.");
            }
            if (ValidationHelper.isEmpty(oEmployee.Department)) {
                aErrors.push("Department is required.");
            }
            if (ValidationHelper.isEmpty(oEmployee.Designation)) {
                aErrors.push("Designation is required.");
            }
            
            // Check duplicate email mock logic
            var aEmployees = this._employeeService.getEmployees();
            var bDuplicateEmail = aEmployees.some(function(emp) { 
                return emp.Email === oEmployee.Email && emp.EmployeeID !== oEmployee.EmployeeID; 
            });
            if (bDuplicateEmail) {
                aErrors.push("An employee with this email already exists.");
            }

            return {
                isValid: aErrors.length === 0,
                errors: aErrors
            };
        }
    });
});

sap.ui.define([
    "sap/ui/base/Object"
], function (BaseObject) {
    "use strict";

    return BaseObject.extend("sap.erm.app.service.EmployeeService", {
        constructor: function(oComponent) {
            this._oModel = oComponent.getModel("employeeModel");
        },

        getEmployees: function () {
            return this._oModel.getProperty("/");
        },

        getEmployeeById: function (sEmployeeId) {
            var aEmployees = this.getEmployees();
            return aEmployees.find(function(emp) { return emp.EmployeeID === sEmployeeId; });
        },

        createEmployee: function (oEmployee) {
            return new Promise(function(resolve, reject) {
                var aEmployees = this.getEmployees();
                // Generate a mock ID
                var newId = "EMP" + String(aEmployees.length + 1).padStart(4, '0');
                oEmployee.EmployeeID = newId;
                oEmployee.CreatedBy = "System";
                oEmployee.LastUpdated = new Date().toISOString();
                aEmployees.unshift(oEmployee);
                this._oModel.setProperty("/", aEmployees);
                resolve(oEmployee);
            }.bind(this));
        },

        updateEmployee: function (sEmployeeId, oUpdatedData) {
            return new Promise(function(resolve, reject) {
                var aEmployees = this.getEmployees();
                var iIndex = aEmployees.findIndex(function(emp) { return emp.EmployeeID === sEmployeeId; });
                if (iIndex !== -1) {
                    oUpdatedData.LastUpdated = new Date().toISOString();
                    // Merge data
                    aEmployees[iIndex] = Object.assign({}, aEmployees[iIndex], oUpdatedData);
                    this._oModel.setProperty("/", aEmployees);
                    resolve(aEmployees[iIndex]);
                } else {
                    reject(new Error("Employee not found"));
                }
            }.bind(this));
        },

        deleteEmployee: function (sEmployeeId) {
            return new Promise(function(resolve, reject) {
                var aEmployees = this.getEmployees();
                var iIndex = aEmployees.findIndex(function(emp) { return emp.EmployeeID === sEmployeeId; });
                if (iIndex !== -1) {
                    aEmployees.splice(iIndex, 1);
                    this._oModel.setProperty("/", aEmployees);
                    resolve();
                } else {
                    reject(new Error("Employee not found"));
                }
            }.bind(this));
        },

        deleteMultipleEmployees: function(aEmployeeIds) {
            return new Promise(function(resolve, reject) {
                var aEmployees = this.getEmployees();
                var aRemaining = aEmployees.filter(function(emp) {
                    return aEmployeeIds.indexOf(emp.EmployeeID) === -1;
                });
                this._oModel.setProperty("/", aRemaining);
                resolve();
            }.bind(this));
        }
    });
});

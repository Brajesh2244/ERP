sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/EmployeeRepository"
], function (BaseService, EmployeeRepository) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.EmployeeService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new EmployeeRepository(oComponent);
        },
        getAllEmployees: function (bIncludeDeleted) {
            var aEmployees = this._oRepository.getAll() || [];
            if (bIncludeDeleted) return aEmployees;
            return aEmployees.filter(function(e) { return !e.deleted; });
        },
        getEmployeeById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        createEmployee: function (oEmployee) {
            oEmployee.id = "EMP" + Date.now();
            oEmployee.deleted = false;
            oEmployee.status = "Active";
            return this._oRepository.create(oEmployee);
        },
        updateEmployee: function (sId, oEmployee) {
            return this._oRepository.update(sId, oEmployee);
        },
        deleteEmployee: function (sId) {
            return this._oRepository.delete(sId);
        },
        restoreEmployee: function (sId) {
            return this._oRepository.restore(sId);
        }
    });
});

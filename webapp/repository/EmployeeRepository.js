sap.ui.define([
    "sap/erm/app/core/BaseRepository"
], function (BaseRepository) {
    "use strict";

    return BaseRepository.extend("sap.erm.app.repository.EmployeeRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "employeeModel", oComponent);
        },
        create: function (oEmployee) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            aData.push(oEmployee);
            oModel.setProperty("/", aData);
            return Promise.resolve(oEmployee);
        },
        update: function (sId, oEmployee) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/");
            var iIndex = aData.findIndex(function (e) { return e.id === sId; });
            if (iIndex !== -1) {
                aData[iIndex] = Object.assign(aData[iIndex], oEmployee);
                oModel.setProperty("/", aData);
                return Promise.resolve(aData[iIndex]);
            }
            return Promise.reject(new Error("Employee not found"));
        },
        delete: function (sId) {
            return this.update(sId, { deleted: true, status: "Inactive" });
        },
        restore: function (sId) {
            return this.update(sId, { deleted: false, status: "Active" });
        }
    });
});

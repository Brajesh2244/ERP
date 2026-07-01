sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/EmployeeService",
    "sap/erm/app/services/EmployeeValidationService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, EmployeeService, EmployeeValidationService, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.employee.Edit", {
        onInit: function () {
            this._oEmployeeService = new EmployeeService(this.getOwnerComponent());
            this._oValidationService = new EmployeeValidationService(this.getOwnerComponent());
            this._oMessageService = new MessageService(this.getOwnerComponent());
            
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute("employeeEdit").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sEmployeeId = oEvent.getParameter("arguments").id;
            var oEmployee = this._oEmployeeService.getEmployeeById(this._sEmployeeId);
            if (!oEmployee) {
                this._oMessageService.showError("Employee not found.");
                this.onNavBack();
                return;
            }
            // Deep copy to prevent live two-way binding mutation before save
            this.getModel("model").setData(JSON.parse(JSON.stringify(oEmployee)));
        },

        onNavBack: function () {
            this.getRouter().navTo("employeeDetail", { id: this._sEmployeeId }, true);
        },

        onSavePress: function () {
            var oData = this.getModel("model").getData();
            oData.fullName = oData.firstName + " " + oData.lastName;
            
            var aErrors = this._oValidationService.validateEmployee(oData);
            if (aErrors.length > 0) {
                this._oMessageService.showError(aErrors.join("\n"));
                return;
            }

            this._oEmployeeService.updateEmployee(this._sEmployeeId, oData).then(function() {
                this._oMessageService.showToast("Employee updated successfully.");
                this.onNavBack();
            }.bind(this));
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/EmployeeService",
    "sap/erm/app/services/EmployeeValidationService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, EmployeeService, EmployeeValidationService, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.employee.Create", {
        onInit: function () {
            this._oEmployeeService = new EmployeeService(this.getOwnerComponent());
            this._oValidationService = new EmployeeValidationService(this.getOwnerComponent());
            this._oMessageService = new MessageService(this.getOwnerComponent());
            
            this.getRouter().getRoute("employeeCreate").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            this.getView().setModel(new JSONModel({
                firstName: "", lastName: "", email: "", phone: "", department: "", designation: "", role: ""
            }), "model");
        },

        onNavBack: function () {
            this.getRouter().navTo("employees", {}, true);
        },

        onSavePress: function () {
            var oData = this.getModel("model").getData();
            oData.fullName = oData.firstName + " " + oData.lastName;
            
            var aErrors = this._oValidationService.validateEmployee(oData);
            if (aErrors.length > 0) {
                this._oMessageService.showError(aErrors.join("\n"));
                return;
            }

            this._oEmployeeService.createEmployee(oData).then(function() {
                this._oMessageService.showToast("Employee created successfully.");
                this.onNavBack();
            }.bind(this));
        }
    });
});

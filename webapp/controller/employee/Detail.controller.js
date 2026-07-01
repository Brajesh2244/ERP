sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/EmployeeService",
    "sap/erm/app/services/shared/FormatterService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (BaseController, EmployeeService, FormatterService, MessageService, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.employee.Detail", {
        formatter: new FormatterService(),
        
        onInit: function () {
            this._oEmployeeService = new EmployeeService(this.getOwnerComponent());
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            
            this.getRouter().getRoute("employeeDetail").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sEmployeeId = oEvent.getParameter("arguments").id;
            this._loadData();
        },

        _loadData: function () {
            var oEmployee = this._oEmployeeService.getEmployeeById(this._sEmployeeId);
            if (!oEmployee) {
                this._oMessageService.showError("Employee not found.");
                this.getRouter().navTo("employees");
                return;
            }
            this.getModel("model").setData(oEmployee);
        },

        onNavBack: function () {
            this.getRouter().navTo("employees", {}, true);
        },

        onEditPress: function () {
            this.getRouter().navTo("employeeEdit", { id: this._sEmployeeId });
        },

        onDeletePress: function () {
            if (!this._pDeleteDialog) {
                this._pDeleteDialog = Fragment.load({
                    name: "sap.erm.app.fragments.ConfirmDeleteDialog",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            this._pDeleteDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        onConfirmDelete: function (oEvent) {
            this._oEmployeeService.deleteEmployee(this._sEmployeeId).then(function() {
                this._oMessageService.showToast("Employee deleted.");
                this._loadData();
                oEvent.getSource().getParent().close();
            }.bind(this));
        },

        onCancelDelete: function (oEvent) {
            oEvent.getSource().getParent().close();
        },

        onRestorePress: function () {
            this._oEmployeeService.restoreEmployee(this._sEmployeeId).then(function() {
                this._oMessageService.showToast("Employee restored.");
                this._loadData();
            }.bind(this));
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/EmployeeService",
    "sap/erm/app/services/EmployeeSearchService",
    "sap/erm/app/services/EmployeeExportService",
    "sap/erm/app/services/shared/FormatterService",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (BaseController, EmployeeService, EmployeeSearchService, EmployeeExportService, FormatterService, JSONModel, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.employee.List", {
        formatter: new FormatterService(),
        
        onInit: function () {
            this._oEmployeeService = new EmployeeService(this.getOwnerComponent());
            this._oSearchService = new EmployeeSearchService(this.getOwnerComponent());
            this._oExportService = new EmployeeExportService(this.getOwnerComponent());

            var oViewModel = new JSONModel({ items: [] });
            this.getView().setModel(oViewModel, "model");

            this._setupTableColumns();
            
            this.getRouter().getRoute("employees").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            this._loadData();
        },

        _loadData: function () {
            var aEmployees = this._oEmployeeService.getAllEmployees(false);
            this.getModel("model").setProperty("/items", aEmployees);
        },

        _setupTableColumns: function () {
            var oTable = this.byId("idGenericTable");
            
            oTable.addColumn(new Column({ header: new Text({ text: "ID" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Name" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Email" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Department" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Designation" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>id}" }),
                    new Text({ text: "{model>fullName}" }),
                    new Text({ text: "{model>email}" }),
                    new Text({ text: "{model>department}" }),
                    new Text({ text: "{model>designation}" }),
                    new ObjectStatus({
                        text: "{model>status}",
                        state: "{ path: 'model>status', formatter: '.formatter.statusState' }"
                    })
                ]
            });

            oTable.bindItems({
                path: "model>/items",
                template: oTemplate
            });
        },

        onGenericSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var aFilters = this._oSearchService.buildSearchFilter(sQuery);
            this.byId("idGenericTable").getBinding("items").filter(aFilters);
        },

        onItemPress: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("model").getPath();
            var oData = this.getModel("model").getProperty(sPath);
            this.getRouter().navTo("employeeDetail", { id: oData.id });
        },

        onCreatePress: function () {
            this.getRouter().navTo("employeeCreate");
        },

        onGenericExportPress: function () {
            this._oExportService.exportTable(this.byId("idGenericTable"));
        },

        onGenericFilterPress: function () { },
        onGenericSortPress: function () { }
    });
});

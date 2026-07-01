sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/customer/CustomerService",
    "sap/erm/app/service/customer/CustomerSearchService",
    "sap/erm/app/service/customer/CustomerExportService",
    "sap/erm/app/services/shared/FormatterService",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (BaseController, CustomerService, CustomerSearchService, CustomerExportService, FormatterService, JSONModel, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.customer.List", {
        formatter: new FormatterService(),
        
        onInit: function () {
            this._oService = new CustomerService(this.getOwnerComponent());
            this._oSearchService = new CustomerSearchService(this.getOwnerComponent());
            this._oExportService = new CustomerExportService(this.getOwnerComponent());

            this.getView().setModel(new JSONModel({ items: [] }), "model");
            this._setupTableColumns();
            
            this.getRouter().getRoute("customers").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            this._loadData();
        },

        _loadData: function () {
            var aCustomers = this._oService.getAllCustomers(false);
            this.getModel("model").setProperty("/items", aCustomers);
        },

        _setupTableColumns: function () {
            var oTable = this.byId("idGenericTable");
            
            oTable.addColumn(new Column({ header: new Text({ text: "Code" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Company Name" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Contact" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Email" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Category" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>customerCode}" }),
                    new Text({ text: "{model>companyName}" }),
                    new Text({ text: "{model>primaryContact}" }),
                    new Text({ text: "{model>email}" }),
                    new Text({ text: "{model>category}" }),
                    new ObjectStatus({
                        text: "{model>status}",
                        state: "{ path: 'model>status', formatter: '.formatter.statusState' }"
                    })
                ]
            });
            oTable.bindItems({ path: "model>/items", template: oTemplate });
        },

        onGenericSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var aFilters = this._oSearchService.buildSearchFilter(sQuery);
            this.byId("idGenericTable").getBinding("items").filter(aFilters);
        },

        onItemPress: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("model").getPath();
            var oData = this.getModel("model").getProperty(sPath);
            this.getRouter().navTo("customerDetail", { id: oData.id });
        },

        onCreatePress: function () { this.getRouter().navTo("customerCreate"); },
        onGenericExportPress: function () { this._oExportService.exportTable(this.byId("idGenericTable")); },
        onGenericFilterPress: function () { },
        onGenericSortPress: function () { }
    });
});

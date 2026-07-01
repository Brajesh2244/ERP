sap.ui.define([
    "sap/erm/app/core/TransactionListController",
    "sap/erm/app/service/sales/SalesService",
    "sap/erm/app/service/sales/SalesSearchService",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (TransactionListController, SalesService, SalesSearchService, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return TransactionListController.extend("sap.erm.app.controller.sales.List", {
        onInitHook: function () {
            this._oService = new SalesService(this.getOwnerComponent());
            this._oSearchService = new SalesSearchService(this.getOwnerComponent());
            this._setupTableColumns();
        },
        getRouteName: function () { return "sales"; },
        getService: function () { return this._oService; },
        getSearchService: function () { return this._oSearchService; },
        getDetailRouteName: function () { return "salesDetail"; },
        
        _setupTableColumns: function () {
            var oTable = this.byId(this.getTableId());
            oTable.addColumn(new Column({ header: new Text({ text: "Order Number" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Customer" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Date" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Gross Amount" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>id}" }),
                    new Text({ text: "{model>customerName}" }),
                    new Text({ text: "{ path: 'model>orderDate', formatter: '.formatter.date' }" }),
                    new Text({ text: "{model>currency} {model>totalGrossAmount}" }),
                    new ObjectStatus({
                        text: "{model>status}",
                        state: "{ path: 'model>status', formatter: '.formatter.statusState' }"
                    })
                ]
            });
            oTable.bindItems({ path: "model>/items", template: oTemplate });
        }
    });
});

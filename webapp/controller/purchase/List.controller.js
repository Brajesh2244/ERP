sap.ui.define([
    "sap/erm/app/core/TransactionListController",
    "sap/erm/app/service/purchase/PurchaseService",
    "sap/erm/app/service/purchase/PurchaseSearchService",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (TransactionListController, PurchaseService, PurchaseSearchService, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return TransactionListController.extend("sap.erm.app.controller.purchase.List", {
        onInitHook: function () {
            this._oService = new PurchaseService(this.getOwnerComponent());
            this._oSearchService = new PurchaseSearchService(this.getOwnerComponent());
            this._setupTableColumns();
        },
        getRouteName: function () { return "purchaseList"; },
        getService: function () { return this._oService; },
        getSearchService: function () { return this._oSearchService; },
        getDetailRouteName: function () { return "purchaseDetail"; },
        
        _setupTableColumns: function () {
            var oTable = this.byId(this.getTableId());
            oTable.addColumn(new Column({ header: new Text({ text: "PO Number" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Vendor" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Date" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Gross Amount" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>id}" }),
                    new Text({ text: "{model>vendorName}" }),
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

sap.ui.define([
    "sap/erm/app/core/TransactionListController",
    "sap/erm/app/service/inventory/InventoryService",
    "sap/erm/app/service/inventory/InventorySearchService",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (TransactionListController, InventoryService, InventorySearchService, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return TransactionListController.extend("sap.erm.app.controller.inventory.List", {
        onInitHook: function () {
            this._oService = new InventoryService(this.getOwnerComponent());
            this._oSearchService = new InventorySearchService(this.getOwnerComponent());
            this._setupTableColumns();
        },
        getRouteName: function () { return "inventoryList"; },
        getService: function () { return this._oService; },
        getSearchService: function () { return this._oSearchService; },
        getDetailRouteName: function () { return "inventoryDetail"; },
        
        _setupTableColumns: function () {
            var oTable = this.byId(this.getTableId());
            oTable.addColumn(new Column({ header: new Text({ text: "Inventory ID" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Product" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Warehouse" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Bin" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Available Qty" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>id}" }),
                    new Text({ text: "{model>productName} ({model>productCode})" }),
                    new Text({ text: "{model>warehouseName}" }),
                    new Text({ text: "{model>bin}" }),
                    new ObjectStatus({
                        text: "{model>availableQuantity} {model>uom}",
                        state: "{= ${model>availableQuantity} <= ${model>reorderLevel} ? 'Error' : 'Success' }"
                    }),
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

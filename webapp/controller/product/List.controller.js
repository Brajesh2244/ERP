sap.ui.define([
    "sap/erm/app/core/MasterDataListController",
    "sap/erm/app/service/product/ProductService",
    "sap/erm/app/service/product/ProductSearchService",
    "sap/erm/app/service/product/ProductExportService",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (MasterDataListController, ProductService, ProductSearchService, ProductExportService, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return MasterDataListController.extend("sap.erm.app.controller.product.List", {
        onInitHook: function () {
            this._oService = new ProductService(this.getOwnerComponent());
            this._oSearchService = new ProductSearchService(this.getOwnerComponent());
            this._oExportService = new ProductExportService(this.getOwnerComponent());
            this._setupTableColumns();
        },
        getRouteName: function () { return "products"; },
        getService: function () { return this._oService; },
        getSearchService: function () { return this._oSearchService; },
        getExportService: function () { return this._oExportService; },
        getDetailRouteName: function () { return "productDetail"; },
        getCreateRouteName: function () { return "productCreate"; },
        
        _setupTableColumns: function () {
            var oTable = this.byId(this.getTableId());
            oTable.addColumn(new Column({ header: new Text({ text: "SKU" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Product Name" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Category" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Brand" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Price" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Stock" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>productCode}" }),
                    new Text({ text: "{model>productName}" }),
                    new Text({ text: "{model>category}" }),
                    new Text({ text: "{model>brand}" }),
                    new Text({ text: "{model>currency} {model>sellingPrice}" }),
                    new ObjectStatus({
                        text: "{model>stock}",
                        state: "{= ${model>stock} <= ${model>reorderLevel} ? 'Error' : 'Success' }"
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

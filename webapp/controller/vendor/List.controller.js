sap.ui.define([
    "sap/erm/app/core/MasterDataListController",
    "sap/erm/app/service/vendor/VendorService",
    "sap/erm/app/service/vendor/VendorSearchService",
    "sap/erm/app/service/vendor/VendorExportService",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (MasterDataListController, VendorService, VendorSearchService, VendorExportService, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return MasterDataListController.extend("sap.erm.app.controller.vendor.List", {
        onInitHook: function () {
            this._oService = new VendorService(this.getOwnerComponent());
            this._oSearchService = new VendorSearchService(this.getOwnerComponent());
            this._oExportService = new VendorExportService(this.getOwnerComponent());
            this._setupTableColumns();
        },
        getRouteName: function () { return "vendors"; },
        getService: function () { return this._oService; },
        getSearchService: function () { return this._oSearchService; },
        getExportService: function () { return this._oExportService; },
        getDetailRouteName: function () { return "vendorDetail"; },
        getCreateRouteName: function () { return "vendorCreate"; },
        
        _setupTableColumns: function () {
            var oTable = this.byId(this.getTableId());
            oTable.addColumn(new Column({ header: new Text({ text: "Code" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Vendor Name" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Contact" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Email" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Category" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>vendorCode}" }),
                    new Text({ text: "{model>vendorName}" }),
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
        }
    });
});

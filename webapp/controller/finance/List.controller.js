sap.ui.define([
    "sap/erm/app/core/TransactionListController",
    "sap/erm/app/service/finance/FinanceService",
    "sap/erm/app/service/finance/AccountingSearchService",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ColumnListItem"
], function (TransactionListController, FinanceService, AccountingSearchService, Column, Text, ObjectStatus, ColumnListItem) {
    "use strict";

    return TransactionListController.extend("sap.erm.app.controller.finance.List", {
        onInitHook: function () {
            this._oService = new FinanceService(this.getOwnerComponent());
            this._oSearchService = new AccountingSearchService(this.getOwnerComponent());
            this._setupTableColumns();
        },
        getRouteName: function () { return "financeList"; },
        getService: function () { return this._oService; },
        getSearchService: function () { return this._oSearchService; },
        getDetailRouteName: function () { return "financeDetail"; },
        
        _setupTableColumns: function () {
            var oTable = this.byId(this.getTableId());
            oTable.addColumn(new Column({ header: new Text({ text: "Journal No." }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Date" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Reference" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Total Debit" }) }));
            oTable.addColumn(new Column({ header: new Text({ text: "Status" }) }));

            var oTemplate = new ColumnListItem({
                type: "Navigation",
                press: this.onItemPress.bind(this),
                cells: [
                    new Text({ text: "{model>id}" }),
                    new Text({ text: "{ path: 'model>postingDate', formatter: '.formatter.date' }" }),
                    new Text({ text: "{model>referenceDocument}" }),
                    new Text({ text: "{model>currency} {model>totalDebit}" }),
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

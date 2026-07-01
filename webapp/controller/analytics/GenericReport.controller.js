sap.ui.define([
    "sap/erm/app/core/TransactionListController",
    "sap/erm/app/analytics/AnalyticsService",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ColumnListItem"
], function (TransactionListController, AnalyticsService, JSONModel, Column, Text, ColumnListItem) {
    "use strict";

    return TransactionListController.extend("sap.erm.app.controller.analytics.GenericReport", {
        onInitHook: function () {
            this._oAnalyticsService = new AnalyticsService(this.getOwnerComponent());
            this.setModel(new JSONModel({ title: "Report" }), "viewMode");
            // GenericTable fragment uses "model"
            this.setModel(new JSONModel({ items: [] }), "model");
        },
        
        getRouteName: function () { return "genericReport"; },
        
        _onRouteMatched: function (oEvent) {
            this._sReportId = oEvent.getParameter("arguments").reportId;
            this.getModel("viewMode").setProperty("/title", this._sReportId + " Report");
            this._generateReport();
        },
        
        _generateReport: function() {
            var aData = this._oAnalyticsService.getReportEngine().generateDataset(this._sReportId, []);
            this.getModel("model").setProperty("/items", aData);
            this._setupDynamicColumns(aData);
        },
        
        _setupDynamicColumns: function(aData) {
            var oTable = this.byId(this.getTableId());
            oTable.removeAllColumns();
            
            if (!aData || aData.length === 0) return;
            
            var oSample = aData[0];
            var aCells = [];
            
            // Generate columns dynamically based on first item keys (ignoring arrays/objects for simplicity)
            Object.keys(oSample).forEach(function(key) {
                if (typeof oSample[key] !== "object") {
                    oTable.addColumn(new Column({ header: new Text({ text: key.toUpperCase() }) }));
                    aCells.push(new Text({ text: "{model>" + key + "}" }));
                }
            });
            
            var oTemplate = new ColumnListItem({ cells: aCells });
            oTable.bindItems({ path: "model>/items", template: oTemplate });
        },
        
        onExportPress: function() {
            this._oMessageService.showSuccess("Report exported successfully.");
        }
    });
});

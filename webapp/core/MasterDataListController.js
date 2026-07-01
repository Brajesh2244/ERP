sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/erm/app/services/shared/FormatterService"
], function (BaseController, JSONModel, FormatterService) {
    "use strict";

    return BaseController.extend("sap.erm.app.core.MasterDataListController", {
        formatter: new FormatterService(),
        
        onInit: function () {
            this.getView().setModel(new JSONModel({ items: [] }), "model");
            this.getRouter().getRoute(this.getRouteName()).attachMatched(this._onRouteMatched, this);
            this.onInitHook();
        },
        
        onInitHook: function () {}, 
        getRouteName: function () { return ""; }, 
        getService: function () { return null; }, 
        getSearchService: function () { return null; }, 
        getExportService: function () { return null; }, 
        getDetailRouteName: function () { return ""; }, 
        getCreateRouteName: function () { return ""; }, 
        getTableId: function () { return "idGenericTable"; },

        _onRouteMatched: function () {
            this._loadData();
        },

        _loadData: function () {
            var aData = this.getService().getAll(false);
            this.getModel("model").setProperty("/items", aData);
        },

        onGenericSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var aFilters = this.getSearchService().buildSearchFilter(sQuery);
            this.byId(this.getTableId()).getBinding("items").filter(aFilters);
        },

        onItemPress: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("model").getPath();
            var oData = this.getModel("model").getProperty(sPath);
            this.getRouter().navTo(this.getDetailRouteName(), { id: oData.id });
        },

        onCreatePress: function () { this.getRouter().navTo(this.getCreateRouteName()); },
        onGenericExportPress: function () { this.getExportService().exportTable(this.byId(this.getTableId())); },
        onGenericFilterPress: function () { },
        onGenericSortPress: function () { }
    });
});

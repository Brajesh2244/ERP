sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/analytics/ReportEngine",
    "sap/erm/app/analytics/KPIService",
    "sap/erm/app/analytics/DashboardService",
    "sap/erm/app/analytics/ChartService",
    "sap/erm/app/analytics/DrillDownService"
], function (BaseService, ReportEngine, KPIService, DashboardService, ChartService, DrillDownService) {
    "use strict";

    return BaseService.extend("sap.erm.app.analytics.AnalyticsService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oReportEngine = new ReportEngine(oComponent);
            this._oKPIService = new KPIService(oComponent);
            this._oDashboardService = new DashboardService(oComponent);
            this._oChartService = new ChartService(oComponent);
            this._oDrillDownService = new DrillDownService(oComponent);
        },
        
        getReportEngine: function() { return this._oReportEngine; },
        getKPIService: function() { return this._oKPIService; },
        getDashboardService: function() { return this._oDashboardService; },
        getChartService: function() { return this._oChartService; },
        getDrillDownService: function() { return this._oDrillDownService; },
        
        // Convenience wrapper methods for cross-module aggregations could be added here
        aggregateDataForReport: function(sModule, aFilters) {
            return this._oReportEngine.generateDataset(sModule, aFilters);
        }
    });
});

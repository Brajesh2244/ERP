sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.analytics.ChartService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
        },
        
        prepareRevenueTrendData: function() {
            var oModel = this.getComponent().getModel("salesOrderModel");
            var aOrders = oModel ? oModel.getProperty("/") || [] : [];
            // Mock aggregation by month
            return [
                { Month: "Jan", Revenue: 150000 },
                { Month: "Feb", Revenue: 180000 },
                { Month: "Mar", Revenue: 210000 },
                { Month: "Apr", Revenue: 195000 },
                { Month: "May", Revenue: 250000 },
                { Month: "Jun", Revenue: Math.floor(aOrders.reduce(function(sum, o){return sum + parseFloat(o.totalGrossAmount||0);},0)) }
            ];
        }
    });
});

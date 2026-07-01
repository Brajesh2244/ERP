sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/core/BusyIndicator"
], function (BaseService, BusyIndicator) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.shared.LoadingService", {
        show: function (iDelay) {
            BusyIndicator.show(iDelay || 0);
        },
        hide: function () {
            BusyIndicator.hide();
        }
    });
});

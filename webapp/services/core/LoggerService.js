sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/core/Logger"
], function (BaseService, Logger) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.core.LoggerService", {
        logInfo: function (sMsg) { Logger.prototype.info(sMsg); },
        logError: function (sMsg) { Logger.prototype.error(sMsg); },
        logAudit: function (sAction, oData) { Logger.prototype.audit(sAction, oData); }
    });
});

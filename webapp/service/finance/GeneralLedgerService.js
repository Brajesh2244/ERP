sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/finance/GeneralLedgerRepository"
], function (BaseService, GeneralLedgerRepository) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.finance.GeneralLedgerService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepo = new GeneralLedgerRepository(oComponent);
        },
        getAll: function() {
            return this._oRepo.getAll();
        }
    });
});

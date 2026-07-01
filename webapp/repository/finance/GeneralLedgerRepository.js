sap.ui.define(["sap/erm/app/core/BaseRepository"], function (BaseRepository) {
    "use strict";
    return BaseRepository.extend("sap.erm.app.repository.finance.GeneralLedgerRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "generalLedgerModel", oComponent);
        }
    });
});

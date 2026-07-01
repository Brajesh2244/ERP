sap.ui.define(["sap/erm/app/core/BaseRepository"], function (BaseRepository) {
    "use strict";
    return BaseRepository.extend("sap.erm.app.repository.finance.ChartOfAccountsRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "chartOfAccountsModel", oComponent);
        }
    });
});

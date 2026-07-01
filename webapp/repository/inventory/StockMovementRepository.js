sap.ui.define(["sap/erm/app/core/BaseRepository"], function (BaseRepository) {
    "use strict";
    return BaseRepository.extend("sap.erm.app.repository.inventory.StockMovementRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "stockMovementModel", oComponent);
        },
        create: function (oMovement) {
            var oModel = this.getModel();
            var aData = oModel.getProperty("/") || [];
            aData.unshift(oMovement); // add to top of ledger
            oModel.setProperty("/", aData);
            return Promise.resolve(oMovement);
        }
    });
});

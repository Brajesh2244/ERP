sap.ui.define(["sap/erm/app/core/BaseService", "sap/erm/app/repository/inventory/WarehouseRepository"], function (BaseService, WarehouseRepository) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.inventory.WarehouseService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new WarehouseRepository(oComponent);
        },
        getAll: function () { return this._oRepository.getAll() || []; }
    });
});

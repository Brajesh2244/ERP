sap.ui.define(["sap/erm/app/core/BaseRepository"], function (BaseRepository) {
    "use strict";
    return BaseRepository.extend("sap.erm.app.repository.finance.JournalRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "journalEntryModel", oComponent);
        }
    });
});

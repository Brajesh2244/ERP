sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/finance/JournalRepository",
    "sap/erm/app/repository/finance/JournalLineRepository",
    "sap/erm/app/service/finance/LedgerService"
], function (BaseService, JournalRepository, JournalLineRepository, LedgerService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.finance.PostingService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oJournalRepo = new JournalRepository(oComponent);
            this._oJournalLineRepo = new JournalLineRepository(oComponent);
            this._oLedgerService = new LedgerService(oComponent);
        },
        postJournal: function (sJournalId, aLines) {
            // Validations done in ValidationService
            // Here we just execute the post
            var oEventBus = this.getComponent().getEventBus();
            var that = this;
            
            return new Promise(function(resolve, reject) {
                // Update Ledger
                that._oLedgerService.updateLedgerBalances(aLines).then(function() {
                    var oHeader = that._oJournalRepo.getById("id", sJournalId);
                    if (oHeader) {
                        oHeader.status = "POSTED";
                        that._oJournalRepo.update(sJournalId, oHeader);
                    }
                    oEventBus.publish("Finance", "JournalPosted", { id: sJournalId });
                    resolve(true);
                }).catch(function(err) {
                    reject(err);
                });
            });
        }
    });
});

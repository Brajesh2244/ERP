sap.ui.define([
    "sap/erm/app/core/BaseAccountingService",
    "sap/erm/app/repository/finance/JournalRepository",
    "sap/erm/app/service/finance/PostingService"
], function (BaseAccountingService, JournalRepository, PostingService) {
    "use strict";

    return BaseAccountingService.extend("sap.erm.app.service.finance.FinanceService", {
        constructor: function (oComponent) {
            BaseAccountingService.prototype.constructor.call(this, oComponent, "journalEntryModel", "journalLineModel");
            this._oRepository = new JournalRepository(oComponent);
            this._oPostingService = new PostingService(oComponent);
        },
        getAll: function () {
            return this._oRepository.getAll() || [];
        },
        getById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        postJournal: function (sJournalId) {
            var oRecord = this.getById(sJournalId);
            if (!oRecord) return Promise.reject("Journal not found.");
            var aLines = this.getItemsByHeaderId(sJournalId) || [];
            return this._oPostingService.postJournal(sJournalId, aLines);
        }
    });
});

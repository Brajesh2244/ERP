sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/finance/GeneralLedgerRepository"
], function (BaseService, GeneralLedgerRepository) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.finance.LedgerService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepo = new GeneralLedgerRepository(oComponent);
        },
        updateLedgerBalances: function (aJournalLines) {
            var that = this;
            aJournalLines.forEach(function(line) {
                var aLedgers = that._oRepo.getAll() || [];
                var oLedger = aLedgers.find(function(l) { return l.accountId === line.accountId; });
                if (oLedger) {
                    var debit = parseFloat(line.debitAmount || 0);
                    var credit = parseFloat(line.creditAmount || 0);
                    // Standard logic: Assets/Expenses increase with Debit. Liabilities/Equity/Revenue increase with Credit.
                    // For simplicity in mock, just tracking running balance generically.
                    oLedger.currentBalance += (debit - credit);
                    that._oRepo.update(oLedger.id, oLedger);
                }
            });
            this.getComponent().getEventBus().publish("Finance", "LedgerUpdated", {});
            return Promise.resolve(true);
        }
    });
});

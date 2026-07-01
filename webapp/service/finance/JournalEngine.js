sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/service/core/TransactionNumberService"
], function (BaseService, TransactionNumberService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.finance.JournalEngine", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oNumberService = new TransactionNumberService(oComponent);
        },
        createJournalObject: function (aLines, sNarration, sRef) {
            var dTotalDebit = 0;
            var dTotalCredit = 0;
            aLines.forEach(function(l) {
                dTotalDebit += parseFloat(l.debitAmount || 0);
                dTotalCredit += parseFloat(l.creditAmount || 0);
            });
            
            return {
                header: {
                    id: this._oNumberService.generateNumber("JE"),
                    postingDate: new Date().toISOString(),
                    documentDate: new Date().toISOString(),
                    referenceDocument: sRef || "",
                    documentType: "SA",
                    companyCode: "COMP10",
                    currency: "USD",
                    status: "DRAFT",
                    totalDebit: dTotalDebit.toFixed(2),
                    totalCredit: dTotalCredit.toFixed(2),
                    narration: sNarration || ""
                },
                lines: aLines
            };
        }
    });
});

sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.finance.AccountingValidationService", {
        validateJournal: function (oHeader, aLines) {
            var aErrors = [];
            var dTotalDebit = 0;
            var dTotalCredit = 0;

            if (!aLines || aLines.length < 2) {
                aErrors.push("A journal entry requires at least two lines.");
            }

            aLines.forEach(function (line) {
                if (!line.accountId) aErrors.push("Account ID is required for all lines.");
                dTotalDebit += parseFloat(line.debitAmount || 0);
                dTotalCredit += parseFloat(line.creditAmount || 0);
            });

            if (dTotalDebit !== dTotalCredit) {
                aErrors.push("Journal is unbalanced. Total Debit: " + dTotalDebit + ", Total Credit: " + dTotalCredit);
            }

            return aErrors;
        }
    });
});

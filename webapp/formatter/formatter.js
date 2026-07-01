sap.ui.define([], function () {
    "use strict";

    return {
        statusState: function (sIndicator) {
            switch (sIndicator) {
                case "Up":
                    return "Success";
                case "Down":
                    return "Error";
                default:
                    return "None";
            }
        },

        formatCurrency: function (sValue, sCurrency) {
            if (!sValue) { return ""; }
            return sValue + " " + (sCurrency || "");
        }
    };
});

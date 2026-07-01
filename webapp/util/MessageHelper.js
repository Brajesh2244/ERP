sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (MessageToast, MessageBox) {
    "use strict";

    return {
        showToast: function (sMessage) {
            MessageToast.show(sMessage);
        },
        showError: function (sMessage) {
            MessageBox.error(sMessage);
        }
    };
});

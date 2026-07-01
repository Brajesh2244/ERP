sap.ui.define([
    "sap/ui/base/Object",
    "sap/erm/app/util/MessageHelper"
], function (BaseObject, MessageHelper) {
    "use strict";

    return BaseObject.extend("sap.erm.app.core.ErrorHandler", {
        handleError: function (oError) {
            var sMessage = oError.message || "An unexpected error occurred.";
            MessageHelper.showError(sMessage);
            console.error("[ErrorHandler]", oError);
        }
    });
});

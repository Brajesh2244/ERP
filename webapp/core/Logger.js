sap.ui.define([
    "sap/ui/base/Object"
], function (BaseObject) {
    "use strict";

    return BaseObject.extend("sap.erm.app.core.Logger", {
        info: function (sMessage, oData) {
            console.info("[INFO] " + sMessage, oData || "");
        },
        warning: function (sMessage, oData) {
            console.warn("[WARN] " + sMessage, oData || "");
        },
        error: function (sMessage, oData) {
            console.error("[ERROR] " + sMessage, oData || "");
        },
        debug: function (sMessage, oData) {
            console.debug("[DEBUG] " + sMessage, oData || "");
        },
        audit: function (sAction, oData) {
            // Placeholder for audit logging
            console.log("[AUDIT] " + sAction, oData || "");
        }
    });
});

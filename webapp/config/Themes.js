sap.ui.define([], function () {
    "use strict";
    return {
        SUPPORTED_THEMES: [
            { key: "sap_fiori_3", name: "Quartz Light" },
            { key: "sap_fiori_3_dark", name: "Quartz Dark" },
            { key: "sap_horizon", name: "Morning Horizon" },
            { key: "sap_horizon_dark", name: "Evening Horizon" }
        ],
        DEFAULT_THEME: "sap_horizon"
    };
});

sap.ui.define([], function () {
    "use strict";

    return {
        isMockMode: true,
        apiBaseUrl: "/api/v1/",
        defaultTheme: "sap_horizon",
        supportedThemes: ["sap_horizon", "sap_horizon_dark"],
        enableCaching: true,
        sessionTimeoutMinutes: 60
    };
});

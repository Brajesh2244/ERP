sap.ui.define([], function () {
    "use strict";
    return {
        MODELS: {
            USER: "userModel",
            SESSION: "sessionModel",
            SETTINGS: "settingsModel",
            NOTIFICATION: "notificationModel",
            APP_STATE: "appStateModel"
        },
        EVENTS: {
            SESSION_EXPIRED: "sessionExpired",
            USER_LOGGED_IN: "userLoggedIn",
            USER_LOGGED_OUT: "userLoggedOut"
        }
    };
});

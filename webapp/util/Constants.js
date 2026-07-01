sap.ui.define([], function () {
    "use strict";

    return {
        ROUTES: {
            LOGIN: "login",
            MAIN: "main",
            DASHBOARD: "dashboard",
            NOT_FOUND: "notFound",
            EMPLOYEES: "employees"
        },
        MODELS: {
            USER: "userModel",
            EMPLOYEE: "employeeModel"
        },
        EVENTS: {
            SESSION_EXPIRED: "sessionExpired",
            USER_LOGGED_IN: "userLoggedIn",
            USER_LOGGED_OUT: "userLoggedOut"
        },
        ROLES: {
            ADMIN: "System Administrator",
            HR: "HR",
            MANAGER: "Manager",
            EMPLOYEE: "Employee"
        }
    };
});

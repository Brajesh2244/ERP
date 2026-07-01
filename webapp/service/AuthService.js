sap.ui.define([
    "sap/erm/app/service/core/BaseService"
], function (BaseService) {
    "use strict";

    /**
     * AuthService handles authentication logic.
     * PLACEHOLDER FOR FUTURE BTP/GATEWAY AUTHENTICATION (OAuth/SAML)
     */
    return BaseService.extend("sap.erm.app.service.AuthService", {
        
        login: function (sUsername, sPassword) {
            // Mock authentication logic
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    // Using hardcoded check for reliable demo since models might not be loaded at login view init
                    var oUsers = {
                        "admin": { pass: "admin123", role: "System Administrator", name: "System Administrator" },
                        "employee": { pass: "employee123", role: "Employee", name: "Standard Employee" },
                        "sales": { pass: "sales123", role: "Sales Manager", name: "Sales Manager" },
                        "inventory": { pass: "inventory123", role: "Inventory Manager", name: "Inventory Manager" },
                        "purchase": { pass: "purchase123", role: "Purchase Manager", name: "Purchase Manager" },
                        "finance": { pass: "finance123", role: "Finance Manager", name: "Finance Manager" },
                        "viewer": { pass: "viewer123", role: "Viewer", name: "Read Only Viewer" }
                    };
                    
                    var user = oUsers[sUsername];
                    if (user && user.pass === sPassword) {
                        resolve({
                            token: "mock-jwt-token-" + sUsername,
                            username: sUsername,
                            role: user.role,
                            fullName: user.name
                        });
                    } else {
                        reject(new Error("Invalid credentials"));
                    }
                }, 800);
            });
        },

        logout: function () {
            // Mock logout
            return Promise.resolve();
        },

        getToken: function () {
            // Placeholder for retrieving auth token
            return "mock-jwt-token-12345";
        }
    });
});

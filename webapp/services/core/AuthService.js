sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/models/SessionModel"
], function (BaseService, SessionModel) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.core.AuthService", {
        login: function (sUsername, sPassword, bRememberMe) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
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
                        // Mock session generation
                        var iTimeout = 60 * 60 * 1000; // 1 hour
                        var oSessionData = {
                            token: "mock-jwt-" + Date.now(),
                            expiresAt: Date.now() + iTimeout,
                            isAuthenticated: true
                        };
                        
                        var oSessionModel = this.getModel("sessionModel");
                        if (oSessionModel) {
                            oSessionModel.setData(oSessionData);
                        }

                        var oUserModel = this.getModel("userModel");
                        if (oUserModel) {
                            oUserModel.setData({
                                username: sUsername,
                                role: user.role,
                                fullName: user.name
                            });
                        }

                        // Local storage for Remember Me
                        if (bRememberMe) {
                            localStorage.setItem("erm_remember_me", sUsername);
                        } else {
                            localStorage.removeItem("erm_remember_me");
                        }

                        resolve({ token: oSessionData.token, user: sUsername });
                    } else {
                        reject(new Error("Invalid credentials"));
                    }
                }.bind(this), 1000);
            }.bind(this));
        },
        logout: function () {
            var oSessionModel = this.getModel("sessionModel");
            if (oSessionModel) {
                oSessionModel.setData({
                    token: null,
                    expiresAt: null,
                    isAuthenticated: false
                });
            }
            return Promise.resolve();
        }
    });
});

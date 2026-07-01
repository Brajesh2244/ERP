sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/core/Configuration",
    "sap/erm/app/config/AppConfig",
    "sap/erm/app/config/Constants",
    "sap/erm/app/core/ErrorHandler",
    "sap/erm/app/core/EventBus",
    "sap/erm/app/repository/RepositoryFactory",
    "sap/erm/app/models/UserModel",
    "sap/erm/app/models/SessionModel",
    "sap/erm/app/models/SettingsModel",
    "sap/erm/app/models/NotificationModel",
    "sap/erm/app/models/ApplicationStateModel",
    "sap/erm/app/models/ThemeModel",
    "sap/erm/app/services/core/ConfigurationService",
    "sap/erm/app/services/core/LoggerService",
    "sap/ui/model/json/JSONModel",
    "sap/erm/app/integration/IntegrationService"
], function (
    UIComponent, Device, Configuration, AppConfig, Constants, ErrorHandler, EventBusWrapper, 
    RepositoryFactory, UserModel, SessionModel, SettingsModel, NotificationModel, 
    ApplicationStateModel, ThemeModel, ConfigurationService, LoggerService, JSONModel, IntegrationService
) {
    "use strict";

    return UIComponent.extend("sap.erm.app.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // 8. Global ErrorHandler registration
            this._oErrorHandler = new ErrorHandler();
            window.onerror = function (message, source, lineno, colno, error) {
                this._oErrorHandler.handleError(error || { message: message });
            }.bind(this);

            // 1. Component base initialization
            UIComponent.prototype.init.apply(this, arguments);

            // 5. EventBus initialization
            this._oEventBus = new EventBusWrapper();

            // 9. Application configuration loading & 4. Service registration
            this._oConfigService = new ConfigurationService(this);
            this._oLoggerService = new LoggerService(this);
            
            this._oLoggerService.logInfo("Component initialization started");

            // 6. Theme initialization
            var sTheme = AppConfig.defaultTheme;
            Configuration.setTheme(sTheme);

            // 2. Global model registration & 11. Mock data initialization
            this._initGlobalModels();

            // 3. RepositoryFactory initialization
            this._oRepoFactory = new RepositoryFactory();

            // Initialize Enterprise Integration Service
            this._oIntegrationService = new IntegrationService(this);
            
            // Initialize RBAC Security Service
            sap.ui.require(["sap/erm/app/service/admin/RBACService", "sap/erm/app/service/admin/AuditLogService"], function(RBACService, AuditLogService) {
                this._oRBACService = new RBACService(this);
                this._oAuditLogService = new AuditLogService(this);
                
                // RBAC Route Guard
                this.getRouter().attachRouteMatched(function(oEvent) {
                    var sRoute = oEvent.getParameter("name");
                    var sRole = this.getModel("userModel") ? this.getModel("userModel").getProperty("/role") : "System Administrator";
                    if (!this._oRBACService.isRouteAllowed(sRole, sRoute) && sRoute !== "unauthorized" && sRoute !== "login") {
                        this.getRouter().navTo("unauthorized");
                    }
                }.bind(this));
            }.bind(this));

            // Set the device model
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // 10. Startup sequence (Routing)
            var oRouter = this.getRouter();
            
            // Route Guards
            oRouter.attachRouteMatched(this._onRouteMatched, this);
            oRouter.attachBypassed(this._onBypassed, this);

            oRouter.initialize();
            
            this._oLoggerService.logInfo("Component initialization completed");
        },

        _onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name");
            var oSessionModel = this.getModel(Constants.MODELS.SESSION);
            var bIsAuthenticated = oSessionModel.getProperty("/isAuthenticated");

            // Allow public routes
            if (sRouteName === "login" || sRouteName === "unauthorized" || sRouteName === "forbidden") {
                return;
            }

            // Redirect unauthenticated users
            if (!bIsAuthenticated) {
                this.getRouter().navTo("login", {}, true);
                this.getLogger().logWarning("Unauthenticated access attempt to route: " + sRouteName);
                return;
            }

            // Session timeout check placeholder
            var iExpiresAt = oSessionModel.getProperty("/expiresAt");
            if (iExpiresAt && Date.now() > iExpiresAt) {
                // Session expired
                this.getEventBusWrapper().publish("auth", "sessionExpired");
                this.getRouter().navTo("login", {}, true);
                this.getLogger().logWarning("Session expired");
                return;
            }
        },

        _onBypassed: function (oEvent) {
            var sHash = oEvent.getParameter("hash");
            this.getLogger().logWarning("Unknown route bypassed: " + sHash);
        },

        _initGlobalModels: function () {
            this.setModel(new UserModel(), Constants.MODELS.USER);
            this.setModel(new SessionModel(), Constants.MODELS.SESSION);
            this.setModel(new SettingsModel(), Constants.MODELS.SETTINGS);
            this.setModel(new NotificationModel(), Constants.MODELS.NOTIFICATION);
            this.setModel(new ApplicationStateModel(), Constants.MODELS.APP_STATE);
            this.setModel(new ThemeModel(), "themeModel");
        },

        // 7. Application lifecycle management
        destroy: function () {
            if (this._oLoggerService) {
                this._oLoggerService.logInfo("Component destroying");
            }
            this._oErrorHandler = null;
            this._oEventBus = null;
            this._oConfigService = null;
            this._oLoggerService = null;
            this._oRepoFactory = null;
            
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        // 12. Dependency injection getters
        getEventBusWrapper: function () { return this._oEventBus; },
        getRepositoryFactory: function () { return this._oRepoFactory; },
        getLogger: function () { return this._oLoggerService; },

        getContentDensityClass: function () {
            if (this._sContentDensityClass === undefined) {
                if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                    this._sContentDensityClass = "";
                } else if (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });
});

sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/erm/app/config/Themes"
], function (JSONModel, ThemesConfig) {
    "use strict";

    return JSONModel.extend("sap.erm.app.models.ThemeModel", {
        constructor: function () {
            JSONModel.apply(this, [{
                currentTheme: ThemesConfig.DEFAULT_THEME,
                supportedThemes: ThemesConfig.SUPPORTED_THEMES
            }]);
        }
    });
});

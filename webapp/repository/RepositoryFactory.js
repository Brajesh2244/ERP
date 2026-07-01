sap.ui.define([
    "sap/ui/base/Object",
    "./MockRepositoryAdapter",
    "./ODataRepositoryAdapter",
    "sap/erm/app/config/AppConfig"
], function (BaseObject, MockRepositoryAdapter, ODataRepositoryAdapter, AppConfig) {
    "use strict";

    return BaseObject.extend("sap.erm.app.repository.RepositoryFactory", {
        getAdapter: function (sModelName, oComponent) {
            if (AppConfig.isMockMode) {
                return new MockRepositoryAdapter(sModelName, oComponent);
            } else {
                return new ODataRepositoryAdapter(sModelName, oComponent);
            }
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.Placeholder", {
        onInit: function () {
            this._oViewModel = new JSONModel({
                moduleName: "",
                moduleDescription: "",
                moduleIcon: "sap-icon://time-entry-request"
            });
            this.getView().setModel(this._oViewModel);

            var oRouter = this.getRouter();
            oRouter.attachRouteMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name");
            var oConfig = {
                "customers": { title: "Customer Management", desc: "Manage enterprise customers", icon: "sap-icon://customer" },
                "vendors": { title: "Vendor Management", desc: "Manage enterprise vendors", icon: "sap-icon://supplier" },
                "products": { title: "Product Management", desc: "Manage products", icon: "sap-icon://product" },
                "inventory": { title: "Inventory Management", desc: "Manage stock and warehouses", icon: "sap-icon://shipping-status" },
                "sales": { title: "Sales Management", desc: "Manage sales orders", icon: "sap-icon://sales-order" },
                "purchase": { title: "Purchase Management", desc: "Manage purchase orders", icon: "sap-icon://purchasing" },
                "finance": { title: "Finance & Accounting", desc: "Manage ledgers and billing", icon: "sap-icon://lead" },
                "reports": { title: "Reports & Analytics", desc: "Enterprise business intelligence", icon: "sap-icon://business-objects-experience" },
                "administration": { title: "Administration", desc: "System administration", icon: "sap-icon://wrench" },
                "settings": { title: "Settings", desc: "User preferences", icon: "sap-icon://settings" },
                "help": { title: "Help & Support", desc: "User manuals and support", icon: "sap-icon://sys-help" }
            };

            if (oConfig[sRouteName]) {
                this._oViewModel.setData({
                    moduleName: oConfig[sRouteName].title,
                    moduleDescription: oConfig[sRouteName].desc,
                    moduleIcon: oConfig[sRouteName].icon
                });
            }
        }
    });
});

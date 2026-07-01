sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/customer/CustomerRepository"
], function (BaseService, CustomerRepository) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.customer.CustomerService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new CustomerRepository(oComponent);
        },
        getAllCustomers: function (bIncludeDeleted) {
            var aCustomers = this._oRepository.getAll() || [];
            if (bIncludeDeleted) return aCustomers;
            return aCustomers.filter(function(c) { return !c.deleted; });
        },
        getCustomerById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        createCustomer: function (oCustomer) {
            oCustomer.id = "CUST" + Date.now();
            oCustomer.deleted = false;
            oCustomer.createdDate = new Date().toISOString();
            oCustomer.updatedDate = new Date().toISOString();
            
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Customer", "CustomerCreated", oCustomer);
            
            return this._oRepository.create(oCustomer);
        },
        updateCustomer: function (sId, oCustomer) {
            oCustomer.updatedDate = new Date().toISOString();
            
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Customer", "CustomerUpdated", oCustomer);
            
            return this._oRepository.update(sId, oCustomer);
        },
        deleteCustomer: function (sId) {
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Customer", "CustomerDeleted", { id: sId });
            return this._oRepository.delete(sId);
        },
        restoreCustomer: function (sId) {
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Customer", "CustomerRestored", { id: sId });
            return this._oRepository.restore(sId);
        }
    });
});

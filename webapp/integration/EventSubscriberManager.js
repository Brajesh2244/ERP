sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/integration/subscriber/SalesOrderApprovedSubscriber",
    "sap/erm/app/integration/subscriber/InventoryReservationSubscriber",
    "sap/erm/app/integration/subscriber/GoodsReceiptSubscriber",
    "sap/erm/app/integration/subscriber/JournalPostingSubscriber",
    "sap/erm/app/integration/subscriber/NotificationSubscriber"
], function (BaseService, SalesOrderApprovedSubscriber, InventoryReservationSubscriber, GoodsReceiptSubscriber, JournalPostingSubscriber, NotificationSubscriber) {
    "use strict";

    return BaseService.extend("sap.erm.app.integration.EventSubscriberManager", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._aSubscribers = [
                new SalesOrderApprovedSubscriber(oComponent),
                new InventoryReservationSubscriber(oComponent),
                new GoodsReceiptSubscriber(oComponent),
                new JournalPostingSubscriber(oComponent),
                new NotificationSubscriber(oComponent)
            ];
        },
        
        registerSubscribers: function() {
            var oEventBus = this.getComponent().getEventBus();
            this._aSubscribers.forEach(function(oSubscriber) {
                oEventBus.subscribe(oSubscriber.getChannel(), oSubscriber.getEvent(), oSubscriber.onEvent, oSubscriber);
            });
        }
    });
});

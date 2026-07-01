sap.ui.define([
    "sap/erm/app/core/TransactionDetailController",
    "sap/erm/app/service/inventory/InventoryService",
    "sap/erm/app/service/inventory/StockMovementService",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function (TransactionDetailController, InventoryService, StockMovementService, Fragment, JSONModel) {
    "use strict";

    return TransactionDetailController.extend("sap.erm.app.controller.inventory.Detail", {
        onInitHook: function () {
            this._oService = new InventoryService(this.getOwnerComponent());
            this._oMovementService = new StockMovementService(this.getOwnerComponent());
        },
        getRouteName: function () { return "inventoryDetail"; },
        getListRouteName: function () { return "inventoryList"; },
        getService: function () { return this._oService; },
        getEntityName: function () { return "Inventory Item"; },

        _loadData: function () {
            var oRecord = this.getService().getById(this._sId);
            if (!oRecord) {
                this._oMessageService.showError("Inventory item not found.");
                this.getRouter().navTo(this.getListRouteName());
                return;
            }
            
            // Attach movements to the model for the table
            oRecord.movements = this._oMovementService.getByInventoryId(this._sId);
            this.getModel("model").setData(oRecord);
        },

        // Goods Receipt Dialog Logic
        onGoodsReceiptPress: function () {
            if (!this._oReceiptDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "sap.erm.app.fragments.inventory.GoodsReceiptDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oReceiptDialog = oDialog;
                    this.getView().addDependent(this._oReceiptDialog);
                    this._openReceiptDialog();
                }.bind(this));
            } else {
                this._openReceiptDialog();
            }
        },
        _openReceiptDialog: function () {
            var oData = this.getModel("model").getData();
            this._oReceiptDialog.setModel(new JSONModel({
                productName: oData.productName,
                productCode: oData.productCode,
                warehouseName: oData.warehouseName,
                quantity: 0,
                reference: ""
            }), "dialogModel");
            this._oReceiptDialog.open();
        },
        onConfirmGoodsReceipt: function () {
            var oDialogData = this._oReceiptDialog.getModel("dialogModel").getData();
            var iQty = parseInt(oDialogData.quantity, 10);
            if (isNaN(iQty) || iQty <= 0) {
                this._oMessageService.showError("Please enter a valid quantity.");
                return;
            }
            this._oService.postGoodsReceipt(this._sId, iQty, oDialogData.reference).then(function() {
                this._oMessageService.showSuccess("Goods Receipt posted successfully.");
                this._oReceiptDialog.close();
                this._loadData(); // Reload detail to show new stock and movement
            }.bind(this)).catch(function(err) {
                this._oMessageService.showError(err);
            }.bind(this));
        },
        onCancelGoodsReceipt: function () {
            this._oReceiptDialog.close();
        },

        // Goods Issue Dialog Logic
        onGoodsIssuePress: function () {
            if (!this._oIssueDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "sap.erm.app.fragments.inventory.GoodsIssueDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oIssueDialog = oDialog;
                    this.getView().addDependent(this._oIssueDialog);
                    this._openIssueDialog();
                }.bind(this));
            } else {
                this._openIssueDialog();
            }
        },
        _openIssueDialog: function () {
            var oData = this.getModel("model").getData();
            this._oIssueDialog.setModel(new JSONModel({
                productName: oData.productName,
                productCode: oData.productCode,
                availableQuantity: oData.availableQuantity,
                uom: oData.uom,
                quantity: 0,
                reference: ""
            }), "dialogModel");
            this._oIssueDialog.open();
        },
        onConfirmGoodsIssue: function () {
            var oDialogData = this._oIssueDialog.getModel("dialogModel").getData();
            var iQty = parseInt(oDialogData.quantity, 10);
            this._oService.postGoodsIssue(this._sId, iQty, oDialogData.reference).then(function() {
                this._oMessageService.showSuccess("Goods Issue posted successfully.");
                this._oIssueDialog.close();
                this._loadData();
            }.bind(this)).catch(function(err) {
                this._oMessageService.showError(err);
            }.bind(this));
        },
        onCancelGoodsIssue: function () {
            this._oIssueDialog.close();
        },

        // Stock Transfer Dialog Logic
        onTransferPress: function () {
            if (!this._oTransferDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "sap.erm.app.fragments.inventory.StockTransferDialog",
                    controller: this
                }).then(function (oDialog) {
                    this._oTransferDialog = oDialog;
                    this.getView().addDependent(this._oTransferDialog);
                    this._openTransferDialog();
                }.bind(this));
            } else {
                this._openTransferDialog();
            }
        },
        _openTransferDialog: function () {
            var oData = this.getModel("model").getData();
            this._oTransferDialog.setModel(new JSONModel({
                productName: oData.productName,
                productCode: oData.productCode,
                warehouseName: oData.warehouseName,
                availableQuantity: oData.availableQuantity,
                uom: oData.uom,
                targetInventoryId: "",
                quantity: 0,
                reference: ""
            }), "dialogModel");
            this._oTransferDialog.open();
        },
        onConfirmStockTransfer: function () {
            var oDialogData = this._oTransferDialog.getModel("dialogModel").getData();
            var iQty = parseInt(oDialogData.quantity, 10);
            this._oService.postTransfer(this._sId, oDialogData.targetInventoryId, iQty, oDialogData.reference).then(function() {
                this._oMessageService.showSuccess("Stock Transfer posted successfully.");
                this._oTransferDialog.close();
                this._loadData();
            }.bind(this)).catch(function(err) {
                this._oMessageService.showError(err);
            }.bind(this));
        },
        onCancelStockTransfer: function () {
            this._oTransferDialog.close();
        }
    });
});

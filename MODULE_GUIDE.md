# Module Guide

## 1. Master Data Module
**Path:** `webapp/repository/masterdata/`, `webapp/service/masterdata/`
Centralizes Customer, Employee, Vendor, and Material data. Serves as reference data for all transactional modules.

## 2. Inventory & Warehouse Management
**Path:** `webapp/service/inventory/`
Manages the Stock Ledger. Implements `GoodsReceipt`, `GoodsIssue`, and `InventoryReservation`. Operates fundamentally on a double-entry ledger principle for materials.

## 3. Sales Order Management (O2C)
**Path:** `webapp/service/sales/`
Governs the creation, pricing, and approval of Sales Orders. Emits `SalesOrderApproved` to the Integration Layer, which triggers Inventory Reservations and eventual Financial Accounts Receivable postings.

## 4. Purchase Order Management (P2P)
**Path:** `webapp/service/purchase/`
Governs procurement. Emits `PurchaseOrderApproved`, triggering expected Goods Receipts and Accounts Payable setups.

## 5. Financial Accounting (FI)
**Path:** `webapp/service/finance/`
The heart of the ERP. The `PostingService` validates and writes Journal Entries into the General Ledger. Strictly enforces the double-entry accounting rule (Credits must equal Debits).

## 6. Enterprise Reporting & Analytics
**Path:** `webapp/analytics/`
Aggregates live JSON data via the `ReportEngine`. Uses `sap.viz` for visualization. Drives role-based dashboards.

## 7. System Administration
**Path:** `webapp/service/admin/`
Governs Role-Based Access Control, Audit Logs, Application Settings, and System Health.

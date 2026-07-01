# Enterprise Architecture

## 1. Presentation Layer (SAP Fiori / OpenUI5)
The user interface is built entirely using XML Views and OpenUI5 controllers.
- Strict adherence to the SAP Fiori Design Guidelines (Fiori 3 / Horizon).
- Extensive use of generic fragments (`GenericTable.fragment.xml`, `GenericForm.fragment.xml`, `KPICard.fragment.xml`) to prevent UI code duplication.

## 2. Business Process & Integration Layer
Modules never call each other directly. Instead, they publish events to the global `sap.ui.core.EventBus`.
- **IntegrationService**: Instantiates and registers subscribers on system boot.
- **BusinessProcessService**: Orchestrates multi-step E2E flows (e.g., `OrderToCashProcess`, `ProcureToPayProcess`).
- **Event Subscribers**: Isolated listeners (e.g., `SalesOrderApprovedSubscriber`) that catch events and trigger business processes asynchronously.

## 3. Service Layer
Contains all domain-specific logic. Controllers delegate completely to Services.
- `PricingService` / `TaxService` / `DiscountService`
- `JournalEngine` / `PostingService` / `LedgerService`
- `InventoryService`
- `AnalyticsService` / `ReportEngine`

## 4. Data Access Layer
The `RepositoryFactory` is the single point of entry for CRUD operations. It standardizes standard read/write operations against the UI5 JSONModels (which mock OData V4 services).
- No controller or service accesses `sap.ui.model.json.JSONModel` directly for data mutation except via Repositories.

## 5. Security & Governance Layer
The `RBACService` intercepts route matching in `Component.js` to prevent unauthorized view initialization. The `AuditLogService` passively monitors the `EventBus` and records all critical state changes.

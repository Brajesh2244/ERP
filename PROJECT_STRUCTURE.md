# Enterprise Project Structure

```text
D:\SAP_ERM_App\
├── package.json
├── ui5.yaml
├── README.md
├── ARCHITECTURE.md
├── MODULE_GUIDE.md
├── DEPLOYMENT_GUIDE.md
├── RBAC_MATRIX.md
├── PROJECT_STRUCTURE.md
└── webapp\
    ├── index.html
    ├── Component.js
    ├── manifest.json
    ├── i18n\
    │   └── i18n.properties
    ├── config\
    │   ├── AppConfig.js
    │   └── Constants.js
    ├── core\
    │   ├── BaseController.js
    │   ├── BaseService.js
    │   ├── BaseRepository.js
    │   ├── ErrorHandler.js
    │   ├── EventBus.js
    │   ├── MasterDataListController.js
    │   ├── MasterDataDetailController.js
    │   └── TransactionListController.js
    ├── analytics\
    │   ├── AnalyticsService.js
    │   ├── ChartService.js
    │   ├── DashboardService.js
    │   ├── DrillDownService.js
    │   ├── KPIService.js
    │   └── ReportEngine.js
    ├── integration\
    │   ├── IntegrationService.js
    │   ├── BusinessProcessService.js
    │   ├── EventSubscriberManager.js
    │   ├── process\
    │   │   ├── OrderToCashProcess.js
    │   │   └── ProcureToPayProcess.js
    │   └── subscriber\
    │       ├── GoodsReceiptSubscriber.js
    │       ├── InventoryReservationSubscriber.js
    │       ├── JournalPostingSubscriber.js
    │       ├── NotificationSubscriber.js
    │       └── SalesOrderApprovedSubscriber.js
    ├── repository\
    │   └── RepositoryFactory.js
    ├── services\
    │   ├── core\
    │   ├── finance\
    │   ├── inventory\
    │   ├── purchase\
    │   └── sales\
    ├── service\
    │   └── admin\
    │       ├── AuditLogService.js
    │       ├── ConfigurationService.js
    │       ├── RBACService.js
    │       └── SystemHealthService.js
    ├── controller\
    │   ├── App.controller.js
    │   ├── Main.controller.js
    │   ├── Login.controller.js
    │   ├── Dashboard.controller.js
    │   ├── admin\
    │   ├── analytics\
    │   ├── finance\
    │   ├── inventory\
    │   ├── purchase\
    │   └── sales\
    ├── view\
    │   ├── App.view.xml
    │   ├── Main.view.xml
    │   ├── Login.view.xml
    │   ├── Dashboard.view.xml
    │   ├── admin\
    │   ├── analytics\
    │   ├── finance\
    │   ├── inventory\
    │   ├── purchase\
    │   └── sales\
    ├── fragments\
    │   ├── GenericTable.fragment.xml
    │   ├── GenericForm.fragment.xml
    │   ├── GenericSearch.fragment.xml
    │   ├── GenericChart.fragment.xml
    │   ├── KPICard.fragment.xml
    │   └── ...
    └── mockdata\
        └── [30+ JSON mock databases]
```

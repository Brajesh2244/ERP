# Role-Based Access Control (RBAC) Matrix

This matrix defines the authorization boundaries enforced by the `RBACService` inside `Component.js` and `BaseController.js`.

| Role | Accessible Routes | Permitted Actions |
|------|-------------------|-------------------|
| **System Administrator** | `*` (All Routes) | `*` (All Actions) |
| **Sales Manager** | `dashboard`, `salesList`, `salesDetail`, `genericReport` | View, Create, Edit, Approve, Export |
| **Purchase Manager** | `dashboard`, `purchaseList`, `purchaseDetail`, `genericReport` | View, Create, Edit, Approve, Export |
| **Finance Manager** | `dashboard`, `financeList`, `financeDetail`, `genericReport` | View, Create, Edit, Approve, Export |
| **Inventory Manager** | `inventoryDashboard`, `inventoryList`, `inventoryDetail`, `genericReport` | View, Create, Edit, Export |
| **Employee** | `dashboard` | View |
| **Read Only** | All transactional lists/details | View |

## Route Guard Mechanism
If a user with role **Inventory Manager** attempts to navigate to `/finance/100`, the `Router.attachRouteMatched` hook intercepts the hash change, evaluates `isRouteAllowed("Inventory Manager", "financeDetail")`, which returns `false`, and immediately redirects the user to the `unauthorized` view.

## Button Guard Mechanism
In XML Views, button visibilities can be bound to formatter logic, or handled in the controller via:
`this.byId("btnApprove").setVisible(this.hasPermission("Approve"));`

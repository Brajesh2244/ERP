# Deployment Guide (SAP BTP)

## Prerequisites
- SAP Business Technology Platform (BTP) Account.
- Cloud Foundry CLI installed.
- UI5 CLI installed (`npm install -g @ui5/cli`).
- MTA Build Tool (`mbt`).

## Preparation
1. Ensure `manifest.json` reflects production API endpoints (OData V4) rather than local `/mockdata/` URIs.
2. Ensure the `xs-app.json` configuration properly routes `/sap/opu/odata/` to the BTP Destination service.

## Build Process
Run the UI5 build command to generate the minified `dist` folder:
```bash
ui5 build --clean-dest --dest dist
```

## MTA Archiving
Generate the Multi-Target Application archive:
```bash
mbt build
```
This produces a `.mtar` file in the `mta_archives/` folder.

## Deployment
Deploy to Cloud Foundry:
```bash
cf login -a <api-endpoint> -u <username> -o <org> -s <space>
cf deploy mta_archives/sap.erm.app_1.0.0.mtar
```

## Post-Deployment Validation
1. Open the SAP Fiori Launchpad (via SAP Build Work Zone).
2. Assign the deployed Role Collections (e.g., `ERM_Admin`, `ERM_Finance`) to your BTP user.
3. Launch the application and verify mock data connectivity is bypassed in favor of live Destination services.

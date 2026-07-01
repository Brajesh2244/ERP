# SAP Fiori Enterprise Resource Management (ERP)

## Overview
This repository contains the complete implementation of the SAP Fiori Enterprise Resource Management (ERP) platform. Built entirely with OpenUI5/SAPUI5, this system acts as a comprehensive, modular suite designed to operate at an enterprise scale.

## Core Capabilities
- **Authentication & Security**: Robust JWT-ready mock login system with strict RBAC route guarding.
- **Master Data Management (MDM)**: Complete Employee, Customer, Vendor, and Product/Material registries.
- **Inventory & Warehouse Management**: Real-time stock ledger, batch and serial tracking, reservations, and goods movements.
- **Sales Order Management (O2C)**: End-to-end Order-to-Cash processing with dynamic pricing and discount engines.
- **Purchase Order Management (P2P)**: Full Procure-to-Pay workflow with supplier management and goods receipt integration.
- **Financial Accounting (FI)**: General Ledger, Chart of Accounts, Journal Entry engine, and automated financial postings.
- **Enterprise Integration Layer**: A master event bus (`IntegrationService`) governing cross-module orchestration to ensure strict decoupling of business domains.
- **Reporting & Analytics**: Dynamic Data aggregation, role-based dashboards, and interactive UI5 charts (`sap.viz`).
- **System Administration**: Application governance, audit logging, and global configuration capabilities.

## Architecture
This ERP rigidly enforces the Model-View-Controller (MVC) paradigm extended by a robust Service Layer and Repository pattern.
- **Controllers** handle UI lifecycle and view binding only.
- **Services** encapsulate pure business logic and transaction integrity.
- **Repositories** act as the single source of truth for data access.

For detailed documentation, please refer to the `ARCHITECTURE.md`.

## Installation & Deployment
1. `npm install`
2. `npm run dev` (Runs locally using `ui5-tooling`)

Please refer to `DEPLOYMENT_GUIDE.md` for BTP deployment steps.

## Status
**Completed (Sprint 18 / 18)**
Project Go-Live ready.

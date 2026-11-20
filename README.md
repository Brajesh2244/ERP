# 🏢 SAP Fiori Enterprise Resource Management (ERP)

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Explore_SAP_Fiori_UI-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://webapp-delta-cyan.vercel.app)
[![SAP Fiori](https://img.shields.io/badge/Frontend-SAP_OpenUI5-0A6ED1?style=for-the-badge&logo=sap&logoColor=white)](https://github.com/Brajesh2244/ERP)
[![Java Backend](https://img.shields.io/badge/Backend-Java_Enterprise-ED8B00?style=for-the-badge&logo=java&logoColor=white)](https://github.com/Brajesh2244/EnterpriseResourceManagementSystem)

**An enterprise-grade SAP Fiori / OpenUI5 ERP web application featuring master data management, sales orders, inventory, procurement, and analytics.**

[🌐 Explore Live Application Demo](https://webapp-delta-cyan.vercel.app) • [💻 Java Backend Repository](https://github.com/Brajesh2244/EnterpriseResourceManagementSystem)

</div>

---

## 🌟 Overview
This repository contains the complete implementation of the SAP Fiori Enterprise Resource Management (ERP) platform. Built entirely with OpenUI5/SAPUI5, this system acts as a comprehensive, modular suite designed to operate at an enterprise scale.

## 🚀 Live Demo Note
Recruiters and evaluators can interact with the live SAP Fiori frontend interface at **[webapp-delta-cyan.vercel.app](https://webapp-delta-cyan.vercel.app)** with instant client-side mock orchestration.

## 💼 Core Capabilities
- **Authentication & Security**: Robust JWT-ready mock login system with strict RBAC route guarding.
- **Master Data Management (MDM)**: Complete Employee, Customer, Vendor, and Product/Material registries.
- **Inventory & Warehouse Management**: Real-time stock ledger, batch and serial tracking, reservations, and goods movements.
- **Sales Order Management (O2C)**: End-to-end Order-to-Cash processing with dynamic pricing and discount engines.
- **Purchase Order Management (P2P)**: Full Procure-to-Pay workflow with supplier management and goods receipt integration.
- **Financial Accounting (FI)**: General Ledger, Chart of Accounts, Journal Entry engine, and automated financial postings.
- **Enterprise Integration Layer**: A master event bus (`IntegrationService`) governing cross-module orchestration to ensure strict decoupling of business domains.
- **Reporting & Analytics**: Dynamic Data aggregation, role-based dashboards, and interactive UI5 charts (`sap.viz`).
- **System Administration**: Application governance, audit logging, and global configuration capabilities.

## 🏗️ Architecture
This ERP rigidly enforces the Model-View-Controller (MVC) paradigm extended by a robust Service Layer and Repository pattern.
- **Controllers** handle UI lifecycle and view binding only.
- **Services** encapsulate pure business logic and transaction integrity.
- **Repositories** act as the single source of truth for data access.

For detailed documentation, please refer to the `ARCHITECTURE.md`.

## 📦 Installation & Deployment
1. `npm install`
2. `npm run dev` (Runs locally using `ui5-tooling`)

Please refer to `DEPLOYMENT_GUIDE.md` for BTP deployment steps.

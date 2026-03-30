# Accounts Module - Dashboard & Qualia Reconciliation

## Current State
New project. User provided screenshots of an existing dark-themed sidebar navigation and a Monthly Payments module with form and invoice table.

## Requested Changes (Diff)

### Add
- Light-themed sidebar navigation (different from the dark design shown)
- Accounts section with two submodules: Dashboard, Qualia Reconciliation
- Dashboard page with KPI cards, charts, and summary widgets
- Qualia Reconciliation page (renamed from Monthly Payments/Qualia) with Fetch Records form, invoice table with MTS/MOR tabs

### Modify
- Navbar: lighter color palette, modern card-style sidebar instead of dark navy
- Module name: "Qualia" → "Qualia Reconciliation"

### Remove
- Nothing (new project)

## Implementation Plan
1. Create main layout with light sidebar (white/light gray with accent color)
2. Sidebar nav: collapsible Accounts section with Dashboard + Qualia Reconciliation items
3. Dashboard: KPI summary cards (Total Invoices, Total Amount, Paid Amount, Pending), recent activity table, status breakdown chart
4. Qualia Reconciliation: Fetch Records form (File Type, Month, Year dropdowns) + payment detail fields (Process Date, Check Date, Check No, Amount, Bank, Received Date, file upload) + Invoices table with MTS/MOR tabs and search

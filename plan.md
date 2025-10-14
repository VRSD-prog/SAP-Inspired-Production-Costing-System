# SAP-Inspired Costing System for Small Remote Digital Agencies

## Key Features
• Define cost centers  
• Assign activity types to work centers  
• Calculate actual vs planned cost for a production order  

## Deliverables
• Cost center setup (KS01)  
• Production order costing report (KKBC_ORD)  
• Basic profitability analysis  

## Methodology
Waterfall  


## I. Cost Center Setup

### Actions
Create / Update / Delete Cost Center  
→ Automatically sums Cost Center costs from all linked Activity Types  
Create / Update / Delete Associated Activity Types for each Cost Center  

### Examples
Fulfillment Department (Cost Center)  
• Video Editing (Activity Type)  
• Graphic Design (Activity Type)  

Assign or edit total cost and capacity to Activity Types  
Example:  
Video Editing → Php 100,000 | 320 hrs  


## II. Production Order Costing Report

### Actions
Create / Edit / Delete Order  
Select Activity Type (from menu of all Activity Types across all cost centers), then input duration and actual duration for each.  

Example:  
Video Editing  
Duration: 100 hrs  
Actual Duration: 110 hrs  

### Calculations
Planned Cost: Duration A × Activity Rate A + Duration B × Activity Rate B = Project Cost  
Actual Cost: Actual Duration A × Activity Rate A + Actual Duration B × Activity Rate B = Actual Cost  

Planned vs Actual Cost:  
Project Cost – Actual Cost = Cost Variance  


## III. Basic Profitability Analysis
Combine all Activity Type Costs (Total Expenses)  
Combine all Client Invoices (Total Revenue)  
Subtract all Cost Center Costs from Client Invoices to get Profit  


## IV. Client Invoices
Create / Edit / Delete Client Invoice  
Add name and amount  

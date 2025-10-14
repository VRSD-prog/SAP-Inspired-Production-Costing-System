Key Features:
• Define cost centers
• Assign activity types to work centers
• Calculate actual vs planned cost for a production order

Deliverables:
• Cost center setup (KS01)
• Production order costing report (KKBC_ORD)
• Basic profitability analysis

Methodology: 
- Waterfall

Program Features: (SAP-inspired ERP for Digital Creative Agencies)
I. Cost Center Setup
    Actions:
        - Create/Update/Delete Cost Center 
            -> Automatically sums Cost Center costs from all linked Work Centers
        - Create/Update/Delete Associated Work Centers for each Cost Center
            -> Automatically sums Work Center costs from all Activity Type budgets 
        Examples:
            a. Fulfillment Department (Cost Center)
                - Video Editing Team (Work Center)
                - Graphic Design Team
            b. Marketing & Sales Department
                - Lead Generation Team
                - Deal Management Team
                - Content Marketing Team
            c. Administration Department
                - Human Resources Team
                - Operations Team
            d. Finance Department
                - Accounting Team
            e. IT Departmemt
                - SaaS Management Team
        - Assign or edit Activity Types to Work Centers
        Examples:
            a. Video Editing Team (Work Center)
                - Short-Form Editing (Activity Type)
                - Long-Form Editing
                - Filming
                - Motion Graphics
            b. Graphic Design Team
                - Social Media Graphic Design
                - UI Design
            c. Lead Generation Team
                - Outbound Marketing
                - Inbound Marketing
            d. Deal Management Team
                - Lead Nurturing
                - Proposal Creation
                - Sales Calling
            e. Content Marketing Team
                - Script Writing
                - Social Media Management
            f. Human Resources Team
                - Employee Management
            g. Operations Team
                - Operations Management
            h. Accounting Team
                - Accounting
            i. SaaS Management Team
                - SaaS configuration
                - Automation Setup
        - Assign or edit total cost and capacity to Activity Types
        Example:
            a. Video Editing Team
                - Short-Form Editing ($10,000, 320 hrs)
                - Long-Form Editing ($5,000, 160 hrs)
                - Filming ($5,000, 80 hrs)
                - Motion Graphics ($5,000, 100 hrs)
        - Automatically calculate and display Activity Rate
        Example: 
            Short-Form Editing: $10,000 / 320 hrs = $31.25
    
II. Production Order Costing Report
    1. Create/Edit/Delete Order
    2. Select Activity Type(s) (menu of all Activity Types across all work centers) and allocate hours for each
    Example:
        Short-Form Editing: 20 hrs, Long-Form Editing: 10 hrs
    3. Determine Project Cost 
    Formula:
        Project Hours A x Activity Rate A + Project Hours B x Activity Rate B ... = Project Cost
    4. Planned vs Actual Cost
    Formula:
        Actual Hours A x Activity Rate A + Actual Hours B x Activity Rate B ... = Actual Cost
        Project Cost - Actual Cost = Cost Variance
III. Basic Profitability Analysis
    - Combine all Cost Center Costs (Total Expenses)
    - Combine all Client Invoices
    - Subtract all Cost Center Costs from Client Invoices to get Profit
IV. Client Invoices
    - Create/Edit/Delete Client Invoice



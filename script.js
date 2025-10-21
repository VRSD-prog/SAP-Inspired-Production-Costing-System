// ------------------------------
// Program Run
// ------------------------------
//#region 
let orderActivityTypeReferences = {} // Store activity type references for each order activity
addCostCenterButtonFunctionality() // Add functionality to the default item
updateCostCenterCost() // Display initial Cost Center Cost
addProductionOrderButtonFunctionality() // Add functionality to the default order item
updateOrderCost() // Display initial Order Cost
//#endregion

// ------------------------------
// Navigation
// ------------------------------
//#region 
const tabs = document.querySelectorAll("[data-tab-target]") // Select all navigation tabs
const tabContents = document.querySelectorAll("[data-tab-content]") // Select all tab contents

tabs.forEach(tab => {
    tab.addEventListener("click", () => { // Make navigation tabs clickable
        const target = document.querySelector(tab.dataset.tabTarget) // Select tab target of the navigation tab
        tabContents.forEach(tabContent => tabContent.classList.remove("active")) // Remove "active" class from the tab contents
        tabs.forEach(t => t.classList.remove("active")) // Remove all "active" classes from navigation tabs
        tab.classList.add("active") // Add "active" class to the clicked navigation tab
        target.classList.add("active") // Add "active" class to the tab content
        if (tab.id.contains = "profitability") {
            calculateProfitability() // Calculate Profitability
        }
    })
})
//#endregion

// ------------------------------
// Cost Center Setup
// ------------------------------
//#region
// Add Cost Center and Activity Type List
const addCostCenterButton = document.querySelector(".add_cost_center_button") // Select "Add Cost Center" button
let costCenterCount = 1 // Number of cost centers that have been created (including default)

addCostCenterButton.addEventListener("click", () => { // When clicked
    const costCenterName = prompt("Enter Cost Center Title") // Prompt the user to enter the Cost Center Title
    if (costCenterName === null || costCenterName.trim() === "") {
        return // Do not accept blank answer
    }

    const costCenterList = document.querySelector('#cost_center_list') // Select Cost Center List
    const newCostCenter = document.createElement('div') // Create new Cost Center
    newCostCenter.classList.add('cost_center') // Add class name
    newCostCenter.dataset.itemTarget = `#activity_list_${costCenterCount}` // Add data-item-target for the equivalent Activity Type Item
    
    const textSpan = document.createElement('span') // Create text
    textSpan.textContent = costCenterName // Attach text from prompt
    newCostCenter.appendChild(textSpan) // Append to the newly created Cost Center

    const editButton = document.createElement('div') // Create edit buton
    editButton.classList.add('edit_button') // Add class
    editButton.innerHTML = `<img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png">` // Add image

    const deleteButton = document.createElement('div') // Create delete buton
    deleteButton.classList.add('delete_button') // Add class
    deleteButton.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3161/3161358.png">` // Add image

    // Append buttons and new cost center
    newCostCenter.appendChild(editButton) 
    newCostCenter.appendChild(deleteButton)
    costCenterList.appendChild(newCostCenter)

    // Add Activity Type List
    const activityTypeBox = document.querySelector("#activity_type_box")
    const activityTypeList = document.createElement("table") // Create a table
    activityTypeList.classList.add("activity_type_list") // Add "activity_type_list" class
    activityTypeList.id = `activity_list_${costCenterCount}` // Add activity_list id with a unique identifier
    activityTypeList.dataset.itemContent = "" // Add data-item-content

    const row = document.createElement("tr") // Create a table row
    row.innerHTML = `
        <th style="width: 130px; text-align: left; height: 30px;">Activity Name</th>
        <th style="width: 90px; text-align: right; margin-right: 20px;">Total Cost</th>
        <th style="width: 90px; text-align: right;">Capacity</th>
        <th style="width: 80px; text-align: right;">Actions</th>` // Add default headers

    activityTypeList.appendChild(row) // Append to Activity Type List
    activityTypeBox.appendChild(activityTypeList)
    costCenterCount += 1

    addCostCenterButtonFunctionality() // Make the buttons clickable
})

// Add Cost Center Button Functionality
function addCostCenterButtonFunctionality() {

    // For the Cost Center Edit Button
    const editCostCenterButtons = document.querySelectorAll(".edit_button") // Select all edit buttons
    editCostCenterButtons.forEach(editCostCenterButton => { // Select all Edit Cost Center buttons
        if (editCostCenterButton && !editCostCenterButton.classList.contains('functional')) { // If the button does not contain the "functional" class
            editCostCenterButton.classList.add("functional")
            editCostCenterButton.addEventListener("click", () => { // Add a click event listener to the Edit Cost Center Button
                event.stopPropagation() // Stop the parent item from activating
                const newCostCenterName = prompt("Enter New Cost Center Title") // Prompt the user to enter the Cost Center Title
                
                if (newCostCenterName === null || newCostCenterName.trim() === "") return // Do not accept blank answer

                const costCenter = editCostCenterButton.parentElement // Select the parent element
                const costCenterText = costCenter.querySelector("span") // Select span element
                costCenterText.textContent = newCostCenterName // Add prompt entry as text
            })
        }
    }) 

    // For the Cost Center Delete Button
    const deleteCostCenterButtons = document.querySelectorAll(".delete_button") // Select all delete buttons
    deleteCostCenterButtons.forEach(deleteCostCenterButton => { // Select all Delete Cost Center buttons
        if (deleteCostCenterButton && !deleteCostCenterButton.classList.contains('functional')) { // If the button does not contain the "functional" class
            deleteCostCenterButton.classList.add("functional") // Add functional class
            deleteCostCenterButton.addEventListener("click", () => { // Add a click event listener to the Delete Cost Center Button
                event.stopPropagation() // Stop the parent item from activating
                const costCenter = deleteCostCenterButton.parentElement // Select the Cost Center
                const activityTypeList = document.querySelector(costCenter.dataset.itemTarget) // Select the Activity Type List of the Cost Center
                costCenter.remove() // Remove the Cost Center
                activityTypeList.remove() // Remove the Activity Type List of the Cost Center
            })
        }
    }) 

    // For the Cost Center Item
    const costCenterItems = document.querySelectorAll(".cost_center") // Select all Cost Center items
    const costCenterTitle = document.querySelector("#cost_center_title") // Select the Cost Center Title box

    costCenterItems.forEach(costCenterItem => { // Select all Cost Center Items
        if (costCenterItem && !costCenterItem.classList.contains('functional')) { // If the button does not contain the "functional" class
            costCenterItem.classList.add("functional") // Add functional class

            costCenterItem.addEventListener("click", () => { // Add a click event listener to the Cost Center Item
                const ccItems = document.querySelectorAll("[data-item-target]") // Select all Cost Center Items
                const activityTypeContents = document.querySelectorAll("[data-item-content]") // Select all Activity Type Contents
                const target = document.querySelector(costCenterItem.dataset.itemTarget) // Select Activity Type Content of the Cost Center Item
                
                activityTypeContents.forEach(activityTypeContent => { activityTypeContent.classList.remove("active")}) // Remove "active" class from the Activity Type Contents
                ccItems.forEach(c => {c.classList.remove("active")}) // Remove all "active" classes from Cost Center Items
                costCenterItem.classList.add("active") // Add "active" class to the clicked Cost Center Item
                target.classList.add("active") // Add "active" class to the Activity Type Content     
                costCenterTitle.textContent = `${costCenterItem.textContent}` // Add Cost Center Title to the title box
                updateCostCenterCost() // Update Cost Center Cost
            })
        }
    }) 

    // For the Activity Type Edit Button
    const editActivityTypeButtons = document.querySelectorAll(".activity_type_edit_button") // Select all Activity Type edit buttons
    editActivityTypeButtons.forEach(editActivityTypeButton => { // For each Edit Activity Type button
        if (editActivityTypeButton && !editActivityTypeButton.classList.contains('functional')) { // If the button does not contain the "functional" class

            editActivityTypeButton.classList.add("functional")
            editActivityTypeButton.addEventListener("click", () => { // Add a click event listener to the Edit Activity Type Button
                event.stopPropagation() // Stop the parent item from activating

                const newActivityTypeName = prompt("Enter New Name") // Prompt the user to enter the Activity Type Name
                if (newActivityTypeName === null || newActivityTypeName.trim() === "") { // If blank
                    return // Cancel
                }
                const newActivityTypeCost = prompt("Enter New Cost") // Prompt the user to enter the Activity Type Cost
                if (newActivityTypeCost === null || newActivityTypeCost.trim() === "" || isNaN(newActivityTypeCost) || parseFloat(newActivityTypeCost) <= 0) { // If blank, not a number, or negative
                    alert("Please enter a valid number for cost.") // Notify user
                    return // Cancel
                }
                const newActivityTypeCapacity = prompt("Enter New Capacity") // Prompt the user to enter the Activity Type Capacity
                if (newActivityTypeCapacity === null || newActivityTypeCapacity.trim() === "" || isNaN(newActivityTypeCapacity) || parseFloat(newActivityTypeCapacity) <= 0) { // If blank, not a number, or negative
                    alert("Please enter a valid number for capacity.") // Notify user
                    return // Cancel
                }

                const activityType = editActivityTypeButton.closest(".activity_type") // Select the parent element
                const activityTypeText = activityType.querySelector(".activity_type_name") // Select name cell
                const activityTypeCost = activityType.querySelector(".activity_type_total_cost") // Select total cost cell
                const activityTypeCapacity = activityType.querySelector(".activity_type_capacity") // Select total capacity cell
                
                // Update name
                activityTypeText.textContent = newActivityTypeName
                
                // Update cost - maintain span structure
                let costSpan = activityTypeCost.querySelector('.currency')
                if (!costSpan) {
                    activityTypeCost.innerHTML = '<span class="currency"></span>'
                    costSpan = activityTypeCost.querySelector('.currency')
                }
                costSpan.textContent = newActivityTypeCost
                
                // Update capacity - maintain span structure
                let capacitySpan = activityTypeCapacity.querySelector('.time')
                if (!capacitySpan) {
                    activityTypeCapacity.innerHTML = '<span class="time"></span>'
                    capacitySpan = activityTypeCapacity.querySelector('.time')
                }
                capacitySpan.textContent = newActivityTypeCapacity

                updateCostCenterCost() // Update Cost Center Cost
                updateOrderCost() // Update Order Cost AND sync names
            })
        }
    })
    
    // For the Activity Type Delete Button
    const deleteActivityTypeButtons = document.querySelectorAll(".activity_type_delete_button") // Select all delete buttons
    deleteActivityTypeButtons.forEach(deleteActivityTypeButton => { // Select all Delete Activity Type buttons
        if (deleteActivityTypeButton && !deleteActivityTypeButton.classList.contains('functional')) { // If the button does not contain the "functional" class
            deleteActivityTypeButton.classList.add("functional") // Add functional class
            deleteActivityTypeButton.addEventListener("click", () => { // Add a click event listener to the Delete Activity Type Button
                event.stopPropagation() // Stop the parent item from activating
                const activityType = deleteActivityTypeButton.closest(".activity_type") // Select the Activity Type item
                activityType.remove() // Remove the Activity Type Item

                updateCostCenterCost() // Update Cost Center Cost
            })
        }
    }) 
}


// Add Activity Type
const addActivityTypeButton = document.querySelector("#add_activity_type") // Select the Add Activity Type button
addActivityTypeButton.addEventListener("click", () => { // Add a click event listener

    const activityTypeNameText = prompt("Enter New Name") // Prompt the user to enter the Activity Type Name
    if (activityTypeNameText === null || activityTypeNameText.trim() === "") { // If blank
        return // Cancel
    }
    const activityTypeCostText = prompt("Enter New Cost") // Prompt the user to enter the Activity Type Cost
    if (activityTypeCostText === null || activityTypeCostText.trim() === "" || isNaN(activityTypeCostText) || parseFloat(activityTypeCostText) <= 0) { // If blank, not a number, or negative
        alert("Please enter a valid number for cost.") // Notify user
        return // Cancel
    }
    const activityTypeCapacityText = prompt("Enter New Capacity") // Prompt the user to enter the Activity Type Capacity
    if (activityTypeCapacityText === null || activityTypeCapacityText.trim() === "" || isNaN(activityTypeCapacityText) || parseFloat(activityTypeCapacityText) <= 0) { // If blank, not a number, or negative
        alert("Please enter a valid number for capacity.") // Notify user
        return // Cancel
    }

    const activeActivityTypeList = document.querySelector(".activity_type_list.active") // Select the active Activity Type List

    const row = document.createElement("tr") // Create a table row
    row.classList.add("activity_type")
    // Add row content
    row.innerHTML = `
        <td class="activity_type_name"></td>
        <td class="activity_number activity_type_total_cost"><span class="currency"></span></td>
        <td class="activity_number activity_type_capacity"><span class="time"></span></td>
        <td style="display: flex; justify-content: right;">
            <div class="activity_type_edit_button activity_type_action" style="display: inline;">
                <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png">
            </div>
            <div class="activity_type_delete_button activity_type_action" style="display: inline;">
                <img src="https://cdn-icons-png.flaticon.com/512/3161/3161358.png">
            </div>
        </td>`

    const activityTypeName = row.querySelector(".activity_type_name") // Select the activity type name cell
    activityTypeName.textContent = activityTypeNameText // Attach text from prompt

    const activityTypeCost = row.querySelector(".activity_type_total_cost .currency") // Select the activity type cost cell
    activityTypeCost.textContent = activityTypeCostText // Attach text from prompt


    const activityTypeCapacity = row.querySelector(".activity_type_capacity .time") // Select the activity type capacity cell
    activityTypeCapacity.textContent = activityTypeCapacityText // Attach text from prompt


    activeActivityTypeList.appendChild(row) // Append to Activity Type List

    addCostCenterButtonFunctionality() // Make the buttons clickable
    updateCostCenterCost() // Update Cost Center Cost
})

// Update Cost Center Cost
function updateCostCenterCost() {
    const costCenterCost = document.querySelector("#cost_center_cost") // Select the Cost Center Cost display
    const totalActivityTypeCosts = document.querySelectorAll(".activity_type_list.active .activity_type .activity_type_total_cost") // Select all Cost values from the Active Activity Type List
    const numberTotal = Array.from(totalActivityTypeCosts).map(node => parseFloat(node.textContent)) // Convert the NodeList to an array of floats
    let sum = 0
    for (i=0; i<numberTotal.length; i++) { // Loop through the Cost values
        sum += numberTotal[i]
    }
    
    costCenterCost.textContent = `Php ${sum}`

    updateOrderCost()
}
//#endregion

// ------------------------------
// Production Orders
// ------------------------------

// Add Production Order and Order Activity Type List
const newOrderButton = document.querySelector(".new_order_button") // Select New Order button
let orderCount = 1 // Number of orders that have been created (including default)

newOrderButton.addEventListener("click", () => { // When clicked
    const orderName = prompt("Enter Order Title") // Prompt the user to enter the Order Title
    if (orderName === null || orderName.trim() === "") return // Do not accept blank answer

    const productionOrderList = document.querySelector('#production_order_list') // Select Production Order List
    const newOrder = document.createElement('div') // Create new Order
    newOrder.classList.add('production_order') // Add class name
    newOrder.dataset.itemTarget = `#order_activity_${orderCount}` // Add data-item-target for the equivalent Order Activity Type Item
    
    const textSpan = document.createElement('span') // Create text
    textSpan.textContent = orderName // Attach text from prompt
    newOrder.appendChild(textSpan) // Append to the newly created Order

    const editButton = document.createElement('div') // Create edit button
    editButton.classList.add('order_edit_button') // Add class
    editButton.innerHTML = `<img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png">` // Add image

    const deleteButton = document.createElement('div') // Create delete button
    deleteButton.classList.add('order_delete_button') // Add class
    deleteButton.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3161/3161358.png">` // Add image

    // Append buttons and new order
    newOrder.appendChild(editButton) 
    newOrder.appendChild(deleteButton)
    productionOrderList.appendChild(newOrder)

    // Add Order Activity Type List
    const orderActivityTypeBox = document.querySelector("#order_activity_type_box") // Select Order Activity Type Box
    const orderActivityTypeList = document.createElement("table") // Create a table
    orderActivityTypeList.classList.add("order_activity_type_list") // Add "order_activity_type_list" class
    orderActivityTypeList.id = `order_activity_${orderCount}` // Add order_activity id with a unique identifier
    orderActivityTypeList.dataset.itemContent = "" // Add data-item-content

    const row = document.createElement("tr") // Create a table row
    row.innerHTML = `
        <th style="width: 130px; text-align: left; height: 30px;">Activity Name</th>
        <th style="width: 70px; text-align: right; margin-right: 20px;">Duration</th>
        <th style="width: 90px; text-align: right;">Actual Duration</th>
        <th style="width: 110px; text-align: right;">Cost</th>
        <th style="width: 110px; text-align: right;">Actual Cost</th>
        <th style="width: 80px; text-align: right;">Actions</th>` // Add default headers

    orderActivityTypeList.appendChild(row) // Append to Order Activity Type List
    orderActivityTypeBox.appendChild(orderActivityTypeList)
    orderCount += 1

    addProductionOrderButtonFunctionality() // Make the buttons clickable
})

// Add Production Order Button Functionality
function addProductionOrderButtonFunctionality() {

    // For the Order Edit Button
    const editOrderButtons = document.querySelectorAll(".order_edit_button") // Select all edit buttons
    editOrderButtons.forEach(editOrderButton => { // Select all Edit Order buttons
        if (editOrderButton && !editOrderButton.classList.contains('functional')) { // If the button does not contain the "functional" class
            editOrderButton.classList.add("functional") // Add the "functional" class
            editOrderButton.addEventListener("click", () => { // Add a click event listener to the Edit Order Button
                event.stopPropagation() // Stop the parent item from activating
                const newOrderName = prompt("Enter New Order Title") // Prompt the user to enter the Order Title
                
                if (newOrderName === null || newOrderName.trim() === "") return // Do not accept blank answer

                const order = editOrderButton.parentElement // Select the parent element
                const orderText = order.querySelector("span") // Select span element
                orderText.textContent = newOrderName // Add prompt entry as text
            })
        }
    }) 

    // For the Order Delete Button
    const deleteOrderButtons = document.querySelectorAll(".order_delete_button") // Select all delete buttons
    deleteOrderButtons.forEach(deleteOrderButton => { // Select all Delete Order buttons
        if (deleteOrderButton && !deleteOrderButton.classList.contains('functional')) { // If the button does not contain the "functional" class
            deleteOrderButton.classList.add("functional") // Add functional class
            deleteOrderButton.addEventListener("click", () => { // Add a click event listener to the Delete Order Button
                event.stopPropagation() // Stop the parent item from activating
                const order = deleteOrderButton.parentElement // Select the Order
                const orderActivityTypeList = document.querySelector(order.dataset.itemTarget) // Select the Order Activity Type List of the Order
                order.remove() // Remove the Order
                orderActivityTypeList.remove() // Remove the Order Activity Type List of the Order
            })
        }
    }) 

    // For the Order Item
    const orderItems = document.querySelectorAll(".production_order") // Select all Order items
    const orderTitle = document.querySelector("#order_title") // Select the Order Title box

    orderItems.forEach(orderItem => { // Select all Order Items
        if (orderItem && !orderItem.classList.contains('functional')) { // If the button does not contain the "functional" class
            orderItem.classList.add("functional") // Add functional class

            orderItem.addEventListener("click", () => { // Add a click event listener to the Order Item
                const oItems = document.querySelectorAll("[data-item-target]") // Select all Order Items
                const orderActivityTypeContents = document.querySelectorAll("[data-item-content]") // Select all Order Activity Type Contents
                const target = document.querySelector(orderItem.dataset.itemTarget) // Select Order Activity Type Content of the Order Item
                
                orderActivityTypeContents.forEach(orderActivityTypeContent => { orderActivityTypeContent.classList.remove("active")}) // Remove "active" class from the Order Activity Type Contents
                oItems.forEach(o => {o.classList.remove("active")}) // Remove all "active" classes from Order Items
                orderItem.classList.add("active") // Add "active" class to the clicked Order Item
                target.classList.add("active") // Add "active" class to the Order Activity Type Content     
                orderTitle.textContent = `${orderItem.textContent}` // Add Order Title to the title box
                updateOrderCost() // Update Order Cost
            })
        }
    }) 

    // For the Order Activity Type Edit Button
    const editOrderActivityTypeButtons = document.querySelectorAll(".order_activity_type_edit_button") // Select all Order Activity Type edit buttons
    editOrderActivityTypeButtons.forEach(editOrderActivityTypeButton => { // For each Edit Order Activity Type button
        if (editOrderActivityTypeButton && !editOrderActivityTypeButton.classList.contains('functional')) { // If the button does not contain the "functional" class

            editOrderActivityTypeButton.classList.add("functional") // Add the functional class
            editOrderActivityTypeButton.addEventListener("click", () => { // Add a click event listener to the Edit Order Activity Type Button
                event.stopPropagation() // Stop the parent item from activating

                const availableActivityTypes = getAvailableActivityTypes() // Get available Activity Types
                if (availableActivityTypes.length === 0) { // If there are no Activity Types
                    alert("No activity types available. Please create one in Cost Centers first.") // Notify the user
                    return
                }

                let selectionPrompt = "Select Activity Type:\n" // Activity type selection instruction
                availableActivityTypes.forEach((actType, index) => { // Iterate through value and index
                    selectionPrompt += `${index + 1}. ${actType.name} (${actType.costCenter})\n` // Create a numbered list
                })
                const activitySelection = prompt(selectionPrompt) // Prompt user
                
                if (activitySelection === null || activitySelection.trim() === "") return // Cancel if blank
                const selectionIndex = parseInt(activitySelection) - 1 // Index of selection
                if (isNaN(selectionIndex) || selectionIndex < 0 || selectionIndex >= availableActivityTypes.length) { // If not a number, negative, or greater than actual length
                    alert("Invalid selection") // Notify user
                    return
                }

                const selectedActivity = availableActivityTypes[selectionIndex] // Select the user's selected activity
                
                const newDuration = prompt("Enter Duration") // Prompt the user to enter the Duration
                if (newDuration === null || newDuration.trim() === "" || isNaN(newDuration) || parseFloat(newDuration) <= 0) { // If blank, not a number, or negative
                    alert("Please enter a valid number for duration.") // Notify user
                    return // Cancel
                }
                const newActualDuration = prompt("Enter Actual Duration") // Prompt the user to enter the Actual Duration
                if (newActualDuration === null || newActualDuration.trim() === "" || isNaN(newActualDuration) || parseFloat(newActualDuration) <= 0) { // If blank, not a number, or negative
                    alert("Please enter a valid number for actual duration.") // Notify user
                    return // Cancel
                }

                const rate = selectedActivity.cost / selectedActivity.capacity // Rate is the Activity's cost divided by the capacity
                const cost = rate * parseFloat(newDuration) // Cost is the rate multiplied by the new duration
                const actualCost = rate * parseFloat(newActualDuration) // Actual cost is the rate multiplied by the new actual duration

                const orderActivityType = editOrderActivityTypeButton.closest(".order_activity_type") // Select the parent element
                const orderActivityTypeName = orderActivityType.querySelector(".order_activity_type_name") // Select name cell
                const orderActivityTypeDuration = orderActivityType.querySelector(".order_activity_type_duration") // Select duration cell
                const orderActivityTypeActualDuration = orderActivityType.querySelector(".order_activity_type_actual_duration") // Select actual duration cell
                const orderActivityTypeCost = orderActivityType.querySelector(".order_activity_type_cost") // Select cost cell
                const orderActivityTypeActualCost = orderActivityType.querySelector(".order_activity_type_actual_cost") // Select actual cost cell
                
                orderActivityTypeName.textContent = selectedActivity.name // Add activity name
                orderActivityTypeDuration.innerHTML = `<span class="time">${newDuration}</span>` // Add duration
                orderActivityTypeActualDuration.innerHTML = `<span class="time">${newActualDuration}</span>` // Add actual duration
                orderActivityTypeCost.innerHTML = `<span class="currency">${cost.toFixed(2)}</span>` // Add cost (no manual "Php")
                orderActivityTypeActualCost.innerHTML = `<span class="currency">${actualCost.toFixed(2)}</span>` // Add actual cost (no manual "Php")
                
                // Store reference
                const rowId = `order_activity_row_${Date.now()}_${Math.random()}` // Create row ID using current date and random number
                orderActivityType.dataset.rowId = rowId // Create a data value containing the row ID
                orderActivityTypeReferences[rowId] = { // Create a reference using the row ID
                    activityElement: selectedActivity.element, // Store activity DOM element
                    duration: parseFloat(newDuration), // Store new duration
                    actualDuration: parseFloat(newActualDuration) // Store new actual duration
                }

                updateOrderCost() // Update Order Cost
            })
        }
    })
    
    // For the Order Activity Type Delete Button
    const deleteOrderActivityTypeButtons = document.querySelectorAll(".order_activity_type_delete_button") // Select all delete buttons
    deleteOrderActivityTypeButtons.forEach(deleteOrderActivityTypeButton => { // Select all Delete Order Activity Type buttons
        if (deleteOrderActivityTypeButton && !deleteOrderActivityTypeButton.classList.contains('functional')) { // If the button does not contain the "functional" class
            deleteOrderActivityTypeButton.classList.add("functional") // Add functional class
            deleteOrderActivityTypeButton.addEventListener("click", () => { // Add a click event listener to the Delete Order Activity Type Button
                event.stopPropagation() // Stop the parent item from activating
                const orderActivityType = deleteOrderActivityTypeButton.closest(".order_activity_type") // Select the Order Activity Type item
                
                // Remove reference
                const rowId = orderActivityType.dataset.rowId
                if (rowId && orderActivityTypeReferences[rowId]) {
                    delete orderActivityTypeReferences[rowId]
                }
                
                orderActivityType.remove() // Remove the Order Activity Type Item

                updateOrderCost() // Update Order Cost
            })
        }
    }) 
}

// Get available Activity Types
function getAvailableActivityTypes() {
    const activityTypes = [] // Create an empty array
    const costCenters = document.querySelectorAll(".cost_center") // Select all Cost Centers
    
    costCenters.forEach(costCenter => { // For each Cost Center
        const costCenterName = costCenter.querySelector("span").textContent // Select the Cost Center name
        const activityTypeListId = costCenter.dataset.itemTarget // Select the Activity Type List by data value
        const activityTypeList = document.querySelector(activityTypeListId) // // Select the Activity Type List
        
        if (activityTypeList) { // If there is an Activity Type List
            const activities = activityTypeList.querySelectorAll(".activity_type") // Select all Activity Type items
            activities.forEach(activity => { // For each Activity Type
                const name = activity.querySelector(".activity_type_name").textContent // Select the name
                const costText = activity.querySelector(".activity_type_total_cost .currency").textContent // Select the cost text
                const capacityText = activity.querySelector(".activity_type_capacity .time").textContent // Select the capacity text
                
                 // Add the following into the array
                activityTypes.push({
                    name: name,
                    costCenter: costCenterName,
                    cost: parseFloat(costText),
                    capacity: parseFloat(capacityText),
                    element: activity
                })
            })
        }
    })
    
    return activityTypes // Return the array
}

// Add Order Activity Type
const addOrderActivityTypeButton = document.querySelector("#add_order_activity_type") // Select the Add Order Activity Type button
addOrderActivityTypeButton.addEventListener("click", () => { // Add a click event listener

    // Get available activity types
    const availableActivityTypes = getAvailableActivityTypes()
    if (availableActivityTypes.length === 0) {
        alert("No activity types available. Please create activity types in Cost Centers first.")
        return
    }

    // Display activity type selection
    let selectionPrompt = "Select Activity Type:\n"
    availableActivityTypes.forEach((actType, index) => {
        selectionPrompt += `${index + 1}. ${actType.name} (${actType.costCenter})\n`
    })
    const activitySelection = prompt(selectionPrompt)
    
    if (activitySelection === null || activitySelection.trim() === "") return // Cancel if blank
    const selectionIndex = parseInt(activitySelection) - 1
    if (isNaN(selectionIndex) || selectionIndex < 0 || selectionIndex >= availableActivityTypes.length) {
        alert("Invalid selection")
        return
    }

    const selectedActivity = availableActivityTypes[selectionIndex]

    const durationText = prompt("Enter Duration") // Prompt the user to enter the Duration
    if (durationText === null || durationText.trim() === "" || isNaN(durationText) || parseFloat(durationText) <= 0) { // If blank, not a number, or negative
        alert("Please enter a valid number for duration.") // Notify user
        return // Cancel
    }
    const actualDurationText = prompt("Enter Actual Duration") // Prompt the user to enter the Actual Duration
    if (actualDurationText === null || actualDurationText.trim() === "" || isNaN(actualDurationText) || parseFloat(actualDurationText) <= 0) { // If blank, not a number, or negative
        alert("Please enter a valid number for actual duration.") // Notify user
        return // Cancel
    }

    const rate = selectedActivity.cost / selectedActivity.capacity // Calculate the rate by dividing the cost by the capacity
    const cost = rate * parseFloat(durationText) // Calculate the cost by multiplying the rate by the duration
    const actualCost = rate * parseFloat(actualDurationText) // Calculate the actual cost by multiplying the rate with the actual duration

    const activeOrderActivityTypeList = document.querySelector(".order_activity_type_list.active") // Select the active Order Activity Type List

    const row = document.createElement("tr") // Create a table row
    row.classList.add("order_activity_type") // Add class
    
    // Generate a unique row ID
    const rowId = `order_activity_row_${Date.now()}_${Math.random()}`
    row.dataset.rowId = rowId
    
    // Add row content
    row.innerHTML = `
        <td class="order_activity_type_name"></td>
        <td class="order_activity_number order_activity_type_duration"><span class="time"></span></td>
        <td class="order_activity_number order_activity_type_actual_duration"><span class="time"></span></td>
        <td class="order_activity_number order_activity_type_cost"><span class="currency"></span></td>
        <td class="order_activity_number order_activity_type_actual_cost"><span class="currency"></span></td>
        <td style="display: flex; justify-content: right;">
            <div class="order_activity_type_edit_button activity_type_action" style="display: inline;">
                <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png">
            </div>
            <div class="order_activity_type_delete_button activity_type_action" style="display: inline;">
                <img src="https://cdn-icons-png.flaticon.com/512/3161/3161358.png">
            </div>
        </td>`

    const orderActivityTypeName = row.querySelector(".order_activity_type_name") // Select the order activity type name cell
    orderActivityTypeName.textContent = selectedActivity.name // Attach activity name

    const orderActivityTypeDuration = row.querySelector(".order_activity_type_duration .time") // Select the order activity type duration cell
    orderActivityTypeDuration.textContent = durationText // Attach duration from prompt

    const orderActivityTypeActualDuration = row.querySelector(".order_activity_type_actual_duration .time") // Select the order activity type actual duration cell
    orderActivityTypeActualDuration.textContent = actualDurationText // Attach actual duration from prompt

    const orderActivityTypeCost = row.querySelector(".order_activity_type_cost .currency") // Select the order activity type cost cell
    orderActivityTypeCost.textContent = cost.toFixed(2) // Calculate and attach cost (no manual "Php")

    const orderActivityTypeActualCost = row.querySelector(".order_activity_type_actual_cost .currency") // Select the order activity type actual cost cell
    orderActivityTypeActualCost.textContent = actualCost.toFixed(2) // Calculate and attach actual cost (no manual "Php")

    activeOrderActivityTypeList.appendChild(row) // Append to Order Activity Type List

    // Store reference
    orderActivityTypeReferences[rowId] = {
        activityElement: selectedActivity.element,
        duration: parseFloat(durationText),
        actualDuration: parseFloat(actualDurationText)
    }

    addProductionOrderButtonFunctionality() // Make the buttons clickable
    updateOrderCost() // Update Order Cost
})

// Update Order Cost
function updateOrderCost() {
    
    Object.keys(orderActivityTypeReferences).forEach(rowId => { // For each row ID in the order reference array
        const ref = orderActivityTypeReferences[rowId] // Select an order from the reference list
        const row = document.querySelector(`[data-row-id="${rowId}"]`) // Select row based on data-row-id value
        
        if (row && ref.activityElement) {
            // Get the current name from the source activity
            const currentName = ref.activityElement.querySelector(".activity_type_name").textContent
            
            // Update the name in the order activity type
            const nameCell = row.querySelector(".order_activity_type_name")
            if (nameCell) {
                nameCell.textContent = currentName
            }
            
            // Get cost and capacity with proper parsing
            const costSpan = ref.activityElement.querySelector(".activity_type_total_cost .currency")
            const capacitySpan = ref.activityElement.querySelector(".activity_type_capacity .time")
            
            if (costSpan && capacitySpan) {
                const costText = costSpan.textContent.trim()
                const capacityText = capacitySpan.textContent.trim()
                const rate = parseFloat(costText) / parseFloat(capacityText) // Calculate the rate by dividing the cost with the capacity
                
                const cost = rate * ref.duration // Calculate the order cost by multiplying the rate with the duration
                const actualCost = rate * ref.actualDuration // Calculate the actual order cost by multiplying the rate with the actual duration
                
                const costCell = row.querySelector(".order_activity_type_cost .currency") // Select the cost cell
                const actualCostCell = row.querySelector(".order_activity_type_actual_cost .currency") // Select the actual cost cell
                
                if (costCell) {
                    costCell.textContent = cost.toFixed(2) // Attach the cost (no manual "Php")
                } 

                if (actualCostCell) {
                    actualCostCell.textContent = actualCost.toFixed(2) // Attach the actual cost (no manual "Php")
                } 
            }
        }
    })
    
    const projectedCostDisplay = document.querySelector("#projected_cost") // Select the Projected Cost display
    const totalCostDisplay = document.querySelector("#total_cost") // Select the Total Cost display
    const costVarianceDisplay = document.querySelector("#cost_variance") // Select the Cost Variance display
    
    const costs = document.querySelectorAll(".order_activity_type_list.active .order_activity_type .order_activity_type_cost .currency") // Select all Cost values from the Active Order Activity Type List
    const actualCosts = document.querySelectorAll(".order_activity_type_list.active .order_activity_type .order_activity_type_actual_cost .currency") // Select all Actual Cost values from the Active Order Activity Type List
    
    const costNumbers = Array.from(costs).map(node => {
        const text = node.textContent.trim()
        return parseFloat(text) || 0
    }) // Convert the costs NodeList to an array of floats
    
    const actualCostNumbers = Array.from(actualCosts).map(node => {
        const text = node.textContent.trim()
        return parseFloat(text) || 0
    }) // Convert the actual costs NodeList to an array of floats
    
    // Initialize cost variables
    let projectedCost = 0
    let totalCost = 0
    
    for (let i=0; i<costNumbers.length; i++) { // Loop through the Cost values
        projectedCost += costNumbers[i]
    }
    
    for (let i=0; i<actualCostNumbers.length; i++) { // Loop through the Actual Cost values
        totalCost += actualCostNumbers[i]
    }
    
    const variance = totalCost - projectedCost // Calculate the Cost Variance by subtracting the Projected Cost from the Total Cost
    
    // Display all calculated numbers
    projectedCostDisplay.textContent = `Php ${projectedCost.toFixed(2)}`
    totalCostDisplay.textContent = `Php ${totalCost.toFixed(2)}`
    costVarianceDisplay.textContent = `Php ${variance.toFixed(2)}`
}


// ------------------------------
// Profitability
// ------------------------------
//#region 
// Tally Expenses, Revenue, and Calculate Profit
function calculateProfitability() {
    
    const allActivityTypeCostData = document.querySelectorAll(".activity_type_total_cost") // Select all Activity Type cost data
    const allInvoiceAmountData = document.querySelectorAll(".invoice_amount") // Select all invoice amount data

    // Create a function that removes non-number characters
    const getNumbers = (nodes) => {
    return Array.from(nodes).map(node => {
        const num = node.textContent.replace(/[^0-9.-]+/g, "")
        return parseFloat(num) || 0
        })
    }

    const activityCosts = getNumbers(allActivityTypeCostData) // Run the Activity Type costs through the function
    const invoiceAmounts = getNumbers(allInvoiceAmountData) // Run the invoice amounts through the function

    const totalActivityCost = activityCosts.reduce((sum, val) => sum + val, 0) // Get the total of all Activity Type costs
    const totalInvoiceAmount = invoiceAmounts.reduce((sum, val) => sum + val, 0) // Get the total of all invoice amounts
    const totalProfit = totalInvoiceAmount - totalActivityCost // Subtract the costs from the invoices to get the profit
    
    const expenses = document.querySelector("#expenses") // Select the expenses display
    const revenue = document.querySelector("#revenue") // Select the revenue display
    const profit = document.querySelector("#profit") // Select the profit display

    expenses.textContent = `Expenses: Php ${totalActivityCost}` // Display Expenses as the total of all Activity Type costs
    revenue.textContent = `Revenue: Php ${totalInvoiceAmount}` // Display Revenue as the total of all Invoice Amounts
    profit.textContent = `Profit: Php ${totalProfit}` // Display Profit as the difference of Revenue and Expenses

}
//#endregion

// ------------------------------
// Client Invoices
// ------------------------------
//#region 
// Add New Invoice
const newInvoiceButton = document.querySelector(".new_invoice_button") // Select New Invoice button
newInvoiceButton.addEventListener("click", () => { // Add click listener

    const invoiceNameInput = prompt("Enter the Invoice Name") // Get user input for Invoice Name
    if (invoiceNameInput === null || invoiceNameInput.trim() === "") {
        return // Do not accept blank answer
    }

    const invoiceAmountInput = prompt("Enter the Invoice Amount") // Get user input for Invoice Amount
    if (invoiceAmountInput === null || invoiceAmountInput.trim() === "" || isNaN(invoiceAmountInput) || parseFloat(invoiceAmountInput) <= 0) { // If blank, not a number, or negative
        alert("Please enter a valid number for cost.") // Notify user
        return // Cancel
    }

    const clientInvoices = document.querySelector("#client_invoices") // Select Client Invoices section

    const newInvoice = document.createElement("div") // Create a new div
    newInvoice.classList.add("invoice") // Add "invoice" class

    const invoiceName = document.createElement("div") // Create a new div
    invoiceName.classList.add("invoice_name") // Add "invoice_name" class
    invoiceName.innerHTML = `<b>Invoice Name:</b>  ${invoiceNameInput}` // Display user input

    const invoiceAmount = document.createElement("div") // Create a new div
    invoiceAmount.classList.add("invoice_amount") // Add "invoice_amount" class
    invoiceAmount.innerHTML = `<b>Invoice Amount:</b>  Php ${invoiceAmountInput}` // Display user input

    const deleteButton = document.createElement("div") // Create a new div
    deleteButton.classList.add("delete_button") // Add "delete_button" class

    const icon = document.createElement("img") // Create a new img
    icon.src = "https://cdn-icons-png.flaticon.com/512/3161/3161358.png" // Add link to img

    clientInvoices.appendChild(newInvoice) // Append new invoice to Client Invoices section
    newInvoice.appendChild(invoiceName) // Append invoice name to new invoice
    newInvoice.appendChild(invoiceAmount) // Append invoice amount to new invoice
    newInvoice.appendChild(deleteButton) // Append delete button to new invoice
    deleteButton.appendChild(icon) // Append img to delete button

    addCostCenterButtonFunctionality() // Make the buttons functional
})
//#endregion


// ------------------------------
// References
// ------------------------------
/*
- "Build Tabs Using HTML/CSS in Only 12 Minutes" from Web Dev Simplified https://youtu.be/5L6h_MrNvsk
- "What is SAP?" https://www.sap.com/sea/about/what-is-sap.html
- "SAP Modules: A Complete List of SAP ERP Modules" https://tipalti.com/blog/sap-modules/
- "Introduction to SAP PP (Production Planning) IN SAP CLOUD public edition" https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-members/introduction-to-sap-pp-production-planning-in-sap-cloud-public-edition/ba-p/13573624
- "Controlling (CO)" https://help.sap.com/docs/SAP_ERP/8cf202ad62c04521b934c06b4a898efd/5cd170526837214fe10000000a445394.html
*/
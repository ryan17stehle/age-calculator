const dayInput = document.getElementById('day')
const monthInput = document.getElementById('month')
const yearInput = document.getElementById('year')
const dayErrorSpan = document.getElementById('day-error')
const monthErrorSpan = document.getElementById('month-error')
const yearErrorSpan = document.getElementById('year-error')
const dayLabel = document.getElementById('day-label')
const monthLabel = document.getElementById('month-label')
const yearLabel = document.getElementById('year-label')
const daysOldDisplay = document.getElementById('days-display')
const monthsOldDisplay = document.getElementById('months-display')
const yearsOldDisplay = document.getElementById('years-display')
const submitBtn = document.getElementById('submit')


// Final Check for date validity & calculation
let dayValue = 0
let monthValue = 0
let yearValue = 0

// Error Styling
function addErrorStyles(inputField) {
    if (inputField.id === 'day') {
        // apply the error class to the appropriate elements
        dayInput.classList.add('error')
        dayErrorSpan.classList.add('error')
        dayLabel.classList.add('error')
    } else if (inputField.id === 'month') {
        // apply the error class to the appropriate elements
        monthInput.classList.add('error')
        monthErrorSpan.classList.add('error')
        monthLabel.classList.add('error')
    } else {
        // apply the error class to the appropriate elements
        yearInput.classList.add('error')
        yearErrorSpan.classList.add('error')
        yearLabel.classList.add('error')
    }
}

function removeErrorStyles(inputField) {
    if (inputField.id === 'day') {
        // apply the error class to the appropriate elements
        dayInput.classList.remove('error')
        dayErrorSpan.classList.remove('error')
        dayLabel.classList.remove('error')
        dayErrorSpan.textContent = ""
    } else if (inputField.id === 'month') {
        // apply the error class to the appropriate elements
        monthInput.classList.remove('error')
        monthErrorSpan.classList.remove('error')
        monthLabel.classList.remove('error')
        monthErrorSpan.textContent = ""
    } else {
        // apply the error class to the appropriate elements
        yearInput.classList.remove('error')
        yearErrorSpan.classList.remove('error')
        yearLabel.classList.remove('error')
        yearErrorSpan.textContent = ""
    }
}

// On Input Validation 
// Day Input
dayInput.addEventListener('input', (e) => {
    if (dayInput.validity.rangeOverflow || dayInput.validity.rangeUnderflow) {
        addErrorStyles(dayInput)
        dayErrorSpan.textContent = "Must be a valid day."
    }
    else {
        removeErrorStyles(dayInput)
        dayValue = parseInt(dayInput.value)
        finalDateCheck()
    }
})

// Month Input
monthInput.addEventListener('input', (e) => {
    if (monthInput.validity.rangeOverflow || monthInput.validity.rangeUnderflow) {
        addErrorStyles(monthInput)
        monthErrorSpan.textContent = "Must be a valid month."
    } else {
        removeErrorStyles(monthInput)
        monthValue = parseInt(monthInput.value)
        finalDateCheck()
    }
})

// Year Input
yearInput.addEventListener('input', (e) => {
    if (yearInput.validity.rangeOverflow) {
        addErrorStyles(yearInput)
        yearErrorSpan.textContent = "Must be in the past."
    } else if (yearInput.validity.rangeUnderflow) {
        addErrorStyles(yearInput)
        yearErrorSpan.textContent = "Too far in the past."
    } else {
        removeErrorStyles(yearInput)
        yearValue = yearInput.value
    }
})

// On Submit Validation
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    // Check the day input
    if (!dayInput.validity.valid) {
        addErrorStyles(dayInput)
        showRequiredErrorMessage(dayInput)
    } else {
        removeErrorStyles(dayInput)
    }

    // Check the month input
    if (!monthInput.validity.valid) {
        addErrorStyles(monthInput)
        showRequiredErrorMessage(monthInput)
    } else {
        removeErrorStyles(monthInput)
    }

    // Check the year input
    if (!yearInput.validity.valid) {
        addErrorStyles(yearInput)
        showRequiredErrorMessage(yearInput)
    } else {
        removeErrorStyles(yearInput)
    }

    // Calculate the users age
    calculateAge(dayValue, monthValue, yearValue)

})

function showRequiredErrorMessage(inputField) {
    switch(inputField.id) {
        case 'day':
            // If no value is provided
            if (inputField.validity.valueMissing) {
                // add the error text to the span
                dayErrorSpan.textContent = "This field is required."
            }      
        case 'month':
            // If no value is provided
            if (inputField.validity.valueMissing) {
                // add the error text to the span
                monthErrorSpan.textContent = "This field is required."
            }
        case 'year':
            // If no value is provided
            if (inputField.validity.valueMissing) {
                // add the error text to the span
                yearErrorSpan.textContent = "This field is required."
            }
    }
}

function finalDateCheck() {
    // Ensure both values are defined / not zero
    if (!dayValue || !monthValue) {
        return
    }

    // February (doesn't account for leap years... yet!)
    // April, June, September, November
    if (monthValue === 2 && dayValue > 28) {
        dayErrorSpan.textContent = "Only 28 days in February."
        addErrorStyles(dayInput)
    } else if ((monthValue === 4 || monthValue === 6 || monthValue === 9 || monthValue === 11) && dayValue > 30) {
        dayErrorSpan.textContent = "Only 30 days in that month."
        addErrorStyles(dayInput)
    } else {
        removeErrorStyles(dayInput)
    }
}

function calculateAge(dayValue, monthValue, yearValue) {
    // Define the two dates
    const today = new Date()
    const userBirthDay = new Date(yearValue, monthValue, dayValue)

    // Subtrace the difference (value in ms)
    const difference = today.getTime() - userBirthDay.getTime()

    // Convert to years
    const yearsOld = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))

    // Get the remaining days
    const daysRemaining = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24))

    // Convert days to month (roughly)
    const monthsOld = Math.floor(daysRemaining / 30.44)

    // Get days
    const daysOld = Math.floor(daysRemaining % 30.44)

    // display the values
    daysOldDisplay.textContent = daysOld
    monthsOldDisplay.textContent = monthsOld
    yearsOldDisplay.textContent = yearsOld
}
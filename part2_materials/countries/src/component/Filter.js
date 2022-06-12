import React from 'react'

const Filter = ({
    nameToFilter,
    onFilterChange
}) => {
    return (
        <form>
            <div>
            find countries <input
                value = {nameToFilter}
                onChange = {onFilterChange}
            />
            </div>
      </form>
    )
}

export default Filter
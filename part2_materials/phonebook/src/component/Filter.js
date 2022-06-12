import React from 'react'

const Filter = ({
    nameToFilter,
    onFilterChange
}) => {
    return (
        <form>
            <div>
            filter shown with <input
                value = {nameToFilter}
                onChange = {onFilterChange}
            />
            </div>
      </form>
    )
}

export default Filter
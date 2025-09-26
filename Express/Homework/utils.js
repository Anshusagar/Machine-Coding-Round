const handleSorting = (orderType, sortType, obj) => {
    if (!sortType && orderType) {
        if (orderType === 'asc') {
            return obj.Contact.sort((a, b) => a['id'] - b['id'])
        }
        else if (orderType === 'dec') {
            return obj.Contact.sort((a, b) => b['id'] - a['id'])
        }
        else {
            return 'Please Provide correct order type asc or dec'
        }
    }
    else {
        if (obj.Contact[0].hasOwnProperty(sortType)) {
            if (orderType === 'asc') {  
                if(sortType == 'createdAt'){
                    return obj.Contact.sort((a, b) => new Date(a[sortType]) - new Date(b[sortType]))
                }
                return obj.Contact.sort((a, b) => a[sortType] - b[sortType])
            }
            else if (orderType === 'dec') {
                if(sortType == 'createdAt'){
                    return obj.Contact.sort((a, b) => new Date(a[sortType]) - new Date(b[sortType]))
                }
                return obj.Contact.sort((a, b) => b[sortType] - a[sortType]);
            }
            else {
                return 'Please Provide correct order type asc or dec'
            }
        }
    }
}

module.exports = handleSorting;
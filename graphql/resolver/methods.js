const authFilter = req => {
    if (!req.isTokenExist){
        throw new Error ('Token does not exist.')
    }
}
const adminFilter = req => {
    if (!req.user.isAdmin){
        throw new Error ('Unauthorized actions.')
    }
}

exports.AuthFilter  = authFilter
exports.AdminFilter = adminFilter
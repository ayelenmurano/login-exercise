const User = require("../../../../models/users");

async function getUser ( whereClause ) {
    if ( whereClause ) return await User.findOne( whereClause );
    else return undefined
}

async function createUser ( user ) {
    user.create_datetime= new Date();
    user.update_datetime= new Date();
    const createdUsed = await User.create(user);
    return createdUsed;
}

module.exports = { getUser, createUser }
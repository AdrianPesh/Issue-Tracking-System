const roles = {
    OWNER:1,
    ADMIN:2,
    MEMBER:3,
    GUEST:4
};

const checkPermission = (currentRole,targetRole)=>{

    const currIndex = roles[currentRole];
    if(!currIndex){
        return false;
    }
    const tarIndex = roles[targetRole];
    if(!tarIndex){
        return false;
    }

    if(currIndex>tarIndex){
        return false;
    }
    return true;
}

const checkIfAdminOrOwner = (role)=>{

    const adminOrOwner =roles[role]<=2?true:false;

    return adminOrOwner;
}

module.exports = {
    checkPermission,
    checkIfAdminOrOwner
};
import userService from '../services/userService';

let handleLogin = async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    if(!email||!password){
        return res.status(500).json({
            errCode:1,
            message: 'Missing inputs parameter!'
        })
        
    }

    let userData = await userService.handleUserLogin(email, password);
    // let user 
    //check email exists
    //compare password
    //return userInfo
    //accsess token :JWT web  token
    return res.status(200).json({
        errCode:userData.errCode,
        message: userData.errMessage,
        user: userData.user?userData.user:{}
    })
}

let handleGetAllUsers = async(req, res) => {
    let id = req.query.id; //all, single
    if(!id){
        return res.status(200).json({
        errrCode:1,
        errMessage:'Missing required parameter',
        users:[]
    })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode:0,
        errMessage:'Ok',
        users
    })
    
}

let handleCreateNewUser = async(req,res) => {
    let data = req.body;
    let message = await userService.createNewUser(data);
    return res.status(200).json(message);
}

let handleEditUser=async(req,res) => {
    let data = req.body;
    let message = await userService.UpdateUser(data);
    return res.status(200).json(message);

}

let handleDeleteUser=async(req,res) => {
    if(!req.body.id){
        return res.status(200).json({
        errrCode:1,
        errMessage:'Missing required parameter',
    })
    }
    let message = await userService.DeleteUser(req.body.id);
    return res.status(200).json(message);
}

let getAllCode = async(req, res) => {
    try {
        let data = await userService.GetAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error:', e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser:handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode:getAllCode
}
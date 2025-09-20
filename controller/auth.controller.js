import {loginService,registerService} from '../service/authService.js'

const registerController = async (req,res) => {
    try {
     const { user, token} = await registerService(req.body);
     res.status(201).send({
        data: { user, token},
        success:true,
        message: "successfully registered user"
     })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const loginController = async (req, res) => {
    try {
        const {email,password} = req.body
      const { user, token} = await loginService({email,password});
      res.status(201).send({
        data: { user, token},
        success:true,
        message: "successfully logged in  user"
     })
    } catch (error) {
         res.status(400).send(error.message)
    }
}

export  {
    registerController,loginController
}
import {login,register} from '../service/authService.js'

const register = async (req,res) => {
    try {
     const { user, token} = await register(req.body);
     res.status(201).send({
        data: { user, token},
        success:true,
        message: "successfully registered user"
     })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const login = async (req, res) => {
    try {
        const {email,password} = req.body
      const { user, token} = await login({email,password});
      res.status(201).send({
        data: { user, token},
        success:true,
        message: "successfully logged in  user"
     })
    } catch (error) {
         res.status(400).send(error.message)
    }
}
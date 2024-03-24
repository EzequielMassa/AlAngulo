import { UserModel } from "../models/User.model";
import bcrypt from 'bcrypt'

export const getUsers = async (req,res)=>{
    try {
        const users =await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
//trae un solo usuario con sus respectivas reservas y ordenes
export const getUser = async(req,res) =>{
    const {id} = req.params
    try {
        const user = UserModel.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({ message: 'no pudimos encontrar el producto solicitado' })
    }
}

export const getUserEmail = async (req,res) =>{
    const {email} = req.params
    try {
        const emailFound = await UserModel.find({
            email:email
        })
        res.status(200).json(emailFound)
    } catch (error) {
        res.status(400).json({message:"email no encontrado"})
    }
}

export const createUser =  async (req,res)=>{
   
    try {
        const {name,lastname,email,phone,role,password}  = req.body    
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password,salt)
        const newUser = new UserModel(
            {
                name,
                lastname,
                email,
                phone,
                role,
                password:passwordHash
            }
        )
        const user = await newUser.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const deleteUser = async (req,res)=>{
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.json({message:"Usuario eliminado"})
    } catch (error) {
        res.status(400).send({message:'no se pudo eliminar'})
    }
}

export const updateUser = async (req,res) => {
    try {
        const {id} = req.params
        const {name,lastname,email,phone} = req.body
        const updateUser = await UserModel.findByIdAndUpdate(id,{name,lastname,email,phone},{new:true}) 
        res.json(updateUser)    

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const login = async (req,res) =>{
    try {
        const {email,password} = req.body
        if(!email || !password) {
            return res.status(400).json({message:"Por favor llena todos los campos"})
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"El usuario no existe"})
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.status(400).json({message:"user o password incorrectos"})
        }
        res.json({message:"Bienvenido, alquila tu cancha tranquilo!"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const getOrderUser = async (req,res) =>{
    try {
        const {id} = req.params
    } catch (error) {
        
    }
}
export const getBookingUser = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


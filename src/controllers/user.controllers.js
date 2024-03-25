import { UserModel } from "../models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

//controlador para traer todos los usuarios
export const getUsers = async (req,res)=>{
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
//trae un solo usuario con sus respectivas reservas y ordenes
export const getUser = async(req,res) =>{
    const {id} = req.params
    try {
        const user = await UserModel.findById(id)
        .populate('orders'
			// path: 'orders',
			// select: {product , orderDate , user},
		)
        .populate(
           'bookings'
            // path:'bookings',
            // select:{soccerField , time , date}
        )
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({ message: 'no pudimos encontrar el usuario solicitado' })
    }
}
//obtener solo el email del usuario
export const getUserEmail = async (req,res) =>{
    const {email} = req.params
    const emailFound = await UserModel.find({
        email:email
    })
    {emailFound.length > 0 ? res.status(200).json(emailFound) : res.status(400).json({message:"email no encontrado"})}
       
    
}

//controlador para crear un usuario
export const createUser =  async (req,res)=>{
    const {name,lastname,email,phone,role,password}  = req.body 
    try {
          
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password,salt)
        const newUser = await UserModel.create(
            {
                name,
                lastname,
                email,
                phone,
                role,
                password:passwordHash
            }
        )
        
        res.status(201).json({message:"usuario creado exitosamente"})
    } catch (error) {
        console.log(error)
        // res.status(400).json({message:error.message})
    }
}
//controlador para borrar un usuario
export const deleteUser = async (req,res)=>{
    const {id} = req.params
    try {
      const deletedUser =  await UserModel.findByIdAndDelete(id)
        if(!deleteUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//controlador para actualizar un usuario
export const updateUser = async (req,res) => {
        const {id} = req.params
        const {name,lastname,email,phone,role} = req.body
    try {
        const updateUser = await UserModel.findByIdAndUpdate(id,{name,lastname,email,phone,role},{new:true}) 
        res.json(updateUser)    

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

//controlador para loguear usuario con autenticacion
export const login = async (req,res) =>{
    const {email,password} = req.body
    try {
       
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
        const token = jwt.sign({
            id : user._id,
            name: user.name,
            lastname: user.lastname,
            phone:user.phone,
            role:user.role
        }
        ,
        process.env.SECRET
        ,
        {expiresIn:'1D'}
        )
        res.header(token).json({token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// export const getOrderUser = async (req,res) =>{
//     const {id} = req.params
//     try {
//         const orders = await Orders.find({user._id:id})
//         res.json(orders)

//     } catch (error) {
//         res.status(500).json({message:'error del servidor'})
//     }
// }
// export const getBookingUser = async (req,res)=>{
//     const {id} = req.params
//     try {
//         const bookings = await Bookings.find({user:user._id})
//         res.json(bookings)

//     } catch (error) {
//         res.status(500).json({message:'error del servidor'})
//     }
// }


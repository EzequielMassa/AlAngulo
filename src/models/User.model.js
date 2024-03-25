import { Schema,model } from "mongoose";

const userSchema = new  Schema(

    {
        name:{
            type: String,
			required: true,
			minLength: 3,
			maxLength: 150, 
            match: [
                /^[a-zA-Z\s]+$/,
                'Ingrese un nombre valido',
            ],
        }
    ,
    
     lastname:{
        type: String,
			required: true,
			minLength: 3,
			maxLength: 150, 
            match: [
                /^[a-zA-Z\s]+$/,
                'Ingrese un apellido valido',
            ],
     }
    ,
    
        email:{
            type: String,
            unique:true,
			required: true,
			minLength: 6,
			maxLength: 150, 
            match: [
                /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
                'Ingrese un email valido',
            ],
        }
    ,
    
        phone:{
            type: String,
			required: true,
            minLength: 10,
			maxLength: 15,
            match: [
                /^\+?\d{0,3}\s?\d{9}$/,
                'Ingrese un numero de celular valido',
            ]
        }
    ,
    
        password:{
            type: String,
			required: true,
            minLength: 8,
			maxLength: 100,
            match: [
                /^(?!.*\s).{8,100}$/,
                'Ingrese un password valido',
            ]
        }
    ,
    
    
        // image:{
        //     type:String,
        //     match: [
        //         /^.*\.(jpg|jpeg|png|gif|bmp)$/i,
        //         'Ingrese una ruta de imagen valida',
        //     ],
        //     default: ""
        // }
    
    
    
        role:{
            type: String,
            enum:{
                values:['user','admin'],
                message:`{VALUE} no esta definido`,
                default:'user',
                lowercase: true
            } 
        }
    ,
    
        active:{
            Boolean
        }
    ,
    
        // order:{
        //     type: [Schema.Types.ObjectId],
		// 	   ref: 'Orders',
        // }
    
    
        // booking:{
        //  type: [Schema.Types.ObjectId],
		// 	ref: 'Bookings',
        // }
    
	
	},
    {
        timestamps: true,
        versionkey:false
    }
	
)

export const UserModel = model('User', userSchema)
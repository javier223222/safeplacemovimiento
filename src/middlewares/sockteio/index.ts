import jwt from "jsonwebtoken"
import {Request,Response,NextFunction} from "express"
import dotenv from "dotenv"

dotenv.config()
const secret=process.env.SECRETUSER||"admin";

const verifyTokenio = async (socket:any,next:any) => {
    let data={}
    try{
        const token = socket.handshake.auth.token
    if(!token){
        data = {
            message:"no se proporciono un token"
        }
        socket.emit("auth:error",data)
        return
    }
    const decoded = jwt.verify(token,secret)
    
  
    
    socket.user = decoded
    next()
    }catch(error:any){
        data = {
            message:"no se pudo verificar el token",
            error:error.message
        }
        socket.emit("auth:error",data)
    }
}

export default verifyTokenio;
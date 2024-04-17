import { createServer } from "http";
import { Server } from "socket.io";
import movimientoHandler from "./src/handlers/movimiento.handler";
import verifyTokenio from "@/middlewares/sockteio";
const httpserver=createServer()
httpserver.listen(process.env.PORT||3002,()=>{
    console.log("Server is running on port"+3002)
})

const io=new Server(httpserver,{
    cors:{
        origin:"*"
    },
    pingInterval:10000,
    pingTimeout:2000

})

const onConnection=(socket:any)=>{
    console.log("new connection")
    movimientoHandler(io,socket)


}

io.of("/realtime/movimiento").on("connection",onConnection)
// .use(verifyTokenio)
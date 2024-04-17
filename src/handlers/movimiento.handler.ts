import mqtt from "mqtt";
import bcryp from "bcrypt"

export default (io:any,socket:any)=>{
    const getDataOfmovent=async(id:number)=>{
        socket.join(id)
        const mqttBroker = "mqtt://52.5.255.119/mqtt-web/"; // ip o dominio
        const mqttOptions = {
            clientId: 'mqttjs_mo' + bcryp.hashSync(Math.random().toString(16),10),
            username: "", // usuario MQTT
            password: "", //  contraseña MQTT
        };
      
        // todo implementar petecion a prodcuto par actualizar su rango
        const topic="safeplace/"+id+"/movimiento"
        const mqttClient = mqtt.connect(mqttBroker, mqttOptions);
        mqttClient.on('connect', () => {
            console.log('Conectado al servidor MQTT');
        
            mqttClient.subscribe('safeplace/'+id+'/movimiento');
          });
          
          mqttClient.on('message', (topic, message) => {
              let dataString = message.toString()
              const jsonData = JSON.parse(dataString);
              
              console.log(jsonData)
              io.of("/realtime/movimiento").to(id).emit("getmovimiento:sendmovimiento",jsonData)
          });

          
    }

    socket.on("movimineto:getdata",getDataOfmovent)
    // socket.on("joinRoom",(idRoom:any) => {
        
        
    // })
}
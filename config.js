
const config = {
    local: {
        DB:{
            HOST: "127.0.0.1",
            PORT: "27017",
            DATABASE: "amitrai",
            MONGOOSE:{
                useUnifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "",
            Password: ""
        },
        PORTNO : 9800,
       
    },

    staging: {
        DB:{
            HOST: "13.235.133.243 ",
            PORT: "27017",
            DATABASE: "amitrai",
            MONGOOSE:{
                useUndifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "Ibizo",
            Password: "4dokany9XdfIlwSG"
        },
        
            
        // PORTNO : 8000,
        
    },
}
export const get = function get (env){
    return config[env];
}
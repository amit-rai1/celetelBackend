
const config = {
    local: {
        DB:{
            HOST: "127.0.0.1",
            PORT: "27017",
            DATABASE: "amitrai",
            UserName: "",
            Password: ""
        },
        PORTNO : 7600,
       
    },

    staging: {
        DB:{
            HOST: "0.0.0.0",
            PORT: "27017",
            DATABASE: "test",
            MONGOOSE:{
                useUndifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "Ibizo",
            Password: "4dokany9XdfIlwSG"
        },
        
            
        PORTNO : 7600,
        
    },
}
export const get = function get (env){
    return config[env];
}
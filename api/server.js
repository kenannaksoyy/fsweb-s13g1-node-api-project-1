// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const server = express();

const usersModel = require("./users/model");
server.use(express.json());


server.get("/api/users", (req, res) => 
    {
        usersModel.find()
        .then
        ( comeUsers =>
            {
                res.status(201).json(comeUsers);
            }
        )
        .catch
        ( err =>
            {
                res.status(500).json(
                    {
                        message : "Kullanıcı bilgileri alınamadı"
                    }
                )
            }
        )
    }
);

server.get("/api/users/:id", (req, res) => 
    {
        const comeUserID = req.params.id;
        usersModel.findById(comeUserID)
        .then
        ( comeUser => 
            {
                comeUser
                ?
                res.status(201).json(comeUser)
                :
                res.status(404).json(
                    {
                        message: "Belirtilen ID'li kullanıcı bulunamadı"
                    }
                )
            }
        )
        .catch
        ( err =>
            {
                res.status(500).json(
                    {
                        message: "Kullanıcı bilgisi alınamadı"
                    }
                )
            }
        )
    }
);



server.post("/api/users", (req, res) => 
    {
        const user = req.body;
        if( !user["name"] || !user["bio"] ){
            res.status(400).json(
                {
                    message : "Lütfen kullanıcı için bir name ve bio sağlayın"
                }
            );
        }
        else{
            usersModel.insert(user)
            .then
            ( comeCreateUser => 
                {
                    res.status(201).json(comeCreateUser);
                }
            )
            .catch
            ( err => 
                {
                    res.status(500).json(
                        {
                            message : "Veritabanına kaydedilirken bir hata oluştu"
                        }
                    );
                }
            )
        }
    }
);

server.delete("/api/users/:id", (req, res) =>
    {
        const comeUserID = req.params.id;
        usersModel.remove(comeUserID)
        .then
        ( comeRemoveUser => 
            {
                comeRemoveUser
                ?
                res.status(201).json(comeRemoveUser)
                :
                res.status(404).json(
                    {
                        message: "Belirtilen ID li kullanıcı bulunamadı"
                    }
                )
            }
        )
        .catch
        ( err =>
            {
                res.status(500).json(
                    {
                        message: "Kullanıcı silinemedi"
                    }
                )
            }
        )       
    }
);

server.put("/api/users/:id", async (req, res) => 
    {
        try
        {
            const comeUserID = req.params.id;
            const possibleUser = await usersModel.findById(comeUserID);

            if(possibleUser){
                const comeUser = req.body;
                if(!comeUser["name"] || !comeUser["bio"]){
                    res.status(400).json(
                        {
                            message: "Lütfen kullanıcı için name ve bio sağlayın"
                        }
                    )
                }
                else{
                    const comeUpUser = await usersModel.update(comeUserID,comeUser);
                    res.status(200).json(comeUpUser);
                }
            }
            else{
                res.status(404).json(
                    {
                        message: "Belirtilen ID'li kullanıcı bulunamadı"
                    }
                )
            }
        }
        catch(err)
        {
            res.status(500).json(
                {
                    message: "Kullanıcı bilgileri güncellenemedi"
                }
            )
        }
    }
);


module.exports = server; // SERVERINIZI EXPORT EDİN {}

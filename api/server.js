// SUNUCUYU BU DOSYAYA KURUN

const express = require("express");
const cors = require("cors");
const { find, findById, remove, insert, update } = require("./users/model");
const server = express();
server.use(express.json());
server.use(cors());



server.get("/api/users",
    (req, res) => {
        find().then
        (
            users => {
                users.length == 0
                ?
                res.status(400).json(
                    {
                        message:"Hiç Kullanıcı Yoktur"
                    }
                )
                :
                res.status(200).json(users)
            }

        )
    }
);

server.get("/api/users/:id",
    (req, res) => {
        findById(req.params.id).then
        (
            user => {
                user == null
                ?
                res.status(400).json(
                    {
                        message:"Mevcut kullanıcı yoktur"
                    }
                )
                :
                res.status(200).json(user)
            }
        )
    }
);

server.delete("/api/users/:id",
    (req, res) => {
        remove(req.params.id).then
        (
            v => {
                v == null
                ?
                res.status(400).json(
                    {
                        message:"Mevcut kullanıcı yoktur"
                    }
                )
                :
                res.status(200).json(v)
            }
        )
    }
);

server.post("/api/users",
    (req,res) => {
        const user = req.body
        if(!user.name){
            res.status(400).json({
                message: "kullanıcı isim eksik",
            });
        }
        if(!user.bio){
            res.status(400).json({
                message: "kullanıcı bio eksik",
            });
        }
        if(!user.name && !user.bio){
            res.status(400).json({
                message: "kullanıcı hepsi eksik",
            });
        }
        if(user.name && user.bio){
            insert(user).then
            (
                newUserWith => 
                {
                    res.status(201).json(newUserWith);
                } 
            )
            .catch
            (
                err => {
                    res.status(500).json("Yeni Kullanıcı İptal Edildi");
                }
            )
        }
    }
);
server.put("/api/users/:id",
    (req,res) => {
        const upUser = req.body;
        update(req.params.id,upUser).then
        (
            upUserWith => 
                {
                    res.status(201).json(upUserWith);
                } 
        )
        .catch
            (
                err => {
                    res.status(500).json("Yeni Kullanıcı guncellemesi Edildi");
                }
            )
    }
);


module.exports = server; // SERVERINIZI EXPORT EDİN {}

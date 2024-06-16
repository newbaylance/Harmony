const axios = require("axios")
const openAI = require("../helpers/openai")
const { User, Female, Male, Harmony } = require("../models/")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require("google-auth-library")
const { Op } = require("sequelize")



const TYPEFORM_API_URL = 'https://api.typeform.com';
const TYPEFORM_API_TOKEN = process.env.TYPEFORM_API_TOKEN;
const TYPEFORM_FORM_ID = process.env.TYPEFORM_FORM_ID;


module.exports = class Controller {

    static async googleLogin(req, res, next) {
        try {
            const client = new OAuth2Client()

            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })

            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    email: payload.email,
                    password: "pass_akun_google",
                },
                hooks: false,
            })

            const access_token = signToken({
                id: user.id
            })

            const status = created ? 201 : 200

            res.status(status).json({ access_token })

        } catch (error) {
            next(error)
        }
    }
    
    static async generate(req, res, next) {
        try {
            let {style} = req.body
            // console.log(style)
  
            let responseOpenAI = await openAI(style)
          
            res.send(responseOpenAI)
        } catch (error) {
            next(error)
        }
    }

    static async test(req, res, next) {
        try {
            const response = await axios.get(`${TYPEFORM_API_URL}/forms/${TYPEFORM_FORM_ID}/responses`, {
                headers: {
                    'Authorization': `Bearer ${TYPEFORM_API_TOKEN}`
                }
            });
    
            const data = response.data.items[0].variables
            function getMaxKey(data) {
                const numbers = data.map(item => item.number);
                
                const maxNumber = Math.max(...numbers);
                
                const maxItem = data.find(item => item.number === maxNumber);
                
                return maxItem.key;
            }
            
            const result = getMaxKey(data);
            res.json({result});
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching responses');
        }
    }

    static async register(req, res, next) {
        try {
            const {email, password, gender} = req.body
            const newUser = await User.create({email, password, gender})

            res.status(201).json({id: newUser.id, email: newUser.email, gender: newUser.gender})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email || !password) {
                throw {name : "EMAIL_PASSWORD_REQUIRED"}
            }

            const foundUser = await User.findOne({
                where: {
                    email
                }
            })

            if(!foundUser) {
                throw {name : "UNAUTHORIZED"}
            }

            const compared = comparePassword(password, foundUser.password)

            if(!compared) {
                throw {name : "UNAUTHORIZED"}
            }

            console.log(foundUser, "<<<<< User")
            
            //Generete token bawa ID
            const access_token = signToken({
                id: foundUser.id
            })
            const id = foundUser.id
            const gender = foundUser.gender
            let MaleId = 0
            let FemaleId = 0

            

            if(foundUser.gender === "male") {
                const maleUser = await Male.findOne({
                    where: {
                        UserId: foundUser.id
                    }
                })
                if(maleUser) {
                    MaleId = maleUser.id
                }
            } else {
                const femaleUser = await Female.findOne({
                    where: {
                        UserId: foundUser.id
                    }
                })
                if(femaleUser) {
                    FemaleId = femaleUser.id
                }
            }
            

            res.status(200).json({
                access_token, id, gender, MaleId, FemaleId
            })
        } catch (error) {
            next(error)
        }
    }

    static async postProfileMale(req, res, next) {
        try {
            let { id } = req.params
            let {name, datebirth, height, weight, imageUrl, job, style} = req.body
            let male = await Male.create({name, datebirth, height, weight, imageUrl, job, style, UserId: id})

            res.status(201).json("Profile has been updated")
        } catch (error) {
            next(error)
        }
    }

    static async postProfileFemale(req, res, next) {
        try {
            let { id } = req.params
            let {name, datebirth, height, weight, imageUrl, job, style} = req.body
            let female = await Female.create({name, datebirth, height, weight, imageUrl, job, style, UserId: id})

            res.status(201).json("Profile has been updated")   
        } catch (error) {
            next(error)
        }
    }

    static async putProfileMale(req, res, next) {
        try {
            let { id } = req.params
            let {name, datebirth, height, weight, imageUrl, job} = req.body
            await Male.update({name, datebirth, height, weight, imageUrl, job}, {
                where: {
                    id
                }
            })
            let newMale = await Male.findByPk(id)
            res.status(200).json("Profile has been updated")
        } catch (error) {
            next(error)
        }
    }

    static async putProfileFemale(req, res, next) {
        try {
            let { id } = req.params
            let {name, datebirth, height, weight, imageUrl, job} = req.body
            await Female.update({name, datebirth, height, weight, imageUrl, job}, {
                where: {
                    id
                }
            })
            let newFemale = await Female.findByPk(id)
            res.status(200).json("Profile has been updated")   
        } catch (error) {
            next(error)
        }
    }

    static async getMales(req, res, next) {
        try {
            const data = await Male.findAll()

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    
    static async getFemales(req, res, next) {
        try {
            const data = await Female.findAll()

            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getHarmoniesMale(req, res, next) {
        try {
            const { id } = req.params
            const data = await Harmony.findAll({
                where: {
                    MaleId: id
                },
                include: [
                    {
                        model: Female
                    }
                ]
            })

            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getHarmoniesFemale(req, res, next) {
        try {
            const { id } = req.params
            const data = await Harmony.findAll({
                where: {
                    FemaleId: id
                },
                include: [
                    {
                        model: Male
                    }
                ]
            })

            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async postHarmony(req, res, next) {
        try {
            const { FemaleId, MaleId } = req.body
            const data = await Harmony.create({FemaleId, MaleId})

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteHarmony(req, res, next) {
        try {
            const { FemaleId, MaleId } = req.body
            const data = await Harmony.destroy({
                where: {
                    [Op.and]: [FemaleId, MaleId],
                }
            })

            res.status(200).json("Harmony has been deleted")
        } catch (error) {
            next(error)
        }
    }

    static async getFemaleById(req, res, next) {
        try {
            const { id } = req.params
            let female = await Female.findOne({
                where: {
                    UserId: id
                }
            })
            if(!female) {
                throw { name: "NOT_FOUND"}
            }
            res.status(200).json(female) 
        } catch (error) {
            next(error)
        }
    }

    static async getMaleById(req, res, next) {
        try {
            const { id } = req.params
            let male = await Male.findOne({
                where: {
                    UserId: id
                }
            })
            if(!male) {
                throw { name: "NOT_FOUND"}
            }
            res.status(200).json(male)
        } catch (error) {
            next(error)
        }
    }
}
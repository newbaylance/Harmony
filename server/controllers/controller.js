const axios = require("axios")
const openAI = require("../helpers/openai")
const { User, Female, Male } = require("../models/")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

const TYPEFORM_API_URL = 'https://api.typeform.com';
const TYPEFORM_API_TOKEN = process.env.TYPEFORM_API_TOKEN;
const TYPEFORM_FORM_ID = process.env.TYPEFORM_FORM_ID;


module.exports = class Controller {


    static async generate(req, res, next) {
        try {
            let {style} = req.body
            console.log(style)
  
            let responseOpenAI = await openAI(style)
          
            res.send(responseOpenAI)
        } catch (error) {
            console.log(error)
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
            const {email, password} = req.body
            const newUser = await User.create({email, password})

            res.status(201).json({id: newUser.id, email: newUser.email})
        } catch (error) {
            console.log(error)
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
            
            //Generete token bawa ID
            const access_token = signToken({
                id: foundUser.id
            })
            const id = foundUser.id

            res.status(200).json({
                access_token, id
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async postProfileMale(req, res, next) {
        try {
            let { id } = req.params
            let {name, datebirth, height, weight, imageUrl, job, style} = req.body
            let male = await Male.create({name, datebirth, height, weight, imageUrl, job, style, UserId: id})

            res.status(201).json(male)
        } catch (error) {
            console.log(error)
        }
    }

    static async postProfileFemale(req, res, next) {
        try {
            let { id } = req.params
            let {name, datebirth, height, weight, imageUrl, job, style} = req.body
            let female = await Female.create({name, datebirth, height, weight, imageUrl, job, style, UserId: id})

            res.status(201).json(female)   
        } catch (error) {
            console.log(error)
        }
    }

    static async getMales(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    
    static async getFemales(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async getHarmonies(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async getFemaleById(req, res, next) {
        try {
            let {id} = req.params
            let female = await Female.findByPk(id)
            if(!female) {
                throw { name: "NOT_FOUND"}
            }
            res.status(200).json(female) 
        } catch (error) {
            console.log(error)
        }
    }

    static async getMaleById(req, res, next) {
        try {
            let {id} = req.params
            let male = await Male.findByPk(id)
            if(!male) {
                throw { name: "NOT_FOUND"}
            }
            res.status(200).json(male)
        } catch (error) {
            console.log(error)
        }
    }
}
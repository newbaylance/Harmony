const axios = require("axios")

const TYPEFORM_API_URL = 'https://api.typeform.com';
const TYPEFORM_API_TOKEN = process.env.TYPEFORM_API_TOKEN;
const TYPEFORM_FORM_ID = process.env.TYPEFORM_FORM_ID;


module.exports = class Controller {
    static async register(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async login(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async postProfileMale(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async postProfileFemale(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async getMales(req, res, next) {
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
            
        } catch (error) {
            console.log(error)
        }
    }

    static async getMaleById(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}
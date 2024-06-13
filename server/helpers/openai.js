const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function openAI(style) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `saya memiliki gaya penjalinan ${style}, analisa karakter gaya penjalinan ${style},kekurangan dan kelebihannya dalam menjalin hubungan,
                    buat respon dalam format JSON dengan format {
                    gaya: "...",
                    analisa: "...",
                    kelebihan: "...",
                    kekurangan: "..."
                    }` }],
        model: "gpt-3.5-turbo",
      });
    
      return completion.choices[0].message.content
}
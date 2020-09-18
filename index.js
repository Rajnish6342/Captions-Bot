require("dotenv").config();
const Telegraf = require("telegraf");
const axios = require("axios");
// const express = require("express");
// const app = express();
const session = require('telegraf/session');
const endpoints = require("./endpoints");
const port = process.env.PORT || 3000;
const opt = ['art', 'attitude', 'family', 'travel', 'beauty', 'books', 'birthday', 'startup', 'success'];



const bot = new Telegraf(process.env.BOT_TOKEN)

async function find(cat) {
    try {
        const url = `https://captionss.herokuapp.com/api/${cat}`;
        console.log(url);
        const response = await axios.get(url);
        const data = await response.data;
        // console.log(data);

        return data;
    } catch (err) {
        console.log(err);
    }

}





bot.on('text', async ctx => {

    let cat = ctx.message.text.split('/')[1];
    // console.log(cat);
    if (cat === 'start') {
        return ctx.reply(`Welcome To CaptionPlus Unofficial Bot Api. \n The Bot is currently in Dev Mode \n List of commands are \n /attitude  \n /art \n /family \n /success \n /startup \n /birthday \n /travel \n /books \n /beauty `)
    }
    if (opt.includes(cat)) {

        find(`${cat}`)
            .then(async data => {

                let no = Math.floor(Math.random() * (data.total - 0)) + 0;
                if (!data.total == 0) {

                    await ctx.reply(data.captions[no].caption)
                    // .then(msg => {
                    //     console.log(msg);
                    // }).catch(err => console.log(err))


                } else {
                    await ctx.reply('Oops No Captions Found')
                }


            });

    } else {
        ctx.reply('Not a  valid cateogry command should start with /')
    }



})
bot.command('/start', ctx =>
    ctx.reply(`Welcome To CaptionPlus Unofficial Bot Api. \n The Bot is currently in Dev Mode \n List of commands are \n /attitude  \n /art \n /family \n /success \n /startup \n /birthday \n /travel \n /books \n /beauty `)
)

bot.launch()
// app.use("/", endpoints);
// const server = app.listen(port, () => {
//     console.log(`App running on port ${port}...`);
// });
import fs from "node:fs";
import path from "node:path";
import { InquirerInputQuestion, InquirerCheckboxQuestion, InquirerListQuestion, Configuration, resolveData } from "./lib/class.js";
import { Client } from "discord.js-selfbot-v13";
import { accountCheck } from "./Extension.js";
import { getResult, trueFalse, log } from "./Console.js";
import { global } from "../index.js";
import dotenv from 'dotenv';
dotenv.config();

let client:Client<boolean>, guildID:string, channelID:string[], waynotify:number[], webhookURL:string, autopray:string[],
usernotify:string, musicPath:string, solveCaptcha:number, apiuser:string, apikey:string, prefix:string,
apilink:string, autogem:number, autocrate:boolean = false, autoquote:boolean, autoreload:boolean,
autosleep:boolean, autoresume:boolean, autoslash:boolean, autoother:boolean, autodaily:boolean, 
autosell:boolean, autohunt:boolean, upgradetrait:number, autogamble:string[], gamblingAmount:string

// const listAccount = (data: {[key:string]: Configuration}) => {
//     return new InquirerListQuestion<{ answer: string }>({
//         type: "list",
//         message: "Select an accout to login",
//         choices: [
//             ...new Set(Object.keys(data).map(user => ({name: data[user].tag, value: user}))),
//             {name: "New Account (Sign In With Token)", value: "0"},
//             {name: "New Account (Sign In With QR Code)", value: "1"},
//             {name: "New Account (Sign In With Password - MFA Required)", value: "2"},
//             {name: "About Us", value: "3", disabled: true},
//         ]
//     })
// }

// const getToken = ()=> {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter Your Token",
//         validate: (token: string) => {
//             return token.split(".").length === 3 ? true : "Invalid Token";
//         }
//     });
// };

// const getAccount = () => {
//     const username = new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter Your Email/Phone Number: ",
//         validate(ans:string) {
//             return ans.match(/^((\+?\d{1,2}\s?)?(\d{3}\s?\d{3}\s?\d{4}|\d{10}))|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/) ? true : "Invalid Email/Phone Number";
//         }
//     })
//     const password = new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter Your Password: ",
//         validate(ans:string) {
//             return ans.match(/^.+$/) ? true : "Invalid Input";
//         }
//     })
//     const mfaCode = new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter Your 2FA/Backup Code: ",
//         validate: (ans:string) => {
//             return ans.match(/^([0-9]{6}|[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4})$/) ? true : "Invalid 2FA/Backup Code"
//         }
//     })
//     return [username, password, mfaCode]
// }

// const listGuild = (cache?: string) => {
//     return new InquirerListQuestion<{ answer: string }>({
//         type: "list",
//         message: "Select a guild to farm",
//         choices: client.guilds.cache.map((guild) => ({name: guild.name, value: guild.id})),
//         default: cache
//     })
// };

// const listChannel = (cache?: string[]) => {  
//     const guild = client.guilds.cache.get(guildID)!
//     return new InquirerCheckboxQuestion<{ answer: string[] }>({
//         type: "checkbox",
//         message: "Select channels to farm (Farming Channel will be changed randomly if multiple channels are selected)",
//         choices: guild.channels.cache
//             .filter((cnl) => (cnl.type == "GUILD_NEWS" || cnl.type == "GUILD_TEXT") && cnl.permissionsFor(guild.members.me!).has(["VIEW_CHANNEL", "SEND_MESSAGES"]))
//             .map(ch => ({name: ch.name, value: ch.id})),
//         validate: (answer: string[]) => {
//             return answer.length > 0 ? true : "Please Choose At Least One Channel"
//         },
//         default: cache
//     })
// }

// const wayNotify = (cache?: number[]) => {
//     return new InquirerCheckboxQuestion<{ answer: number[] }>({
//         type: "checkbox",
//         message: "Select how you want to be notified when selfbot receives a captcha",
//         choices: [
//             {name: "Music", value: 0},
//             {name: "Webhook", value: 1}, 
//             {name: "Direct Message (Friends Only)", value: 2}, 
//             {name: "Call (Friends Only)", value: 3}
//         ],
//         default: cache
//     })
// }

// const webhook = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter your webhook link",
//         validate: (answer:string) => {
//             return answer.match(/(^.*(discord|discordapp)\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_-]+)$)/gm) ? true : "Invalid Webhook"
//         },
//         default: cache
//     })
// }

// const userNotify = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter user ID you want to be notified via Webhook/Call/Direct Message",
//         validate: async (answer:string) => {
//             if((waynotify.includes(2) || waynotify.includes(3)) && /^\d{17,19}$/.test(answer)) {
//                 if(answer == client.user?.id) return "Selfbot ID is not valid for Call/DMs option"
//                 const target = client.users.cache.get(answer)
//                 if(!target) return "User not found!"
//                 switch (target.relationships.toString()) {
//                     case "FRIEND":
//                         return true;
//                     case "PENDING_INCOMING":
//                         try {
//                             await target.setFriend()
//                             return true
//                         } catch (error) {
//                             return "Could not accept user's friend request!"
//                         }
//                     case "PENDING_OUTGOING":
//                         return "Please accept selfbot's friend request!"
//                     default:
//                         try {
//                             await target.sendFriendRequest()
//                             return "Please accept selfbot's friend request!"
//                         } catch (error) {
//                             return "Could not send friend request to user!"
//                         }
//                 }
//             }
//             return /^(\d{17,19}|)$/.test(answer) ? true : "Invalid User ID"
//         },
//         default: cache
//     })
// }

// const musicNotify = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter music file/directory path",
//         validate: (answer:string) => {
//             if(!/^([a-zA-Z]:)?(\/?[^\/\0+]+)+(\/[^\/\0]+)?$/.test(answer)) return "Invalid Path"
//             if(!fs.existsSync(answer)) return "Path Not Found!"
//             const stats = fs.statSync(answer);
//             if(stats.isDirectory()) {
//                 if(fs.readdirSync(answer).some(file => supportedAudioExtensions.includes(path.extname(file)))) return true
//                 return "No Supported File Found!"
//             }
//             if(stats.isFile() && supportedAudioExtensions.includes(path.extname(answer))) return true;
//             return "Invalid Directory"
//         },
//         default: cache
//     })
// }

// const music2 = (directory:string) => {
//     const supportedFiles = fs.readdirSync(directory).filter(
//         file => supportedAudioExtensions.includes(path.extname(file))
//     )
//     return new InquirerListQuestion<{ answer: string }>({
//         type: "list",
//         message: "Select your music file",
//         choices: [
//             ...supportedFiles.map(file => ({name: file, value: path.join(directory, file)}))
//         ]
//     })
// }

// const captchaAPI = (cache?:number) => {
//     return new InquirerListQuestion<{ answer: number }>({
//         type: "list",
//         message: "Select a captcha solving service (Selfbot will try once)",
//         choices:[
//             {name: "Skip", value: 0},
//             {name: "TrueCaptcha (100 images - Free)", value: 1},
//             {name: "2Captcha (image and link - Paid)", value: 2},
//             {name: "Selfbot API [Coming Soon]", disabled: true},
//         ],
//         default: cache
//     })
// }

// const apiUser = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter your API User ID",
//         validate: (answer:string) => {
//             return /^\S+$/.test(answer) ? true : "Invalid User ID"
//         },
//         default: cache
//     })
// }

// const apiKey = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "Enter your API Key",
//         validate: (answer:string) => {
//             return /^\S+$/.test(answer) ? true : "Invalid API Key"
//         },
//         default: cache
//     })
// }

// const apiNCAI = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "[BETA] Enter your NoCaptchaAI API Key, Empty to skip",
//         validate: (answer:string) => {
//             if(!answer) return true
//             return /^\S+$/.test(answer) ? true : "Invalid API Key"
//         },
//         default: cache
//     })
// }

// const botPrefix = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer: string }>({
//         type: "input",
//         message: "[BETA] Enter your Selfbot Prefix, Empty to skip",
//         validate: (answer:string) => {
//             if(!answer) return true;
//             return /^[^0-9\s]{1,5}$/.test(answer) ? true : "Invalid Prefix"
//         },
//         default: cache
//     })
// }

// const gemOrder = (cache?:number) => {
//     return new InquirerListQuestion<{ answer: number }>({
//         type: "list",
//         message: "Select your gem usage order",
//         choices:[
//             { name: "Skip", value: -1 },
//             { name: "Best to Worst", value: 0 },
//             { name: "Worst to Best", value: 1 }
//         ],
//         default: cache
//     })
// }

// const prayCurse = (cache?:string[]) => {
//     return new InquirerCheckboxQuestion<{ answer: string[] }>({
//         type: "checkbox",
//         message: "Select to pray or curse (randomly if multiple), empty to skip",
//         choices: [
//             {name: "Pray selfbot account", value: `pray`},
//             {name: "Curse selfbot account", value: `curse`},
//             ...(usernotify ? [
//                 {name: "Pray notification reception", value: `pray ${usernotify}`},
//                 {name: "Curse notification reception", value: `curse ${usernotify}`}
//             ] : [])
//         ],
//         default: cache
//     })
// }

// const huntBot = (cache?:number) => {
//     return new InquirerListQuestion<{ answer: number }>({
//         type: "list",
//         message: "Select which huntbot trait to upgrade, empty to skip",
//         choices: [
//             {name: "Efficiency", value: 1},
//             {name: "Duration", value: 2},
//             {name: "Cost", value: 3},
//             {name: "Gain", value: 4},
//             {name: "Experience", value: 5},
//             {name: "Radar", value: 6},
//         ],
//         default: cache
//     })
// }

// const Gamble = (cache?:string[]) => {
//     return new InquirerCheckboxQuestion<{ answer: string[] }>({
//         type: "checkbox",
//         message: "Select which gambling method to use, empty to skip",
//         choices: [
//             "Blackjack",
//             "Slots",
//             "Coinflip",
//             "Lottery"
//         ],
//         default: cache
//     })
// }

// const gambleAmount = (cache?:string) => {
//     return new InquirerInputQuestion<{ answer:string }>({
//         type: "input",
//         message: "Enter the amount of cowoncy to gamble",
//         validate: (input) => {return /^\d+$/.test(input) ?? "Invalid cowoncy balance"},
//         default: cache ?? "1"
//     })
// }

export const collectData = async (data:{[key:string]: Configuration}) => {
    console.clear()
    // await checkUpdate()
    let account:string, loginMethod: string | string[] | undefined, cache: Configuration | undefined;
    while (!client) {
        account = "0"
        switch (account) {
            case "0":
                loginMethod = process.env.USER_TOKEN
                break;
            case "1":
                break;
            default:
                const obj = data[account]
                cache = obj
                loginMethod = obj.token
                break;
        }
        log("Checking Account...", "i")
        try {
            client = await accountCheck(loginMethod)
        } catch (error) {
            log(`${error}`, "e")
            process.exit(1)
        }
    }

    guildID = "1138534816636215379"
    channelID = ["1220065256399966288"]
    waynotify = [1]
    webhookURL = "https://discord.com/api/webhooks/1220161816861216939/VFJDmCf19OngLs5UhamBiA_dTun22MJoc93KYz3mKL_Ri2sOA2zCnkgDyZmp2q3CuN6p"
    if(waynotify.includes(1) || waynotify.includes(2) || waynotify.includes(3)) usernotify = "259178425757990913"
    solveCaptcha = 1
    if(solveCaptcha === 1) {
        apiuser = "m.daffa8101@gmail.com"
        apikey = `${process.env.API_KEY}`
    }
    prefix = ","
    autopray = ["pray"]
    autogem = 0
    if(autogem >= 0) autocrate = true
    if(solveCaptcha != 0) autohunt = false
    autogamble = ["Blackjack"]
    gamblingAmount = "100"
    autoquote = true
    autoslash = true
    autoother = true
    autodaily = true
    autosell  = true
    autosleep = false
    autoreload = false
    autoresume = true
    const conf = resolveData(
        `${client.user?.displayName}`,
        client.token!,
        guildID,
        channelID,
        waynotify,
        musicPath,
        webhookURL,
        usernotify,
        solveCaptcha,
        apiuser,
        apikey,
        apilink,
        prefix,
        autopray,
        autogem,
        autocrate,
        autohunt,
        upgradetrait,
        autogamble,
        gamblingAmount,
        autoslash,
        autoquote,
        autodaily,
        autosell,
        autoother,
        autosleep,
        autoreload,
        autoresume
    )
    data[`${client.user?.id}`] = conf
    fs.writeFileSync(global.DataPath, JSON.stringify(data))
    log(`Data Saved To: ${global.DataPath}`, "i")
    return { client, conf }
}
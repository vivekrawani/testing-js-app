
import express, {Request, Response, NextFunction} from "express";
import fsPromise from "node:fs/promises"

const app = express();
app.use(express.json());
app.use(logger)



export function division(a : number, b : number){
    if(b === 0){
        throw new Error("Cannot divide by 0");
        
    }
    const quotient = Math.floor(a/ b);
    const remainder = 1 % b;
    return {quotient, remainder};
}

app.post("/sum", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a + b;

    res.json({
        answer
    })
});

app.post("/division", (req, res)=>{

    const a = req.body.a;
    const b = req.body.b;
    
    if(b === 0){
        res.status(422)
        .json({
            message : "Cannot divide by 0"
        })
        
    }
    const quotient = Math.floor(a/ b);
    const remainder = 1 % b;
    res.status(200)
        .json({
            result : {
                quotient, remainder
            }
        })
})

app.get("/", (req,res)=>{
    res.json("Server in running fine!")
})

async function logger(req : Request, res :Response, next : NextFunction){
    // const url = new URL(req.url, `http://${req.headers.host}`);
    const ip = req.ip;
    const method = req.method;
    const date = new Date();
    // console.log("url", url)
    const log = `[${method}] \t${ip} at ${date}\n`;

    try {
        await fsPromise.appendFile('log.txt', log);
    } catch (err) {
        console.error(err);
    }
    // console.log(log)
    next()
}


export {app}

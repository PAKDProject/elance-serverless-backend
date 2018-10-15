import * as colors from "colors/safe";

export let error = (message: string) => { console.log(colors.red(message)) }
export let warning = (message: string) => { console.log(colors.yellow(message)) }
export let info =  (message: string) => { console.log(colors.white(message)) }
export let success =  (message: string) => { console.log(colors.green(message)) }
export let secret = (message: string) => {console.log(colors.bgBlack(message))}
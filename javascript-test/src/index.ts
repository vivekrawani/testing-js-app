
export function sum(a: number, b: number) {
    return a + b
}

export function division(a : number, b : number){
    if(b === 0){
        throw new Error("Cannot divide by 0");
        
    }
    const quotient = Math.floor(a/ b);
    const remainder = 1 % b;
    return {quotient, remainder};
}
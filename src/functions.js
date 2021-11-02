function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getAsyncData = async ()=>{
    try{
        await sleep(2000)
        return ['super data']
    }
   catch {
        return ['failed']
   }
}

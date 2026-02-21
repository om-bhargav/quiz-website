export function getDate(timestamp: string){
    const day = new Date(timestamp);
    return day.toDateString();
}

export function getTime(timestamp: string){
    const time = new Date(timestamp);
    return time.toTimeString();    
}
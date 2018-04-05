
const DEBUG_STOPWATCH:boolean = true;

export class Stopwatch {

    startTime:number;
    endTime:number

    constructor() {
        this.start();
    }

    start() {
        if(DEBUG_STOPWATCH)
            this.startTime = window.performance.now();
    }

    end() {
        if(DEBUG_STOPWATCH)
            this.endTime = window.performance.now();
    }

    log(message:string) {
        if(DEBUG_STOPWATCH) {

            if(this.endTime == undefined)
                this.end();
            var time = Math.round((this.endTime - this.startTime)* 100) / 100; 
            console.log(message + " (" + time + "ms)" );
        }
            
    }

}
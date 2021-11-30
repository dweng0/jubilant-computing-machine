export interface TestResults {
    newIndexPosition: number,
    passed: boolean
}

export interface Logger { 
    log: (message) => void,
    logs: Array<string>
}
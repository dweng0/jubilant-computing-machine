export interface TestResults {
    newIndexPosition: number,
    passed: boolean,
    result: string
}

export interface Logger { 
    log: (message) => void,
    logs: Array<string>
}

export interface TokenRule {
    test?: RegExp | string,
    /**
     * Required if regex is used, for example if you are testing for foo then the /foo/ size is 3
     * Regex is not fully supported, for example global will result in an incorrect token creation.
     * feel free to add full regex support
     */
    testSize?: number, 
    type: string
}

export interface Token { 
    type: string,
    value: any
}

export interface AbstractSyntaxTree {
    tokens: Array<Token>
}
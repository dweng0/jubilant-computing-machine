import { TestResults, Logger } from "interface";
    
export const getLogger = (verbose: boolean): Logger => { 
    const logging: Array<string> = [];
    const logger: Logger = {
        log: (message: string) => {},
        logs: logging
    }
    if(verbose) {
        logger.log = (message: string) => {
            console.log(message);
            logging.push(message);
        }
    }
    
    return logger;
}

/**
 * Checks if a condition passes test
 * @param testCandidate the thing to test for
 * @param testCondition the thing to test
 * @param index the index of the test conditions array
 * @param testConditions the additional conditions
 * @param verbose default false. adds logging.
 */
export const passesTest = (testCondition: RegExp | string, index: number, testConditions: Array<string>, testSize?: number, verbose:boolean = false): TestResults => {
            
            const { log } = getLogger(verbose);
            
            // setup a default payload
            const results: TestResults = {
                newIndexPosition: index,
                passed: false,
                result: undefined
            }
       
            // if we have no condition 
            if(!testCondition) { 
                log('no test condition provided, exiting');
                return results;
            }

            // determine if regex or string
            const isRegEx = (typeof testCondition !== 'string');

            // fork 
            if(isRegEx && typeof testSize === 'number') { 
                
                const regTest = testCondition as RegExp;
                    results.passed = regTest.test(testConditions.slice(index).join());    
                    results.newIndexPosition = (index + testSize);

            } else if (!isRegEx) { 
                
                const stringtest = testCondition as string;
                
                const toIndex = (index + stringtest.length);
                const testCandidate = testConditions.slice(index, toIndex).join("");

                log(`Testing ${testCandidate} against ${testCondition}`);
                    results.passed = (testCandidate === testCondition);
                if (results.passed) {
                    results.newIndexPosition = toIndex;
                    results.result = testCandidate;
                    log(`Passed test! setting new index position from ${index} to ${toIndex}`);
                }
            }
            return results;
}
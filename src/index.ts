import { take, splitEvery } from 'ramda';
const test = "<div><p>hi<p><div>";

//start <html>
//exit <html>

export interface SyntaxRules {
    exitTest: string,
    tokenTest: string,
    tokenType: string,
    value: string,
    childNode: Array<SyntaxRules>
}
//tokens.push({ type: 'params', value: results.tokens });


const Abstractor = (payload: string, rules: SyntaxRules, offset:number = 0, bufferSize:number = 2000) => {
    
    if(!payload) { 
        throw new Error('Please provide a payload to abstract');
    }

    const payloadArrayBuffer:Array<string> = payload.slice(offset, bufferSize).split("");
    const skipUntilIndexesReached:Array<number> = [];

    payloadArrayBuffer.reduce((accumulator, current, index, array) => {

        //skip until we reach new index point
        if(index <= skipUntilIndexesReached[skipUntilIndexesReached.length-1]) {
            return accumulator.length;
        } else {
            if(skipUntilIndexesReached.length > 0) {
                skipUntilIndexesReached.pop();
            }
        }

        // Checks to see if payload passes test
        // if passes, provides the index that should be skipped up to.
        const isPassingTest = (testCondition) => {

            // if we have no condition 
            if(!testCondition) { 
                console.log('no test condition provided, exiting');
                return false;
            } 

            const toIndex = (index + (testCondition.length - 1));
            const testCandidate = array.slice(index, toIndex);
            const result = (testCandidate === testCondition);
            if(result) { 
                skipUntilIndexesReached.push(toIndex);
            }
            return result;
        }

        // exit condition
        if(isPassingTest(rules.exitTest)) { 
            
        }

        // enter condition
        if (isPassingTest(rules.enterTest)) {

        }
     }, []);

}
import { passesTest } from '../functionals';
import { TokenRule } from '../interface';

describe("Functional Tests", () => {

    it("isPassingShould pass correctly", () => { 
        //setup
        const testHTML = "<HTML>COOL</HTML>";
        const testCondition = "<HTML>";

        //execute
        const { passed, newIndexPosition} = passesTest(testCondition, 0, testHTML.split(""));

        //verify
        expect(passed).toBe(true);
        expect(newIndexPosition).toEqual(6);
    });

    it("isPassing should fail and return correct index if no test condition exists", () =>{  
           //setup
           const testHTML = "<HTML>COOL</HTML>";
           const testCondition = "<div>";
   
           //execute
           const { passed } = passesTest(testCondition, 0, testHTML.split(""), null, true);
            
           //verify
           expect(passed).toBe(false);
    });

} );

// describe("Abstraction and Generation Tests", () => { 
//     it("should  do something", () => {
//         //setup
//         const testHTML = "if (good) {}";
//         const rules: Array<TokenRule> = [
//             {
//                 type: 'ifblock',
//                 test: 'if',                
//             },
//             {
//                 type: 'openingParenth',
//                 test: '(',
//                 children: []
//             }
//         ]
//         //execute
//         //verify
//     });
// });
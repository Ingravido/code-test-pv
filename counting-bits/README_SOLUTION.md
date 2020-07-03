#Solution
Most of the work has been done on the getSumAndOnesPositions which is completely dependent on the length of binary representation of the number. There is some constant work every time we run the Count function (the work made by the native instruction to convert to binary representation) but since is constant we can skip it and conclude the function has a complexity of O(n)

For the shake or curiosity and in order to make sure I am implementing the best performance solution, I tested with different js loop solutions
###do while
branch: `software-engineer-js`

`Execution time: 0.009780494ms`

###forEach
branch: `software-engineer-js-foreach`

`Execution time: 0.011252038ms`

###for loop
branch: `software-engineer-js-forloop`

`Execution time: 0.010608488ms`

Very tied results, on a first impresion do while seems to do slightly better job. A more complete analysis could be made with different number sizes and check which one performs better with each size but maybe we are stepping out completely of the scope of the assessment and it's something already solved.

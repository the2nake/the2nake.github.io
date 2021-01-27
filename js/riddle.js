var problemContainer = document.getElementById("problem-container");
var solutionButton = document.getElementById("solution-button");
var solutionContainer = document.getElementById("solution-container");
solutionContainer.style.display = "none";

var problems = ["<p> If an acute triangle is divided into 3 triangles and 1 quadrilateral as shown below, what is the area of the quadrilateral ? </p> <img src='../images/puzzle/4-5-2020.png' width='240' height='162'/>",];
var solutions = [`<p>The quadrilateral has area 18 units squared. First, draw a line from the tip of the quadrilateral to its bottom and label the points, like so: <br/></p>
    <img src='../images/puzzle/4-5-2020-solution.png' width='240' height='162'/><br/><p>AF = FD because BF is a median of triangle ABD.<br/>
    EF = 3 ⋅ FB : 7, as the ratio of the areas of triangle AEF and ABF is 3 : 7. As AF = FD, x + 3 = y. <br/>
    Because EF = 3 ⋅ FB : 7, x : y + 7 = 3 : 7. <br/>
    Using substitution, x : x + 10 = 3 : 7. 7x = 3x + 30, and x = 15 : 2. <br/>
    y = 21 : 2, so x + y = the area of quadrilateral CEFD = 15 + 21 : 2 = 18.</p>`];

problemContainer.innerHTML = problems[0];
solutionContainer.innerHTML = solutions[0];

solutionButton.onclick = function () {
    if (solutionContainer.style.display == "none") {
        solutionContainer.style.display = "initial";
    } else {
        solutionContainer.style.display = "none";
    }
};
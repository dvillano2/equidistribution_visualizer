const instructionsHTML = `
<div id="instructions" class="collapsed">
  <div id="instructionsHeader">
    Instructions
    <span id="toggleBtn">&#9650;</span>
  </div>
  <div id="instructionsContent">
    <p>Toggle dots by clicking on them with while holding 'd'</p>
    <p>Reset all dots by holding 'd' and hitting return</p>
    <p>Draw a line connecting two dots by clicking on them without holding 'd'</p>
    <p>To draw all lines parallel to lines drawn by clicking, hold shift and hit return<p>
    <p>To remove all lines, hit return<p>
  </div>
</div>
`;

const instructionsCSS = `
#instructions {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 250px;
  max-height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  overflow: hidden;
  font-family: sans-serif;
}
#instructions.collapsed { max-height: 30px; cursor: pointer; }
#instructionsHeader { font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
#toggleBtn { font-size: 16px; user-select: none; }
#instructionsContent { margin-top: 10px; }
`;

const style = document.createElement("style");
style.textContent = instructionsCSS;
document.head.appendChild(style);

document.body.insertAdjacentHTML("beforeend", instructionsHTML);

const instructions = document.getElementById("instructions");
const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", () => {
  instructions.classList.toggle("collapsed");
  toggleBtn.innerHTML = instructions.classList.contains("collapsed")
    ? "&#9650;"
    : "&#9660;";
});

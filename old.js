// Initialization module
var arrowsDrawer = $cArrows("body");

// Events module
$("#addBlock").click(() => {
  addBlock();
});

// State module
let activeBlock = null;
let clickedBlock = null;

let currentPage = "SETTINGS";

let joins = [];
let blockCounter = 0;

let state = {
  blocks: []
};

// Arrows module
const addBlock = () => {
  const newId = blockCounter++;
  const newBlock = {
    id: newId,
    name: `Block ${newId}`,
    description: `With supporting text below as a natural lead-in to additional content.`,
    links: []
  };
  state.blocks.push(newBlock);
  $(
    `<div class="card" id="block-${newId}">
    <div class="card-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="deleteBlock">
    <span aria-hidden="true">&times;</span>
  </button>
    </div>
    <div class="card-body">
      <h5 class="card-title">Block ${newId}</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Edit block</a>
      <a href="#" class="btn btn-info">Connect block</a>
    </div>
  </div>`
  ).appendTo("body");

  $(`#block-${newId} #deleteBlock`).click(() => {
    $(`#block-${newId}`).remove();
    state.blocks = state.blocks.filter(b => b.id != newId);
    arrowsDrawer.redraw();
  });

  $(`#block-${newId}`).draggable({
    containment: "body",
    scroll: false,
    drag: function(event, ui) {
      arrowsDrawer.redraw();
    }
  });

  $(`#block-${newId} .btn-primary`).click(function(e) {
    document.getElementById("block-name").value = newBlock.name;
    document.getElementById("block-desc").value = newBlock.description;

    clickedBlock = newId;

    $("button.invisible").click();
  });

  $(`#block-${newId} .btn-info`).click(function(e) {
    if (activeBlock != null) {
      if (activeBlock == newId) {
      } else {
        drawLine(activeBlock, newId);
      }
      $(`#block-${activeBlock} .btn-info`).text(`Connect block`);
      $(`#block-${activeBlock} .btn-info`).removeClass("inactive");
      document
        .querySelectorAll(`.card:not([id="block-${activeBlock}"]) .btn-info`)
        .forEach(b => {
          b.innerText = `Connect block`;
        });
      activeBlock = null;
    } else {
      activeBlock = newId;
      $(`#block-${newId} .btn-info`).text(`Choose to connect`);
      $(`#block-${newId} .btn-info`).addClass("inactive");
      document
        .querySelectorAll(`.card:not([id="block-${newId}"]) .btn-info`)
        .forEach(b => {
          b.innerText = `Connect to ${newId}`;
        });
    }
  });

  $(`#block-${newId}`).mousedown(function(e) {
    $(`#block-${newId}`).addClass("dragging");
  });

  $(`#block-${newId}`).mouseup(function(e) {
    $(`#block-${newId}`).removeClass("dragging");
  });
};

const drawLine = (id1, id2) => {
  arrowsDrawer.arrow(`#block-${id1}`, `#block-${id2}`);
  joins = [...joins, { from: id1, to: id2 }];
  state.blocks.find(b => b.id == id1).links.push(id2);
  state.blocks.find(b => b.id == id2).links.push(id1);
};

const drawAll = () => joins.forEach(({ from, to }) => drawLine(from, to));

$("#export").click(e => {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "bot.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});

$("#to_logic").click(() => {
  $("#to_logic").addClass("active");
  $("#to_settings").removeClass("active");
  $("#to_links").removeClass("active");
  currentPage = "LOGIC";
});

$("#to_settings").click(() => {
  $("#to_settings").addClass("active");
  $("#to_logic").removeClass("active");
  $("#to_links").removeClass("active");
  currentPage = "SETTINGS";
});

$("#to_links").click(() => {
  $("#to_links").addClass("active");
  $("#to_settings").removeClass("active");
  $("#to_logic").removeClass("active");
  currentPage = "LINKS";
});

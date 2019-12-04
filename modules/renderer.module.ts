import { arrowsDrawer } from "./init.module";
import state from "./state.module";
export const addBlock = () => {
  const newId = state.blockCounter++;
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

  ($(`#block-${newId}`) as any).draggable({
    containment: "body",
    scroll: false,
    drag: function(event, ui) {
      arrowsDrawer.redraw();
    }
  });

  $(`#block-${newId} .btn-primary`).click(function(e) {
    (document.getElementById("block-name") as any).value = newBlock.name;
    (document.getElementById("block-desc") as any).value = newBlock.description;

    state.clickedBlock = newId;

    $("button.invisible").click();
  });

  $(`#block-${newId} .btn-info`).click(function(e) {
    if (state.activeBlock != null) {
      if (state.activeBlock == newId) {
      } else {
        drawLine(state.activeBlock, newId);
      }
      $(`#block-${state.activeBlock} .btn-info`).text(`Connect block`);
      $(`#block-${state.activeBlock} .btn-info`).removeClass("inactive");
      document
        .querySelectorAll(
          `.card:not([id="block-${state.activeBlock}"]) .btn-info`
        )
        .forEach(b => {
          (b as any).innerText = `Connect block`;
        });
      state.activeBlock = null;
    } else {
      state.activeBlock = newId;
      $(`#block-${newId} .btn-info`).text(`Choose to connect`);
      $(`#block-${newId} .btn-info`).addClass("inactive");
      document
        .querySelectorAll(`.card:not([id="block-${newId}"]) .btn-info`)
        .forEach(b => {
          (b as any).innerText = `Connect to ${newId}`;
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

export const drawLine = (id1, id2) => {
  arrowsDrawer.arrow(`#block-${id1}`, `#block-${id2}`);
  state.joins = [...state.joins, { from: id1, to: id2 }];
  state.blocks.find(b => b.id == id1).links.push(id2);
  state.blocks.find(b => b.id == id2).links.push(id1);
};

export const drawAll = () =>
  state.joins.forEach(({ from, to }) => drawLine(from, to));

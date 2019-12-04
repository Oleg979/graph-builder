import * as init from "./modules/init.module";
import * as state from "./modules/state.module";
import { addBlock } from "./modules/renderer.module";
import { exportClickHandler, changePageHandler } from "./modules/events.module";
import Pages from "./models/pages.enum";

$("#export").click(exportClickHandler);
$("#addBlock").click(addBlock);
Pages.forEach(p => $(`#to_${p}`).click(() => changePageHandler(p)));

import Pages from "../models/pages.enum";
import State from "./state.module";

export const exportClickHandler = () => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(new State()));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute(
    "download",
    `config-${new Date().toLocaleDateString()}.json`
  );
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const changePageHandler = (pageName: string) => {
  Pages.filter(p => pageName != p).forEach(p =>
    $(`#to_${p}`).removeClass("active")
  );
  $(`to_${pageName}`).addClass("active");
};

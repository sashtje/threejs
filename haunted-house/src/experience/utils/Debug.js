import GUI from "lil-gui";

export class Debug {
  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.gui = new GUI({
        width: 300,
        title: "Settings",
        closeFolders: true,
      });

      this.gui.close();

      this.guiPanel = document.querySelector(".lil-gui");

      this.guiPanel.addEventListener("dblclick", (event) => {
        event.stopPropagation();
      });

      this.guiPanel.addEventListener("touchend", (event) => {
        event.stopPropagation();
      });

      window.addEventListener("touchend", () => {
        this.gui.close();
      });

      window.addEventListener("keydown", (event) => {
        if (event.key === "h") {
          this.gui.show(this.gui._hidden);
        }
      });
    }
  }
}

import JQuery from "jquery";

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  width?: string;
  onConfirm: () => void;
}

// Expected usage: showRemoveDialog({selector: this, title: "Remove SOMETHING", message: "", width: "22em", onConfirm: () => {}})

const NAMESPACE = "confirmDialog";

export function showRemoveDialog(opts: ConfirmDialogOptions): void {
  const {
    title,
    message,
    width = "22em",
    onConfirm
  } = opts;

  const $dialog = $("#alert");
  
  const keyHandler = (e: JQuery.KeyDownEvent) => {
    if (e.key == "enter") {
      e.preventDefault();
      $("#alert").dialog("close");
      onConfirm();
    } else if (e.key == "escape") {
      $("#alert").dialog("close");
    }
  }

  $dialog.dialog({
    resizable: false,
    width: width,
    title: title,
    message: message,
    modal: true,
    buttons: {
      Remove: function (this: any) {
        $(this).dialog("close");
        onConfirm();
      },
      Cancel: function (this: any) {
        $(this).dialog("close");
      }
    },
    open: () => {$(document).on("keydown.removeConfirm", keyHandler);},
    close: () => {$(document).off("keydown.removeConfirm");}
  });
}

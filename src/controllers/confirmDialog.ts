export interface ConfirmDialogOptions {
  selector: string;
  title: string;
  width?: string;
  onConfirm: () => void;
}

// Expected usage: showConfirmDialog({this, "Remove SOMETHING", "22em", () => {}})

const NAMESPACE = "confirmDialog";

export function showConfirmDialog(opts: ConfirmDialogOptions): void {
  const {
    selector,
    title,
    width = "22em",
    onConfirm
  } = opts;
  
  const keyHandler = (e: JQuery.KeyDownEvent) => {
    if (e.key == "enter") {
      e.preventDefault();
      $(selector).dialog("close");
      onConfirm();
    } else if (key == "escape") {
      $(selector).dialog("close");
    }
  }

$dialog.dialog({
  resizable: false,
  width,
  title,
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

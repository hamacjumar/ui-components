
ui.script("editor-listview.js");

class Main extends App
{
    onStart() {

        ui.setTheme("dark");

        this.main = ui.addLayout("main", "Linear", "VCenter,FillXY");

        var list = [
            ["favorite", "Favorites", "My favorite items", "more_vert"],
            ["delete", "Trash", "My deleted items", "clear"],
            ["folder", "Folders", "My directories", "more_vert"],
            ["favorite", "Favorites", "My favorite items", "more_vert"],
            ["delete", "Trash", "My deleted items", "clear"],
            ["folder", "Folders", "My directories", "more_vert"]
        ];

        this.lst = ui.addEditorListView(this.main, list, "icon", 0.25, 0.8);
        this.lst.backColor = "black";
    }
}
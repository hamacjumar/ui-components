# Editor ListView

This is the listview use in DroidScript new Editor. See the live preview [here](https://hamacjumar.github.io/ui-components/editor-listview/index.html).

> As for the moment, this is only available in `"dark mode"`. Support for `"light mode"` is in the TODO list.

### How to use?

Copy `"editor-listview.js"` file in your project.

At the top of your `"main.js"` file, load the `"editor-listview.js"` script like this

```javascript
ui.script("path/to/editor-listview.js");
```

You can now start using editor-listview in your app layouts.

### Initialization

```javascript
ui.addEditorListView(lay, list, options, width, height);
```

| Param | Type | Description |
|--- | --- | --- |
| lay | *Layout* | The layout where to add the listview |
| list | *array* | The list items to display. See [List Array](#list-array) below for formatting |
| options | *options* | A comma separated options add styling and behavior for the listview. <br>`"icon"`: The leading item is a material icon font. <br>`"image"`: The leading item is a path to an image file. <br>`"divider"`: Add a divider in each item. <br>`"search"`: Add a search input to filter the list items. |
| width | *number* | Fraction of the parent width. Value can be `[0-1]`. You can also pass css value like `"50%"` or `"200px"` |
| height | *number* | Fraction of the parent height. Value can be `[0-1]`. You can also pass css value like `"50%"` or `"200px"` |

#### List Array

Each element in the list array is also an array. Below is the format of list array.

```javascript
[
    [leading1, title1, description1, action1, option1],
    [leading2, title2, description2, action2, option2],
    [leading3, title3, description3, action3, option3]
]
```

| Element | Type | Description |
|--- | --- | --- |
| leading | *string* | The leading item. Can be a `"material icon"` or a `"path/to/image"`|
| title | *string* | The title of the list |
| description | *string* | An optional body description for each item. |
| action | *string* | `"material icon"` |
| option | *string* | Available value is <br> `"noclick"`: Disable click for this item. |

## Examples
See the live preview [here](https://hamacjumar.github.io/ui-components/editor-listview/index.html).
```javascript
ui.script("../../editor-listview/editor-listview.js");

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
```
ui.addListView = function(parent, list, options, width, height) {
    return new ListView(parent, list, options, width, height);
}

ui.ListView = class extends ui.Control
{
    constructor(parent, list=[], options="", width=1, height) {
        super(parent, width, height, options, "ListView");
        this._list = list;
        this._style = {};
        this._initStyle();
        this._active = -1;
        this._render();
    }
    _initStyle() {
        if( this._height && this._height <= 1 && this._parent.leftPanel==true) {
            var h = Math.round(this._height * 100) + "%";
            this._div.style.height = "calc("+h+" - 36px)";
        }
        this._div.style.overflowY = "auto";
        this._div.style.flex = "0 0 auto";
        this._style.ul = {
            padding: 0,
            listStyle: "none",
            margin: 0,
            width: "100%"
        };
        this._style.li = {
            padding: 0,
            width: "100%"
        };
        if( this._options.includes("divider") ) this._style.li.borderBottom = "1px solid rgba(255,255,255,0.1)"
        this._style.buttonBase = {
            width: "100%",
            padding: this._options.includes("expanded") ? "8px 16px" : "8px 1px",
            display: "flex",
            alignItems: "center",
            margin: 0,
            boxSizing: "border-box"
        };
        this._style.img = {
            width: 18,
            color: "rgba(255,255,255,0.5)",
           	fontSize: 18
        };
        this._style.box = {
            display: "flex",
            flexDirection: "column",
            // width: "calc(100% - 40px)",
            width: "100%",
            padding: "0px 4px",
            boxSizing: "border-box",
            textAlign: "left"
        };
        this._style.title = {
            fontSize: 13,
            color: "white",
            width: "100%",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
        };
        this._style.body = {
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            width: "100%",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
        };
        this._style.action = {
            border: "none",
            fontSize: 14,
            borderRadius: "50%",
            height: 20,
            width: 20,
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }
    
    _onClick(i, e) {
        e.stopPropagation();
        if( this._myClick ) this._myClick( this._list[i], i, e);
        this._active = i;
        this._render();
    }
    _onClose(i, e) {
        e.stopPropagation();
        if( this._onAction ) this._onAction( this._list[i], i );
    }
    _onCtxMenu(i, e) {
        if( this._myCtxMenu ) {
            this._myCtxMenu( this._list[i], i, e);
            e = e || window.event;
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        }
    }
    
    _render() {
        if( !this._list.length ) {
            this._list = [ ["", this._emptyText||"Nothing to show..."] ];
        }
        let e = React.createElement;
        let { ButtonBase } = MaterialUI;
        this._ctl = e("ul", {
            style: { ...this._style.ul }
        }, this._list.map( (m, i) => {
            let icon, body, action;
            
            m[4] = m[4] || "";
            
            if( m[0] ) {
                if(this._options.includes("image")) {
                    if( !m[0].startsWith("/") ) m[0] = "/"+m[0];
					icon = e("img", {
                        key: 0,
                        src: m[0],
                        style: { ...this._style.img }
                    });
                }
                else {
                    icon = e("i", {
                        key: 0,
                        className: "material-icons",
                        style: { ...this._style.img }
                    }, m[0].toLowerCase());
                }
            }
            if( m[2] ) {
                body = e("span", {
                    key: 1,
                    style: { ...this._style.body }
                }, m[2])
            }
            if( m[3] ) {
                action = e( "span", {
                    key: 3,
                    onClick: this._onClose.bind(this, i),
                    className: "material-icons",
                    style: { ...this._style.action }
                }, m[3])
            }
            
            if( m[0] && m[3] ) this._style.box.width = "calc(100% - 40px)";
            else if( m[0] ) {
                this._style.box.width = "calc(100% - 20px)";
                this._style.box.paddingLeft = 4;
            }
            else if( m[3] ) {
                this._style.box.width = "calc(100% - 18px)";
                this._style.box.paddingLeft = 8;
            }
            else this._style.box.padding = "0px 8px";
            
            return e("li", {
                key: i,
                style: { ...this._style.li }
            }, e( ButtonBase, {
                style: {
                    ...this._style.buttonBase,
                    outline: this._active == i ? "1px solid rgba(130, 170, 255, 0.5)" : "",
                    backgroundColor: this._active == i ? "rgba(130, 170, 255, 0.075)" : "",
                },
                onClick: this._onClick.bind(this, i),
                onContextMenu: this._onCtxMenu.bind(this, i),
                disabled: m[4].includes("noclick")
            }, [
                (icon || null),
                e("span", {
                    key: 1,
                    style: { ... this._style.box }
                }, [
                    e("span", {
                        key: 0,
                        style: { ...this._style.title }
                    }, m[1]),
                    (body || null)
                ]),
                (action || null)
            ] ));
        }) );
        ReactDOM.render( this._ctl, this._div );
    }
    
    set list( list ) {
        this._active = -1;
        this._list = list;
        this._render();
    }
    get list() { return this._list; }
    set active( value ) {
        this._active = value;
        this._render();
    }
    get active() { return this._active; }
    set iconColor( color ) {
        this._style.img.color = color;
        this._render();
    }
    set emptyText( text ) {
        this._emptyText = text;
    }
    get emptyText() { return this._emptyText = text; }
    
    setOnTouch( callback ) {
        this._myClick = callback;
    }
    setOnAction( callback ) {
        this._onAction = callback;
    }
    
    setOnContextMenu( callback ) {
        this._myCtxMenu = callback;
    }
}
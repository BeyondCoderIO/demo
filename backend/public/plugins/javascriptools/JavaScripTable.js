/*
 * JavaScripTable version 2.2.5
 *
 * The JavaScripTable is a dynamic HTML table created with JavaScript.
 *
 * Dependencies: 
 *  - JavaScriptUtil.js
 *  - Parsers.js
 *
 * Author: Luis Fernando Planella Gonzalez (lfpg.dev at gmail dot com)
 * Home Page: http://javascriptools.sourceforge.net
 * 
 * JavaScripTools is distributed under the GNU Lesser General Public License (LGPL).
 * For more information, see http://www.gnu.org/licenses/lgpl-2.1.txt
 */
 
///////////////////////////////////////////////////////////////////////////////
/*
 * Constant declaration
 */
//Type constants
var JST_TYPE_STRING   = 0;
var JST_TYPE_NUMERIC  = 1;
var JST_TYPE_CURRENCY = 2;
var JST_TYPE_DATE     = 3;
var JST_TYPE_BOOLEAN  = 4;

//Selection constants
var JST_SEL_NONE   = "";
var JST_SEL_SINGLE = "radio";
var JST_SEL_MULTI  = "checkbox";
var JST_SEL_MULTIPLE  = JST_SEL_MULTI;

//Navigation bar constants
var JST_NAV_NONE   = 0;
var JST_NAV_TOP    = 1;
var JST_NAV_BOTTOM = 2;
var JST_NAV_BOTH   = 3;

//Align constants
var JST_ALIGN_LEFT    = "left";
var JST_ALIGN_RIGHT   = "right";
var JST_ALIGN_CENTER  = "center";
var JST_ALIGN_JUSTIFY = "justify";

//Vertical align constants
var JST_VALIGN_BASELINE    = "baseline";
var JST_VALIGN_SUB         = "sub";
var JST_VALIGN_SUPER       = "super";
var JST_VALIGN_TOP         = "top";
var JST_VALIGN_TEXT_TOP    = "text-top";
var JST_VALIGN_MIDDLE      = "middle";
var JST_VALIGN_BOTTOM      = "bottom";
var JST_VALIGN_TEXT_BOTTOM = "text-bottom";

//Edit control type constants
var JST_CONTROL_TEXT              = "text";
var JST_CONTROL_PASSWORD          = "password";
var JST_CONTROL_TEXTAREA          = "textarea";
var JST_CONTROL_CHECKBOX          = "checkbox";
var JST_CONTROL_RADIO             = "radio";
var JST_CONTROL_SELECT            = "select";
var JST_CONTROL_SELECT_MULTIPLE   = "select-multiple";

//Table client/server side constants
var JST_CLIENT_SIDE = 0;
var JST_SERVER_SIDE = 1;

//Table highlighting mode
var JST_HIGHLIGHTING_NONE          = "000";
var JST_HIGHLIGHTING_TEXT          = "001";
var JST_HIGHLIGHTING_CELL          = "010";
var JST_HIGHLIGHTING_TEXT_CELL     = "011";
var JST_HIGHLIGHTING_ROW           = "100";
var JST_HIGHLIGHTING_ROW_TEXT      = "101";
var JST_HIGHLIGHTING_ROW_CELL      = "110";
var JST_HIGHLIGHTING_ROW_TEXT_CELL = "111";

///////////////////////////////////////////////////////////////////////////////
// DEFAULT PROPERTY VALUES CONSTANTS
///////////////////////////////////////////////////////////////////////////////

//////////////   Basic behaviour constants
//Operation mode: client/server side
var JST_DEFAULT_OPERATION_MODE = JST_CLIENT_SIDE;
//Use paging?
var JST_DEFAULT_USE_PAGING = true;
//Page size
var JST_DEFAULT_PAGE_SIZE = 25;
//Maximum rows on the table
var JST_DEFAULT_MAX_ROWS = -1;
//Will select all select rows that are on every pages or only on current page?
var JST_DEFAULT_PAGE_ONLY_SELECT_ALL = false;

//////////////   Basic appearance constants
//Table width
var JST_DEFAULT_WIDTH = "";
//Table align
var JST_DEFAULT_ALIGN = "";
//Table border
var JST_DEFAULT_BORDER = "0";
//Table cellpadding
var JST_DEFAULT_PADDING = "1";
//Table cellspacing
var JST_DEFAULT_SPACING = "0";
//Show the column headers?
var JST_DEFAULT_SHOW_COLUMN_HEADERS = true;
//Crop repeated values?
var JST_DEFAULT_CROP_REPEATED = false;
//Crop repeated values like nodes?
var JST_DEFAULT_CROP_REPEATED_TREE = false;

//////////////   Highlitings constants
//The row highlighthing mode
var JST_DEFAULT_ROW_HIGHLIGHTING = JST_HIGHLIGHTING_ROW;
//The column header highlighting mode
var JST_DEFAULT_COLUMN_HEADER_HIGHLIGHTING = JST_HIGHLIGHTING_TEXT;

//////////////   Navigation bar constants
//Navigation bar location: top/bottom/both/none
var JST_DEFAULT_NAVIGATION = JST_NAV_BOTTOM;
//Allow the link to the table's top?
var JST_DEFAULT_ALLOW_TOP_LINK = false;
//Allow the user to change the paging style (paged results/all results)?
var JST_DEFAULT_ALLOW_CHANGE_PAGING = true;
//Allow the user to change the page size?
var JST_DEFAULT_ALLOW_CHANGE_PAGE_SIZE = true;

//////////////   Row selection constants
//Type of row selection (none/single/multiple)
var JST_DEFAULT_SELECTION_TYPE = JST_SEL_NONE;
//Selection control name (null will generate one)
var JST_DEFAULT_SELECTION_NAME = null;
//Selection control's cell's valign property
var JST_DEFAULT_SELECTION_VALIGN = JST_VALIGN_TOP;
//Multiple selection shows select all?
var JST_DEFAULT_SHOW_SELECT_ALL = true;

//////////////   Encoding separators constants
//Value separator
var JST_DEFAULT_VALUE_SEPARATOR = ",";
//Column separator
var JST_DEFAULT_COLUMN_SEPARATOR = ";";
//Row separator
var JST_DEFAULT_ROW_SEPARATOR = "\n";

//////////////   Style sheet classes constants
//Table class
var JST_DEFAULT_TABLE_CLASS = "JSTTable";
//Table header class
var JST_DEFAULT_HEADER_CLASS = "JSTHeader";
//Table footer class
var JST_DEFAULT_FOOTER_CLASS = "JSTFooter";
//Additional header class
var JST_DEFAULT_ADDITIONAL_HEADER_CLASS = "JSTColumnHeader";
//Additional footer class
var JST_DEFAULT_ADDITIONAL_FOOTER_CLASS = "JSTColumnHeader";
//Selection control class
var JST_DEFAULT_SELECTION_CONTROL_CLASS = "JSTSelectionControl";
//Edit control class (for text/password/textarea/select controls)
var JST_DEFAULT_EDIT_CONTROL_CLASS = "JSTEditControl";
//Edit control class on invalid user input
var JST_DEFAULT_INVALID_EDIT_CONTROL_CLASS = "JSTInvalidEditControl";
//Edit control class (for radio/checkbox control)
var JST_DEFAULT_EDIT_CONTROL_RADIO_CHECKBOX_CLASS = "JSTEditControlRadioCheckbox";
//Navigation bar class
var JST_DEFAULT_NAVIGATION_CLASS = "JSTNavigation";
//Navigation link class
var JST_DEFAULT_NAVIGATION_LINK_CLASS = "JSTNavigationLink";
//Highlighted navigation link class
var JST_DEFAULT_HIGHLIGHTED_NAVIGATION_LINK_CLASS = "JSTHighlightedNavigationLink";
//Column header class
var JST_DEFAULT_COLUMN_HEADER_CLASS = "JSTColumnHeader";
//Column header text class
var JST_DEFAULT_COLUMN_HEADER_TEXT_CLASS = "JSTColumnHeaderText";
//Highlighted column header class
var JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_CLASS = "JSTHighlightedColumnHeader";
//Highlighted column header text class
var JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_TEXT_CLASS = "JSTHighlightedColumnHeaderText";
//Odd row class
var JST_DEFAULT_ODD_ROW_CLASS = "JSTOddRow";
//Highlighted odd row class
var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CLASS = "JSTHighlightedOddRow";
//Odd row cell class
var JST_DEFAULT_ODD_ROW_CELL_CLASS = "JSTOddRowCell";
//Highlighted odd row cell class
var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CELL_CLASS = "JSTHighlightedOddRowCell";
//Odd row text class
var JST_DEFAULT_ODD_ROW_TEXT_CLASS = "JSTOddRowText";
//Odd row text with cellFunction class
var JST_DEFAULT_ODD_ROW_TEXT_WITH_FUNCTION_CLASS = "JSTOddRowTextWithFunction";
//Highlighted odd row text class
var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_CLASS = "JSTHighlightedOddRowText";
//Highlighted odd row text with cellFunction class
var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_WITH_FUNCTION_CLASS = "JSTHighlightedOddRowTextWithFunction";
//Even row class
var JST_DEFAULT_EVEN_ROW_CLASS = "JSTEvenRow";
//Highlighted even row class
var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CLASS = "JSTHighlightedEvenRow";
//Even row cell class
var JST_DEFAULT_EVEN_ROW_CELL_CLASS = "JSTEvenRowCell";
//Highlighted even row cell class
var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CELL_CLASS = "JSTHighlightedEvenRowCell";
//Even row text class
var JST_DEFAULT_EVEN_ROW_TEXT_CLASS = "JSTEvenRowText";
//Even row text with cellFunction class
var JST_DEFAULT_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS = "JSTEvenRowTextWithFunction";
//Highlighted even row text class
var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_CLASS = "JSTHighlightedEvenRowText";
//Highlighted even row text with cellFunction class
var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS = "JSTHighlightedEvenRowTextWithFunction";

//////////////   Table text constants
//Header text
var JST_DEFAULT_HEADER_TEXT = "";
//Footer text
var JST_DEFAULT_FOOTER_TEXT = "";
//Empty table text (when empty, show an empty table)
var JST_DEFAULT_EMPTY_TABLE_TEXT = "";
//Wait text
var JST_DEFAULT_WAIT_TEXT = "";
//Ascending Sort label
var JST_DEFAULT_ASC_LABEL = new Image(); JST_DEFAULT_ASC_LABEL.src = "images/asc.gif";
//Descending Sort label
var JST_DEFAULT_DESC_LABEL = new Image(); JST_DEFAULT_DESC_LABEL.src = "images/desc.gif";
//True label (showed for true values)
var JST_DEFAULT_TRUE_LABEL = new Image(); JST_DEFAULT_TRUE_LABEL.src = "images/true.gif";
//False label (showed for false values)
var JST_DEFAULT_FALSE_LABEL = new Image(); JST_DEFAULT_FALSE_LABEL.src = "images/false.gif";

//////////////   Messages constants
//Show messages on the status bar when true
var JST_DEFAULT_MESSAGES_ON_STATUS_BAR = false;
//Text for column sort
var JST_DEFAULT_SORT_MESSAGE = "Click here to sort by this column";
//Text displayed for a single row
var JST_DEFAULT_SINGLE_ROW_TEXT = "row";
//Text displayed for a multiple row
var JST_DEFAULT_MULTIPLE_ROW_TEXT = "rows";
//Text for paged results. Use the variables: ${current} = current page, ${total} = total pages
var JST_DEFAULT_PAGE_TEXT = "Page ${current} of ${total}";
//Status bar text for the first page link
var JST_DEFAULT_FIRST_PAGE_DESCRIPTION = "Click here to navigate to the first page";
//Text for the first page link
var JST_DEFAULT_FIRST_PAGE_TEXT = "<img src=\"images/first.gif\" border=\"0\">";
//Status bar text for the previous page link
var JST_DEFAULT_PREVIOUS_PAGE_DESCRIPTION = "Click here to navigate to the previous page";
//Text for the previous page link
var JST_DEFAULT_PREVIOUS_PAGE_TEXT = "<img src=\"images/prev.gif\" border=\"0\">";
//Status bar text for the next page link
var JST_DEFAULT_NEXT_PAGE_DESCRIPTION = "Click here to navigate to the next page";
//Text for the next page link
var JST_DEFAULT_NEXT_PAGE_TEXT = "<img src=\"images/next.gif\" border=\"0\">";
//Status bar text for the last page link
var JST_DEFAULT_LAST_PAGE_DESCRIPTION = "Click here to navigate to the last page";
//Text for the next last link
var JST_DEFAULT_LAST_PAGE_TEXT = "<img src=\"images/last.gif\" border=\"0\">";
//Status bar text for the show all rows link
var JST_DEFAULT_SHOW_ALL_DESCRIPTION = "Click here to show all rows";
//Text for the show all rows link
var JST_DEFAULT_SHOW_ALL_TEXT = "[show all]";
//Status bar text for the use paged results link
var JST_DEFAULT_USE_PAGING_DESCRIPTION = "Click here to show paged rows";
//Text for the use paged results link
var JST_DEFAULT_USE_PAGING_TEXT = "[show paged]";
//Status bar text for the go to table top link
var JST_DEFAULT_TOP_DESCRIPTION = "Click here to go to the table top";
//Text for the go to table top link
var JST_DEFAULT_TOP_TEXT = "[top]";
//Status bar text for the change page link
var JST_DEFAULT_CHANGE_PAGE_DESCRIPTION = "Click here to change the current page";
//Text prompted on the change page dialog
var JST_DEFAULT_CHANGE_PAGE_PROMPT = "Navigate to wich page?";
//Status bar text for the change page size link
var JST_DEFAULT_CHANGE_PAGE_SIZE_DESCRIPTION = "Click here to change the page size";
//Text prompted on the change page size dialog
var JST_DEFAULT_CHANGE_PAGE_SIZE_PROMPT = "How many rows per page?";

//////////////   Default parsers constants
//Parser for string inputs
var JST_DEFAULT_STRING_PARSER = new StringParser();
//Parser for number inputs
var JST_DEFAULT_NUMBER_PARSER = new NumberParser(-1);
//Parser for currency inputs
var JST_DEFAULT_CURRENCY_PARSER = new NumberParser(2, ",", ".", true, "R$", true, true);
//Parser for date inputs
var JST_DEFAULT_DATE_PARSER = new DateParser("dd/MM/yyyy");
//Parser for boolean inputs
var JST_DEFAULT_BOOLEAN_PARSER = new BooleanParser(JST_DEFAULT_TRUE_LABEL, JST_DEFAULT_FALSE_LABEL);
//Parser for string encoding
var JST_DEFAULT_STRING_ENCODING_PARSER = new EscapeParser();
//Parser for number encoding
var JST_DEFAULT_NUMBER_ENCODING_PARSER = new NumberParser(-1, ".", ",", false, "$", false, false);
//Parser for currency encoding
var JST_DEFAULT_CURRENCY_ENCODING_PARSER = new NumberParser(-1, ".", ",", false, "$", false, false);
//Parser for date encoding
var JST_DEFAULT_DATE_ENCODING_PARSER = new DateParser("yyyyMMdd");
//Parser for boolean encoding
var JST_DEFAULT_BOOLEAN_ENCODING_PARSER = new BooleanParser("true", "false");

//Global access to cached instances of JavaScripTables
var _jstCache_ = {};

///////////////////////////////////////////////////////////////////////////////
/*
 * This is the main class.
 * Parameters: 
 *    id: The name of the variable the table will be assigned to.
 *       A property with this name will be created in the container.
 *    container: The reference to the container object where the 
 *       table will be drawed in. A valid container is an HTML Element
 *       that supports nested elements (DIV, TD and so on)
 */
function JavaScripTable(id, container, width, align, border, padding, spacing) {

    //Property declarations
    this.columns = [];
    this.rows = [];
    this.rowIndex = {};
    this.rowBreaks = [];
    this.width = width || JST_DEFAULT_WIDTH;
    this.align = align || JST_DEFAULT_ALIGN;
    this.border = border || JST_DEFAULT_BORDER;
    this.padding = padding || JST_DEFAULT_PADDING;
    this.spacing = spacing || JST_DEFAULT_SPACING;
    this.sortColumn = -1;
    this.ascSort = true;
    this.usePaging = JST_DEFAULT_USE_PAGING;
    this.pageSize = JST_DEFAULT_PAGE_SIZE;
    this.currentPage = 1;
    this.rowFunction = null;
    this.printing = false;
    this.maxRows = JST_DEFAULT_MAX_ROWS;
    this.showColumnHeaders = JST_DEFAULT_SHOW_COLUMN_HEADERS;
    this.mapperClassName = null;
    this.mapperConstructorArguments = null;
    this.identifierName = null;
    this.objectRowMapper = null;
    this.cropRepeated = JST_DEFAULT_CROP_REPEATED;
    this.cropRepeatedTree = JST_DEFAULT_CROP_REPEATED_TREE;
    
    //Highlightings
    this.rowHighlighting = JST_DEFAULT_ROW_HIGHLIGHTING;
    this.columnHeaderHighlighting = JST_DEFAULT_COLUMN_HEADER_HIGHLIGHTING;

    //Navigation properties
    this.operationMode = JST_DEFAULT_OPERATION_MODE;
    this.updateTableFunction = function () {alert("The callback for table update events was not defined")};
    this.rowCount = 0;
    this.navigation = JST_DEFAULT_NAVIGATION;
    this.allowTopLink = JST_DEFAULT_ALLOW_TOP_LINK;
    this.allowChangePaging = JST_DEFAULT_ALLOW_CHANGE_PAGING;
    this.allowChangePageSize = JST_DEFAULT_ALLOW_CHANGE_PAGE_SIZE;
    
    //Callbacks
    this.onSelectionChange = null;
    this.onRender = null;
    
    //Selection properties
    this.selectionType = JST_DEFAULT_SELECTION_TYPE;
    this.selectionName = JST_DEFAULT_SELECTION_NAME;
    this.selectionValign = JST_DEFAULT_SELECTION_VALIGN;
    this.pageOnlySelectAll = JST_DEFAULT_PAGE_ONLY_SELECT_ALL;
    this.showSelectAll = JST_DEFAULT_SHOW_SELECT_ALL;
        
    //Separators
    this.valueSeparator = JST_DEFAULT_VALUE_SEPARATOR;
    this.columnSeparator = JST_DEFAULT_COLUMN_SEPARATOR;
    this.rowSeparator = JST_DEFAULT_ROW_SEPARATOR;

    //StyleSheet classes for the elements
    this.tableClass = JST_DEFAULT_TABLE_CLASS;
    this.headerClass = JST_DEFAULT_HEADER_CLASS;
    this.footerClass = JST_DEFAULT_FOOTER_CLASS;
    this.additionalHeaderClass = JST_DEFAULT_ADDITIONAL_HEADER_CLASS;
    this.additionalFooterClass = JST_DEFAULT_ADDITIONAL_FOOTER_CLASS;
    this.selectionControlClass = JST_DEFAULT_SELECTION_CONTROL_CLASS;
    this.editControlClass = JST_DEFAULT_EDIT_CONTROL_CLASS;
    this.invalidEditControlClass = JST_DEFAULT_INVALID_EDIT_CONTROL_CLASS;
    this.editControlRadioCheckboxClass = JST_DEFAULT_EDIT_CONTROL_RADIO_CHECKBOX_CLASS;
    this.navigationClass = JST_DEFAULT_NAVIGATION_CLASS;
    this.navigationLinkClass = JST_DEFAULT_NAVIGATION_LINK_CLASS;
    this.highlightedNavigationLinkClass = JST_DEFAULT_HIGHLIGHTED_NAVIGATION_LINK_CLASS;
    this.columnHeaderClass = JST_DEFAULT_COLUMN_HEADER_CLASS;
    this.columnHeaderTextClass = JST_DEFAULT_COLUMN_HEADER_TEXT_CLASS;
    this.highlightedColumnHeaderClass = JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_CLASS;
    this.highlightedColumnHeaderTextClass = JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_TEXT_CLASS;
    this.oddRowClass = JST_DEFAULT_ODD_ROW_CLASS;
    this.highlightedOddRowClass = JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CLASS;
    this.oddRowCellClass = JST_DEFAULT_ODD_ROW_CELL_CLASS;
    this.highlightedOddRowCellClass = JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CELL_CLASS;
    this.oddRowTextClass = JST_DEFAULT_ODD_ROW_TEXT_CLASS;
    this.oddRowTextWithFunctionClass = JST_DEFAULT_ODD_ROW_TEXT_WITH_FUNCTION_CLASS;
    this.highlightedOddRowTextClass = JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_CLASS;
    this.highlightedOddRowTextWithFunctionClass = JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_WITH_FUNCTION_CLASS;
    this.evenRowClass = JST_DEFAULT_EVEN_ROW_CLASS;
    this.highlightedEvenRowClass = JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CLASS;
    this.evenRowCellClass = JST_DEFAULT_EVEN_ROW_CELL_CLASS;
    this.highlightedEvenRowCellClass = JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CELL_CLASS;
    this.evenRowTextClass = JST_DEFAULT_EVEN_ROW_TEXT_CLASS;
    this.evenRowTextWithFunctionClass = JST_DEFAULT_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS;
    this.highlightedEvenRowTextClass = JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_CLASS;
    this.highlightedEvenRowTextWithFunctionClass = JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS;
    
    //Table's texts
    this.headerText = JST_DEFAULT_HEADER_TEXT;
    this.footerText = JST_DEFAULT_FOOTER_TEXT;
    this.emptyTableText = JST_DEFAULT_EMPTY_TABLE_TEXT;
    this.waitText = JST_DEFAULT_WAIT_TEXT;
    
    //Additional Header and footer
    this.headers = [];
    this.footers = [];
    
    //Table's labels
    this.ascLabel = JST_DEFAULT_ASC_LABEL;
    this.descLabel = JST_DEFAULT_DESC_LABEL;
    this.trueLabel = JST_DEFAULT_TRUE_LABEL;
    this.falseLabel = JST_DEFAULT_FALSE_LABEL;

    //Messages
    this.invalidTableIdMessage = "The id must be set";
    this.invalidTableContainerMessage = "The container object must be set, and must contain the innerHTML property";
    this.tableNotInitializedMessage = "The JavaScripTable was not correctly initialized";
    this.columnAddWithRowsMessage = "A column cannot be added to the table if it already contains rows";
    this.invalidColumnMessage = "The specified column is invalid";
    this.invalidRowMessage = "The specified row is invalid";
    this.invalidRowIdMessage = "The row's identifier must be informed";
    this.rowIdAlreadyInUseMessage = "The row's identifier is already in use";

    this.messagesOnStatusBar = JST_DEFAULT_MESSAGES_ON_STATUS_BAR;
    this.sortMessage = JST_DEFAULT_SORT_MESSAGE;
    this.singleRowText = JST_DEFAULT_SINGLE_ROW_TEXT;
    this.multipleRowText = JST_DEFAULT_MULTIPLE_ROW_TEXT;
    this.pageText = JST_DEFAULT_PAGE_TEXT; //Use the variables: ${current} = current page, ${total} = total pages
    this.firstPageDescription = JST_DEFAULT_FIRST_PAGE_DESCRIPTION;
    this.firstPageText = JST_DEFAULT_FIRST_PAGE_TEXT;
    this.previousPageDescription = JST_DEFAULT_PREVIOUS_PAGE_DESCRIPTION;
    this.previousPageText = JST_DEFAULT_PREVIOUS_PAGE_TEXT;
    this.nextPageDescription = JST_DEFAULT_NEXT_PAGE_DESCRIPTION;
    this.nextPageText = JST_DEFAULT_NEXT_PAGE_TEXT;
    this.lastPageDescription = JST_DEFAULT_LAST_PAGE_DESCRIPTION;
    this.lastPageText = JST_DEFAULT_LAST_PAGE_TEXT;
    this.showAllDescription = JST_DEFAULT_SHOW_ALL_DESCRIPTION;
    this.showAllText = JST_DEFAULT_SHOW_ALL_TEXT;
    this.usePagingDescription = JST_DEFAULT_USE_PAGING_DESCRIPTION;
    this.usePagingText = JST_DEFAULT_USE_PAGING_TEXT;
    this.topDescription = JST_DEFAULT_TOP_DESCRIPTION;
    this.topText = JST_DEFAULT_TOP_TEXT;
    this.changePageDescription = JST_DEFAULT_CHANGE_PAGE_DESCRIPTION;
    this.changePagePrompt = JST_DEFAULT_CHANGE_PAGE_PROMPT;
    this.changePageSizeDescription = JST_DEFAULT_CHANGE_PAGE_SIZE_DESCRIPTION;
    this.changePageSizePrompt = JST_DEFAULT_CHANGE_PAGE_SIZE_PROMPT;

    //Parsers for data entry
    this.stringParser   = JST_DEFAULT_STRING_PARSER;
    this.numberParser   = JST_DEFAULT_NUMBER_PARSER;
    this.currencyParser = JST_DEFAULT_CURRENCY_PARSER;
    this.dateParser     = JST_DEFAULT_DATE_PARSER;
    this.booleanParser  = JST_DEFAULT_BOOLEAN_PARSER;
    
    //Parsers for data encoding
    this.stringEncodingParser   = JST_DEFAULT_STRING_ENCODING_PARSER;
    this.numberEncodingParser   = JST_DEFAULT_NUMBER_ENCODING_PARSER;
    this.currencyEncodingParser = JST_DEFAULT_CURRENCY_ENCODING_PARSER;
    this.dateEncodingParser     = JST_DEFAULT_DATE_ENCODING_PARSER;
    this.booleanEncodingParser  = JST_DEFAULT_BOOLEAN_ENCODING_PARSER;
    
    //Initializes the table
    var valid = true;
    if (id == null || id == "") {
        alert(this.invalidTableIdMessage);
        valid = false;
    }
    if (isInstance(container, String)) {
        container = getObject(container);
    }
    if (container == null || container.innerHTML == null) {
        alert(this.invalidTableContainerMessage);
        valid = false;
    }
    this.id = escapeCharacters(id);
    this.container = container;
    this.form = null;
    
    //Create an property on the top frame for later calling the table
    _jstCache_["" + this.id] = this;
    
    /*
     * Adds the specified column to the table
     */
    this.addColumn = function(column) {
        if (this.rows.length > 0) {
            alert(this.columnAddWithRowsMessage);
            return;
        }
        //If the column is a String, use it as title
        if (isInstance(column, String)) {
            column = new Column(column);
        }
        //Validate the column instance
        if (!(isInstance(column, Column))) {
            alert(this.invalidColumnMessage);
            return;
        }
        column.index = this.columns.length;
        column.table = this;
        if (column.watch) {
            column.watch("index", function (prop, oldVal, newVal) { return oldVal; });
            column.watch("table", function (prop, oldVal, newVal) { return oldVal; });
        }
        this.columns[this.columns.length] = column;
        this.objectRowMapper = null;
        return column;
    }
    
    /*
     * Removes the column specified by the index
     */
    this.removeColumn = function(index) {
        var ret = this.columns[index];
        this.columns.splice(index, 1);
        this.objectRowMapper = null;
        return ret;
    }
    
    /*
     * Removes all columns from the table
     */
    this.removeAllColumns = function() {
        var ret = this.columns;
        this.columns = new Array();
        this.objectRowMapper = null;
        return ret;
    }
    
    /*
     * Returns the number of columns in the table
     */
    this.getColumnCount = function() {
        return this.columns.length;
    }
    
    /*
     * Returns the column speficied by the index
     */
    this.getColumnByIndex = function(index) {
        return this.columns[index];
    }

    /*
     * Returns the current sort column
     */
    this.getSortColumn = function() {
        return this.sortColumn >= 0 ? this.getColumnByIndex(this.sortColumn) : null;
    }

    /*
     * Returns all the columns
     */
    this.getAllColumns = function() {
        return this.columns;
    }

    /*
     * Returns all the visible columns
     */
    this.getVisibleColumns = function() {
        var ret = new Array();
        for (var i = 0; i < this.columns.length; i++) {
            column = this.columns[i];
            if (column.visible) {
                ret[ret.length] = column;
            }
        }
        return ret;
    }

    /*
     * Returns all the visible columns
     */
    this.getVisibleColumnsArray = function() {
        var array = new Array();
        var row = new Array();
        for (var i = 0; i < this.columns.length; i++) {
            column = this.columns[i];
            if (column.visible) {
                row[row.length] = column;
            }
            if (inArray(column.index, this.rowBreaks)) {
                if (row.length > 0) {
                    array[array.length] = row;
                    row = new Array();
                }
            }
        }
        if (row.length > 0) {
            array[array.length] = row;
        }
        return array;
    }
    
    /** 
     * Adds an additional header cell container, returning it. 
     * Arguments will be delegated to the cell container constructor 
     */
    this.addHeader = function() {
        var cells = new JavaScripTableCellContainer();
        JavaScripTableCellContainer.apply(cells, arguments);
        this.headers[this.headers.length] = cells;
        return cells;
    }
    
    /** 
     * Returns the number of additional headers 
     */
    this.getHeaderCount = function() {
        return this.headers.length;
    }
    
    /** 
     * Returns the header with the given index 
     */
    this.getHeader = function(index) {
        return this.headers[index];
    }
    
    /** 
     * Removes all additional headers 
     */
    this.clearHeaders = function() {
        this.headers = [];
    }
    
    /** 
     * Adds an additional footer cell container, returning it. 
     * Arguments will be delegated to the cell container constructor 
     */
    this.addFooter = function() {
        var cells = new JavaScripTableCellContainer();
        JavaScripTableCellContainer.apply(cells, arguments);
        this.footers[this.footers.length] = cells;
        return cells;
    }
    
    /** 
     * Returns the number of additional footers 
     */
    this.getFooterCount = function() {
        return this.footers.length;
    }
    
    /** 
     * Returns the footer with the given index 
     */
    this.getFooter = function(index) {
        return this.footers[index];
    }
    
    /** 
     * Removes all additional footers 
     */
    this.clearFooters = function() {
        this.footers = [];
    }
    
    /**
     * Sets the line break at the specified column. 
     * If no column is specified, use the break before the last one.
     * If no flag is specified, use true.
     */
    this.setRowBreak = function(columnIndex, flag) {
        if (!isInstance(columnIndex, Number)) {
            if (this.columns.length == 0) {
                return;
            }
            columnIndex = this.columns.length - 1;
        }
        flag = flag || true;
        var contains = inArray(columnIndex, this.rowBreaks);
        if (flag && !contains) {
            this.rowBreaks[this.rowBreaks.length] = columnIndex;
        } else if (!flag && contains) {
            this.rowBreaks = removeFromArray(this.rowBreaks, columnIndex);
        }
    }
    
    /**
     * Returns if the specified column has a row break. 
     */
    this.isRowBreak = function (columnIndex) {
        if (!isInstance(columnIndex, Number)) {
            return false;
        }
        return inArray(this.rowBreaks, columnIndex);
    }
    
    //Private - Return the row indexed by the given id, or null if none found
    this.findIndexedRow = function(id) {
        var index = this.rowIndex["" + id];
        return index || null;
    }
    
    //Private - Adds a row to the index
    this.addRowToIndex = function(row, index) {
        var array = [row, index]
        this.rowIndex["" + row.id] = array;
        return array;
    }
    
    //Private - Replaces a row on the index
    this.replaceRowOnIndex = function(row) {
        var array = this.findIndexedRow(row.id);
        if (array) {
            array[0] = row;
        }
        return array;
    }
    
    //Private - Removes a row from the index
    this.removeRowFromIndexById = function(rowId) {
        delete this.rowIndex["" + rowId];
    }
    
    //Private - Rebuild the row index
    this.rebuildRowIndex = function() {
        this.rowIndex = [];
        for (var i = 0, len = this.rows.length; i < len; i++) {
            this.addRowToIndex(this.rows[i], i);
        }
    }
    
    /*
     * Prepare a row for the table
     */
    this.prepareRow = function(row) {
        //Convert the object to row if not already a row instance
        if (!isInstance(row, Row)) {
            var mapper = this.getObjectRowMapper();
            if (mapper != null) {
                row = mapper.toRow(row);
            }
        }
        //Validate the row
        if (!isInstance(row, Row)) {
            alert(this.invalidRowMessage);
            return null;
        }
        if (row.id == null) {
            alert(this.invalidRowIdMessage);
            return null;
        }
        //Ensures the values size will be, at least, the columns' size
        while (row.values.length < this.columns.length) {
            row.values[row.values.length] = null;
        }
        //Ensures the possibleValues length to be correct
        while (row.possibleValues.length < row.values.length) {
            row.possibleValues[row.possibleValues.length] = null;
        }
        //Ensures the titles length to be correct
        while (row.titles.length < row.values.length) {
            row.titles[row.titles.length] = null;
        }
        row.table = this;
        //Parse data if not of the expected type
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (column.type != JST_TYPE_STRING && isInstance(row.values[i], String)) {
                row.values[i] = column.getParser(row).parse(row.values[i], row, column);
            }
        }
        return row;
    }
    
    /*
     * Adds the specified row. If refresh is set to true, re-renders the table
     */
    this.addRow = function(row, refresh) {
        //Check if the maximum number of rows was already reached
        if ((this.maxRows >= 0) && (this.rows.length >= this.maxRows)) {
            return;
        }
        
        //Prepare the row for the table
        row = this.prepareRow(row);
        if (row == null) {
            return;
        }
        if (this.getRowById(row.id) != null) {
            alert(this.rowIdAlreadyInUseMessage);
            return null;
        }
        
        //Add the row
        var index = this.rows.length;
        this.rows[index] = row;
        this.addRowToIndex(row, index);
        
        //Refresh the table if needed
        if (booleanValue(refresh)) {
            this.render();
        }
        return row;
    }
    
    /**
     * Updates the specified row. If the row does not exist on the table, it's not modified.
     * If refresh is set to true, re-renders the table
     */
    this.updateRow = function(row, refresh) {
        //Prepare the row for the table
        row = this.prepareRow(row);
        if (row == null) {
            return;
        }
        
        //Update the row
        var index = this.replaceRowOnIndex(row);
        if (index) {
            this.rows[index[1]] = row;
        }

        //Refresh the table if needed
        if (booleanValue(refresh)) {
            this.render();
        }
        return row;
    }
    
    /*
     * Removes the row specified by it's id. If refresh is set to true, re-renders the table
     */
    this.removeRowById = function(id, refresh) {
        var ret = null;

        var index = this.removeRowFromIndexById(id);
        if (index) {
            this.rows.splice(index[1], 1);
        }
                
        //Refresh the table if needed
        if (booleanValue(refresh)) {
            this.render();
        }

        return ret;
    }
    
    /*
     * Removes selected rows from the table. If refresh is set to true, re-renders the table
     */
    this.removeSelectedRows = function(refresh) {
        var ret = new Array();
        
        //Search the selected rows
        var i = 0;
        while (i < this.rows.length) {
            var row = this.rows[i];
            if (row.selected) {
                ret[ret.length] = row;
                this.rows.splice(i, 1);
                this.removeRowFromIndexById(row.id);
            } else {
                i++;
            }
        }
        
        //Refresh the table if needed
        if (booleanValue(refresh)) {
            this.render();
        }

        //Return the deleted rows
        return ret;
    }
    
    /*
     * Removes all rows from the table. If refresh is set to true, re-renders the table
     */
    this.removeAllRows = function(refresh) {
        var ret = this.rows;
        this.rows = [];
        this.rowIndex = {};
        
        //Refresh the table if needed
        if (booleanValue(refresh)) {
            this.render();
        }

        return ret;
    }
    
    /*
     * Returns all the rows
     */
    this.getAllRows = function() {
        return this.rows;
    }
    
    /*
     * Returns all the rows converted into objects
     */
    this.getAllRowsAsObjects = function() {
        return this.rowArrayToObjectArray(this.getAllRows());
    }
    
    /*
     * Convert a row array to an object array
     */
    this.rowArrayToObjectArray = function(rows) {
        var mapper = this.getObjectRowMapper();
        if (mapper == null) {
            return rows;
        }
        var objects = new Array();
        for (var i = 0; i < rows.length; i++) {
            objects[i] = mapper.toObject(rows[i]);
        }
        return objects;
    }
    
    /*
     * Returns the all the row identifiers
     */
    this.getAllRowIds = function() {
        var ret = new Array();
        for (var i = 0; i < this.rows.length; i++) {
            row = this.rows[i];
            ret[ret.length] = row.id;
        }
        return ret;
    }

    /*
     * Returns all the selected rows
     */
    this.getSelectedRows = function() {
        var ret = new Array();
        for (var i = 0; i < this.rows.length; i++) {
            row = this.rows[i];
            if (row.selected) {
                ret[ret.length] = row;
            }
        }
        return ret;
    }
    
    /*
     * Returns all selected rows converted into objects
     */
    this.getSelectedRowsAsObjects = function() {
        return this.rowArrayToObjectArray(this.getSelectedRows());
    }
    
    /*
     * Returns the identifiers of the selected rows
     */
    this.getSelectedRowIds = function() {
        var ret = new Array();
        for (var i = 0; i < this.rows.length; i++) {
            row = this.rows[i];
            if (row.selected) {
                ret[ret.length] = row.id;
            }
        }
        return ret;
    }
    
    /*
     * Returns the selected row count
     */
    this.getSelectedRowCount = function() {
        return this.getSelectedRows().length;
    }
    
    /*
     * Returns the row with the given identifier
     */
    this.getRowById = function(id) {
        var ret = null;
        var index = this.findIndexedRow(id);
        if (index) {
            ret = index[0];
        }
        return ret;
    }

    /*
     * Returns the row with the given identifier as an object
     */
    this.getRowByIdAsObject = function(id) {
        var row = this.getRowById(id);
        if (row == null) {
            return null;
        }
        return this.rowArrayToObjectArray([row])[0];
    }
    
    /*
     * Gets the value of the cell from the row with the given id and 
     * the specified column index
     */
    this.getCellValue = function(rowId, colIndex) {
        var row = this.getRowById(rowId);
        return row.values[colIndex];
    }
    
    /*
     * Gets the formatted value of the cell from the row with the given id and 
     * the specified column index
     */
    this.getFormattedCellValue = function(rowId, colIndex) {
        var column = this.getColumnByIndex(colIndex);
        if (column == null) {
            alert(this.invalidColumnMessage);
            return null;
        }
        var row = this.getRowById(rowId);
        if (row == null) {
            alert(this.invalidRowIdMessage);
            return null;
        }
        return column.getParser(row).format(this.getCellValue(row.id, column.index), row, column);
    }
    
    /*
     * Sets the value of the cell from the row with the given id and 
     * the specified column index. If refresh is set to true, re-renders the table
     */
    this.setCellValue = function(rowId, colIndex, value, refresh) {
        var row = this.getRowById(rowId);
        row.values[colIndex] = value;
        cellEditor = row.editors[colIndex];
        if (cellEditor != null) {
            setValue(cellEditor, value);
        }
            
        //Refresh the table if needed
        if (booleanValue(refresh)) {
            this.render();
        }
    }
    
    /*
     * Sets the formatted value of the cell from the row with the given id and 
     * the specified column index. If refresh is set to true, re-renders the table
     */
    this.setFormattedCellValue = function(rowId, colIndex, value, refresh) {
        var column = this.getColumnByIndex(colIndex);
        if (column == null) {
            alert(this.invalidColumnMessage);
            return null;
        }
        var row = this.getRowById(rowId);
        if (row == null) {
            alert(this.invalidRowIdMessage);
            return null;
        }
        value = column.getParser(row).parse(value, row, column);
        this.setCellValue(row.id, column.index, value, refresh);
    }
    
    /*
     * Encodes the data into a String. The data may be an Array or not, of
     * rows or single data. Rows are encoded by their encode() method.
     * Other data type is used directly. Each row or data is separated by the
     * String contained in table's rowSeparator property.
     * When the data is a row or an Array of rows, the columns parameter can be
     * set as an Array of integers, indicating wich columns will be processed.
     * The row identifier is always encoded, unless the encodeRowId parameter is
     * set to false
     */
    this.encode = function(data, columns, encodeRowId) {
        
        columns = columns || null;
        encodeRowId = encodeRowId || true;
        
        //If nothing was informed, encode all table data
        if (data == null) {
            data = this.getAllRows();
        }
        
        //If something was informed, assume an array
        if (!isInstance(data, Array)) {
            data = [data];
        }
        var temp = new Array();

        //Encode each array item
        for (var i = 0; i < data.length; i++) {
            var current = data[i];
            temp[i] = escapeCharacters(((isInstance(current, Row)) ? current.encode(columns, encodeRowId) : current), this.rowSeparator, true);
        }
        
        //Return the single string
        return temp.join(this.rowSeparator);
    }

    /*
     * Sets the current page, re-rendering the table
     */
    this.setPage = function(page) {
        if (this.pageOnlySelectAll) {
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].selected = false;
            }
        }
        this.currentPage = page;
        this.update();
    }

    /*
     * Sets if the table will use paging, re-rendering it
     */
    this.setUsePaging = function(flag) {
        if (this.pageOnlySelectAll) {
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].selected = false;
            }
        }
        this.usePaging = flag;
        this.update();
    }
    
    /*
     * Sets the sort for the specified column
     */
    this.setSort = function(column, asc) {
        if (column == this.sortColumn) {
            if (asc == null) {
                this.ascSort = !this.ascSort;
            } else {
                this.ascSort = booleanValue(asc);
            }
        } else {
            this.sortColumn = column;
            this.ascSort = (asc == null ? true : booleanValue(asc));
        }
        
        //Sorts the array
        this.rows.sort(this.sort);
        this.rebuildRowIndex();
        this.update();
    }
    
    /*
     * Sets the selection for all rows
     */
    this.selectAll = function(flag) {
        var firstRow, lastRow;
        if (this.pageOnlySelectAll) {
            if (this.operationMode == JST_CLIENT_SIDE) {
                firstRow = Math.max(this.pageSize * (this.currentPage-1), 0);
                lastRow = Math.min(firstRow + this.pageSize, this.rows.length);
            } else {
                firstRow = 0;
                lastRow = Math.min(this.rows.length, this.pageSize);
            }
        } else {
            firstRow = 0;
            lastRow = this.rows.length;
        }
        for (var i = firstRow; i < lastRow; i++) {
           var row = this.rows[i];
           this.setSelection(row.id, flag);
        }
    }
        
    /*
     * Sets the selection for the specified row
     */
    this.setSelection = function(rowId, flag) {
        //If is single selection, deselect all other rows
        if (this.selectionType == JST_SEL_SINGLE) {
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].selected = false;
            }
        }
        //Select the specified row
        var row = this.getRowById(rowId);
        if (row) {
            row.selected = flag;
            //Update the form control, if any
            var selection = getObject(this.getSelectionName() + rowId);
            if (selection != null) {
                selection.checked = flag;
            }
        }
    }
    
    /*
     * Sets the selection for the specified row
     */
    this.fireSelection = function(rowId, flag) {
        if (this.getRowById(rowId).selected == flag) {
            //No change
            return;
        }
        if (typeof(this.onSelectionChange) == 'function') {
            if (this.onSelectionChange(rowId, flag, this) == false) {
                return;
            }
        }
        this.setSelection(rowId, flag);
    }

    /*
     * Returns the external table variable
     */
    this.getTableVar = function() {
        return "_jstCache_['" + this.id + "']";
    }

    /*
     * Returns the name of the variable representing the selection
     */
    this.getSelectionName = function() {
        return this.selectionName != null ? this.selectionName : "selection_" + this.id;
    }

    /*
     * Returns the name of the edit control for the row / column
     */
    this.getControlName = function(row, column) {
        var isRadioCheckbox = inArray(column.editControl.type, [JST_CONTROL_RADIO, JST_CONTROL_CHECKBOX]);
        if (column.editControl != null && column.editControl.name != null) {
            var name = column.editControl.name;
            if (isRadioCheckbox) {
                name += "_" + row.id;
            }
            return name;
        } else {
            return "edit_" + this.id + (isRadioCheckbox ? "_" + row.id : "") +  "_" + column.index;
        }
    }

    /*
     * Returns the name of the edit control for the row x column
     */
    this.getControlId = function(row, column) {
        return "id_edit_" + this.id + "_" + row.id + "_" + column.index;
    }

    //Checks for a valid input
    function validateValue(value, stringValue, row, column) {
        if (column.allowEmptyValue && isEmpty(stringValue)) {
            return [true, null];
        }
        var parser = column.getParser(row);
        var valid = parser.isValid(stringValue);
        var validateMessage = null;
        if (valid && column.validateFunction != null) {
            var ret = column.validateFunction(value, column, row);
            if (ret == null) {
                //nothing returned
                valid = true;
            } else if ((ret == true) || (ret == false)) {
                //ret is the validation flag
                valid = ret;
            } else {
                //ret is a validation message
                validateMessage = ret;
                valid = false;
            }
        }
        return [valid, validateMessage];
    }

    /*
     * Updates the value from the edit control for the row x column
     */
    this.updateValue = function(rowId, columnIndex) {
        var column = this.getColumnByIndex(columnIndex);
        var row = this.getRowById(rowId)
        var parser = column.getParser(row);
        var valid;
        var value;
        var targetControls;
        var isRadioCheckbox = inArray(column.editControl.type, [JST_CONTROL_RADIO, JST_CONTROL_CHECKBOX]);
        //Checkboxes and radios must be handled separatedly
        if (isRadioCheckbox) {
            var controls = getObject(this.getControlName(row, column));
            targetControls = controls;
            var stringValues = getValue(controls);
            if (stringValues == null) {
                stringValues = [];
            } else if (!isInstance(stringValues, Array)) {
                stringValues = [stringValues];
            }
            value = new Array(stringValues.length);
            for (var i = 0; i < stringValues.length; i++) {
                value[i] = parser.parse(stringValues[i], row, column);
                valid = validateValue(value[i], stringValues[i], row, column)[0];
                if (!valid) break;
            }
            if (value.length == 0) {
                value = null;
            } else if (value.length == 1) {
                value = value[0];
            }
        } else {
            var control = getObject(this.getControlId(row, column));
            targetControls = [control];
            var stringValue = getValue(control);
            value = parser.parse(stringValue, row, column);
            valid = validateValue(value, stringValue, row, column)[0];
        }

        var className;
        if (valid) {
            className = isRadioCheckbox ? this.editControlRadioCheckboxClass : this.editControlClass;
            row.values[column.index] = value;
        } else {
            className = this.invalidEditControlClass;
            row.values[column.index] = null;
        }
        for (var i = 0; i < targetControls.length; i++) {
            targetControls[i].className = className;
        }
    }
    
    /*
     * Finishes the editing of a field, formatting it's value
     */
    this.finishEdit = function(rowId, columnIndex) {
        var column = this.getColumnByIndex(columnIndex);
        var row = null;
        if (inArray(column.editControl.type, [JST_CONTROL_TEXT, JST_CONTROL_PASSWORD, JST_CONTROL_TEXTAREA])) {
            row = this.getRowById(rowId)
            var control = getObject(this.getControlId(row, column));
            if (!isInstance(control, Array)) {
                var parser = column.getParser(row);
                var stringValue = control.value;
                var value = parser.parse(stringValue, row, column);
                var arr = validateValue(value, stringValue, row, column);
                var valid = arr[0];
                var msg = arr[1];
                if (valid) {
                    value = parser.format(value, row, column);
                    setValue(control, value);
                    this.updateValue(rowId, columnIndex);
                }
                if (msg != null) {
                    alert(msg);
                }
            }
        }
    }

    /*
     * Returns the number of rows
     */
    this.getRowCount = function() {
        return (this.operationMode == JST_CLIENT_SIDE) ? this.rows.length : this.rowCount;
    }
    
    /*
     * Returns the greatest page
     */
    this.getMaxPage = function() {
        return Math.ceil(this.getRowCount() / this.pageSize);
    }
    
    /*
     * Returns an ObjectRowMapper for this table
     */
    this.getObjectRowMapper = function() {
        if (this.objectRowMapper == null && this.identifierName != null) {
            this.objectRowMapper = new ObjectRowMapper();
            if (this.mapperClassName != null) {
                this.objectRowMapper.className = this.mapperClassName;
            }
            if (this.mapperConstructorArguments != null) {
                this.objectRowMapper.constructorArguments = this.mapperConstructorArguments;
            }
            this.objectRowMapper.mapIdentifier(this.identifierName);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                this.objectRowMapper.mapProperty(column.index, column.propertyName);
            }
        }
        return this.objectRowMapper;
    }
    
    /*
     * Updates the table
     */
    this.update = function() {
        if (this.operationMode == JST_CLIENT_SIDE) {
            this.render();
        } else {
            this.updateTableFunction(this);
        }
    }
    
    /*
     * Renders the table into the container
     */
    this.render = function(firstTime) {
        if (firstTime != false) {
            firstTime = true;
        }
        //Check if the table was correctly initialized
        if (!valid) {
            alert(this.tableNotInitializedMessage);
            return;
        }
        
        //Avoid memory leak on MSIE
        if (/MSIE/.test(navigator.userAgent) && !window.opera) {
            var inputs = this.container.getElementsByTagName("input");
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                input.mask = input.dateMask = input.sizeLimit = null;
            }
        }        
        
        //Check if the table is empty and the empty text is set
        if (((this.columns.length == 0) || (this.rows.length == 0)) && (!isEmpty(this.emptyTableText))) {
            this.container.innerHTML = this.emptyTableText;
            return;
        }

        var tableVar = this.getTableVar();

        //Display the wait text
        if (firstTime && !isEmpty(this.waitText)) {
            this.container.innerHTML = this.waitText;
            setTimeout(tableVar + ".render(false)", 10);
            return;
        }
        var cursorPointer = "cursor:" + (document.createTextRange ? "hand" : "pointer") + ";";
        var buffer = new StringBuffer(500);
        var usesSelection = this.selectionType != JST_SEL_NONE && !this.printing;
        var visibleColumns = this.getVisibleColumns();
        var visibleColumnsArray = this.getVisibleColumnsArray();
        var columnsPerRow = new Array();
        var renderedColumnCount = 0;
        var subRowCount = visibleColumnsArray.length;
        for (var i = 0; i < visibleColumnsArray.length; i++) {
            var current = visibleColumnsArray[i];
            var count = 0;
            for (var j = 0; j < current.length; j++) {
                count += current[j].colspan;
            }
            columnsPerRow[i] = count;
            if (count > renderedColumnCount) {
                renderedColumnCount = count;
            }
        }
        if (usesSelection) {
            renderedColumnCount++;
        }
        var navBar = "";
        var images = new Map();
        var editControls = new Array();
        
        //Gets the navigation bar code
        if ((this.navigation != JST_NAV_NONE) && (!this.printing)) {
            navBar = this.buildNavigation(renderedColumnCount);
        }

        //Determine wich rows will be visible
        var firstRow, lastRow, maxPage;
        if (this.usePaging) {
            var maxPage = this.getMaxPage();
            if (this.currentPage <= 0) {
                this.currentPage = 1;
            } else if (this.currentPage > maxPage) {
                this.currentPage = maxPage;
            }
            if (this.operationMode == JST_CLIENT_SIDE) {
                firstRow = Math.max(this.pageSize * (this.currentPage-1), 0);
                lastRow = Math.min(firstRow + this.pageSize, this.rows.length);
            } else {
                firstRow = 0;
                lastRow = Math.min(this.rows.length, this.pageSize);
            }
        } else {
            firstRow = 0;
            lastRow = this.rows.length;
        }
                
        //Creates an anchor above the table
        buffer.append("<a name=\"tableTop").append(this.id).append("\"></a>");
        
        //Creates the main table tag
        buffer.append("<table width=\"").append(this.width).append("\" align=\"").append(this.align).append("\" border=\"").append(this.border).append("\" class=\"").append(this.tableClass).append("\" cellpadding=\"").append(this.padding).append("\" cellspacing=\"").append(this.spacing).append("\">");

        //If the header text is set, put it
        if (!isEmpty(this.headerText)) {
            buffer.append("<tr><td colspan=\"").append(renderedColumnCount).append("\" class=\"").append(this.headerClass).append("\">").append(this.headerText).append("</td></tr>");
        }
        
        //Render the additional headers
        buffer.append(this.renderCells(this.headers, this.additionalHeaderClass));
        
        //If the navigation bar is on top, render it
        if (this.navigation == JST_NAV_TOP || this.navigation == JST_NAV_BOTH) {
            buffer.append(navBar);
        }
        
        //Build the column headers
        if (this.showColumnHeaders) {
            buffer.append("<tr>");
    
            //Builds the selection column, if selection is being used
            if (usesSelection) {
                buffer.append("<th width=\"20px\" class=\"").append(this.columnHeaderClass).append("\" rowspan=\"").append(subRowCount).append("\">");
                if (this.selectionType == JST_SEL_SINGLE || !this.showSelectAll) {
                    //Single selection or no select all control
                    buffer.append("&nbsp;");
                } else {
                    //Multiple selection - Build the select all control
                    buffer.append("<input style=\"border:0px\" type=\"checkbox\" class=\"").append(this.selectionControlClass).append("\" onclick=\"").append(tableVar).append(".selectAll(this.checked)\">");
                }
                buffer.append("</th>");
            }
            
            //Builds the column headers
            for (var i = 0; i < visibleColumnsArray.length; i++) {
                for (var j = 0; j < visibleColumnsArray[i].length; j++) {
                    var column = visibleColumnsArray[i][j];
                    
                    if (i > 0 && j == 0) {
                        buffer.append("<tr>");
                    }
                    
                    //Build the cell
                    buffer.append("<th nowrap width=\"").append(column.width).append("\" class=\"").append(this.columnHeaderClass).append("\" colspan=\"").append(subRowCount == 1 ? 1 : column.colspan).append("\" rowspan=\"").append(subRowCount == 1 ? 1 : column.rowspan).append("\" align=\"").append(column.align).append("\"");
                    //Check for cell highlighting
                    if (!this.printing && this.getColumnHeaderHighlightingParts()[1]) {
                        buffer.append(" onmouseover=\"this.className='").append(this.highlightedColumnHeaderClass).append("'\" onmouseout=\"this.className='").append(this.columnHeaderClass).append("'\"");
                    }
                    buffer.append(">");
                    //Build the text
                    if (isEmpty(trim(column.header))) {
                        buffer.append("&nbsp;");
                    } else {
                        buffer.append("<span class=\"").append(this.columnHeaderTextClass).append("\"");
                        
                        //Check for text highlighting
                        if (!this.printing && this.getColumnHeaderHighlightingParts()[2]) {
                            buffer.append(" onmouseover=\"this.className='").append(this.highlightedColumnHeaderTextClass).append("'\" onmouseout=\"this.className='").append(this.columnHeaderTextClass).append("'\"");
                        }
                        //Only let the user change the sorting when the table is not for printing
                        var style = "";
                        if (!this.printing && column.sortable) {
                            style = cursorPointer;
                            buffer.append(" onclick=\"").append(tableVar).append(".setSort(").append(column.index).append(");\"");
                            if (this.messagesOnStatusBar) {
                                buffer.append(" onMouseOver=\"window.status='").append(this.sortMessage).append("';return true;\" onMouseOut=\"window.status='';return true;\"");
                            } else {
                                buffer.append( "title=\"").append(this.sortMessage).append("\"")
                            }
                        }
                        buffer.append(" style=\"").append(style).append("\">");
                        
                        //Apply the column specific header text style
                        if (column.headerTextClass != null || column.headerTextStyle != null) {
                            buffer.append("<span");
                            if (column.headerTextClass != null) {
                                buffer.append(" class=\"").append(column.headerTextClass).append("\"");
                            }
                            if (column.headerTextStyle != null) {
                                buffer.append(" style=\"").append(column.headerTextStyle).append("\"");
                            }
                            buffer.append(">");
                        }
    
                        buffer.append(column.header);
                        
                        if (column.headerTextClass != null || column.headerTextStyle != null) {
                            buffer.append("</span>");
                        }
                        
                        //If the column being sorted is this, render the direction
                        if (!this.printing && column.sortable && this.sortColumn == column.index) {
                            buffer.append("&nbsp;").append(this.handleLabel(((this.ascSort) ? this.ascLabel : this.descLabel), images));
                        }
                        buffer.append("</span>");
                    }
                    buffer.append("</th>");
                }
                buffer.append("</tr>");
            }
        }
                
        //Renders the rows
        var even = true;
        var lastValues = null;
        for (var i = firstRow; i < lastRow; i++) {
            var row = this.rows[i];
            even = !even;
            var rowClass = (even ? this.evenRowClass : this.oddRowClass);
            var trHtml = new StringBuffer();
            var subRow = 0;
            trHtml.append("<tr id='").append(this.id + "_" + escapeCharacters(row.id) + "_%subRow%").append("' class=\"").append(rowClass).append("\" ");
            //If there's a row function (that is called when the user clicks a row), render it
            if (!this.printing && !isEmpty(this.rowFunction)) {
                var funct = this.rowFunction;
                if (isInstance(funct, Function)) {
                    funct = functionName(funct);
                }
                trHtml.append("onclick=\"").append(funct).append("('").append(row.id).append("', ").append(tableVar).append(")\" ");
                trHtml.append("style=\"").append(cursorPointer).append("\"");
            }
            //If there's row highlighting, handle it
            if (!this.printing && this.getRowHighlightingParts()[0]) {
                var highlightedRowClass = (even ? this.highlightedEvenRowClass : this.highlightedOddRowClass);
                if (subRowCount > 1) {
                    //If we must change the className of many rows, we need a special function to it...
                    trHtml.append("onmouseover=\"changeRowsClass('").append(this.id).append("', '").append(row.id).append("', ").append(subRowCount).append(", '").append(highlightedRowClass).append("');\" ");
                    trHtml.append("onmouseout=\"changeRowsClass('").append(this.id).append("', '").append(row.id).append("', ").append(subRowCount).append(", '").append(rowClass).append("');\"");
                } else {
                    trHtml.append("onmouseover=\"this.className='").append(highlightedRowClass).append("';\" onmouseout=\"this.className='").append(rowClass).append("';\"");
                }
            }
            trHtml.append(">");
            buffer.append(replaceAll(trHtml.toString(), "%subRow%", subRow));
            
            //Renders the selection column, if used
            if (usesSelection) {
                buffer.append("<td width=\"20px\" onclick=\"stopPropagation(event)\" style=\"cursor:auto\" rowspan=\"").append(subRowCount).append("\">");
                if (row.selectable) {
                    buffer.append("<input type=\"").append(this.selectionType).append("\" class=\"").append(this.selectionControlClass).append("\" name=\"").append(this.getSelectionName()).append("\" ") 
                            .append("id=\"").append(this.getSelectionName()).append(row.id).append("\" onclick=\"").append(tableVar).append(".fireSelection('").append(row.id).append("', this.checked);\" ")
                            .append("value=\"").append(row.id).append("\" ").append(row.selected ? "checked" : "").append(">");
                } else {
                    buffer.append("&nbsp;");
                }
                buffer.append("</td>");
            }

            //Renders the columns
            for (var j = 0; j < visibleColumnsArray.length; j++) {
                for (var j2 = 0; j2 < visibleColumnsArray[j].length; j2++) {

                    if (j > 0 && j2 == 0) {
                        subRow++;
                        buffer.append(replaceAll(trHtml.toString(), "%subRow%", subRow));
                    }
                
                    var column = visibleColumnsArray[j][j2];
                    var values = row.values[column.index];
                    //Ensures value is an array
                    if (!isInstance(values, Array)) {
                        values = [values];
                    }
                    
                    var formattedValue = "";
                    var useValue = true;
                    
                    //Check if this value must be cropped
                    if ((this.cropRepeated || column.cropRepeated) && lastValues != null) {
                        var oldValues = lastValues[column.index];
                        if (!isInstance(oldValues, Array)) {
                            oldValues = [oldValues];
                        }
                        if ("" + values == "" + oldValues) {
                            useValue = false;
                        }
                    }
                    
                    var useCellFunction = false;
                    var cellEditable =  false;
                    var cellClass = null;
                    
                    if (useValue) {
                        //Handle crop tree
                        if (this.cropRepeatedTree) {
                            lastValues=null;
                        }
                        //Format the values
                        var formattedValues = new Array();
                        var tmpFmt = new Array();
                        var parser = column.getParser(row);
                        for (var k = 0; k < values.length; k++) {
                            value = values[k];
                            //Format the value
                            if (column.editable && isInstance(value, String)) {
                                value = replaceAll(value, "&", "&amp;");
                                value = replaceAll(value, "\"", "&quot;");
                                value = replaceAll(value, "'", "&apos;");
                            }
                            formattedValues[k] = isEmpty(value) ? null : parser.format(value, row, column);
                            if (!isEmpty(value)) {
                                //Checks if the value is an image
                                if ((formattedValues[k]) && (formattedValues[k].src)) {
                                    formattedValues[k] = this.handleLabel(formattedValues[k], images);
                                }
                                
                                tmpFmt[tmpFmt.length] = formattedValues[k];
                            }
                        }
                        cellEditable = (column.editable && row.editable && (isInstance(column.editControl, EditControl)));
                        useCellFunction = !this.printing && !cellEditable && !isEmpty(column.cellFunction) && row.useCellFunction;
                        cellClass = null;
                        
                        //Get all the values
                        formattedValue = tmpFmt.join(this.valueSeparator + " ");
                    }
                    
                    var cellClass = (even ? this.evenRowCellClass : this.oddRowCellClass);
                    buffer.append("<td width=\"").append(column.width).append("\" align=\"").append(column.align).append("\" valign=\"").append(column.valign).append("\" class=\"").append(cellClass).append("\" colspan=\"").append(subRowCount == 1 ? 1 : column.colspan).append("\" rowspan=\"").append(subRowCount == 1 ? 1 : column.rowspan).append("\" ");
    
                    //Check for cell highlighting
                    if (!this.printing && this.getRowHighlightingParts()[1]) {
                        var highlightedCellClass = (even ? this.highlightedEvenRowCellClass : this.highlightedOddRowCellClass);
                        buffer.append(" onmouseover=\"this.className='").append(highlightedCellClass).append("'\" onmouseout=\"this.className='").append(cellClass).append("';\"");
                    }
                    
                    //Check for title
                    var title = row.titles[column.index];
                    if (!isEmpty(title)) {
                        buffer.append(" title=\"").append(title).append("\"");
                    }               
                    buffer.append(">");
                    
                    //Checks if the cell is editable
                    if (cellEditable) {
                        var controlName = this.getControlName(row, column);
                        var controlId = this.getControlId(row, column);
                        var editControl = column.editControl;
                        var updateFunction = this.getTableVar() + ".updateValue('" + row.id + "', " + column.index + ")";
                        var finishEditFunction = this.getTableVar() + ".finishEdit('" + row.id + "', " + column.index + ")";
                        var possibleValues = new Map();
                        if (isInstance(column.possibleValues, Map)) {
                            possibleValues.putAll(column.possibleValues);
                        }
                        if ((row.possibleValues != null) && (isInstance(row.possibleValues[column.index], Map))) {
                            possibleValues.putAll(row.possibleValues[column.index]);
                        }
                        formattedValue = replaceAll(formattedValue, '\\', '\\\\');
                        //Render the correct control
                        switch (editControl.type) {
                            case JST_CONTROL_TEXTAREA:
                                buffer.append("<textarea id=\"").append(controlId).append("\" class=\"").append(this.editControlClass).append("\" onblur=\"").append(finishEditFunction).append("\" onkeyup=\"").append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes).append(" onclick=\"stopPropagation(event)\">").append(formattedValue).append("</textarea>");
                                break;
                            case JST_CONTROL_SELECT:
                            case JST_CONTROL_SELECT_MULTIPLE:
                                buffer.append("<select").append(editControl.type == JST_CONTROL_SELECT_MULTIPLE ? " multiple" : "").append(" id=\"").append(controlId).append("\" class=\"").append(this.editControlClass).append("\" onchange=\"").append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes).append(" onclick=\"stopPropagation(event)\">");
                                //Get the possible values
                                var keys = possibleValues.getKeys();
                                for (var k = 0; k < keys.length; k++) {
                                    var key = keys[k];
                                    var value = possibleValues.get(key);
                                    buffer.append("<option value=\"").append(key).append("\" ").append(inArray(key, values) ? "selected" : "").append(" onclick=\"stopPropagation(event)\">").append(value).append("</option>");
                                }
                                buffer.append("</select>");
                                break;
                            case JST_CONTROL_RADIO:
                            case JST_CONTROL_CHECKBOX:
                                //If there were no values and is a boolean column, use the defaults
                                if ((possibleValues.size() == 0) && (column.type == JST_TYPE_BOOLEAN)) {
                                    if (editControl.type == JST_CONTROL_CHECKBOX) {
                                        possibleValues.put('true', '');
                                    } else {
                                        possibleValues.put('true', 'true');
                                        possibleValues.put('false', 'false');
                                    }
                                }
    
                                var entries = possibleValues.getEntries();
                                for (var k = 0; k < entries.length; k++) {
                                    var key = entries[k].key;
                                    var value = entries[k].value;
                                    if (k > 0) {
                                        if (editControl.multiLine) {
                                            buffer.append("<br>");
                                        } else {
                                            buffer.append("&nbsp;&nbsp;&nbsp;");
                                        }
                                    }
                                    var isChecked;
                                    //Checks the true / false values
                                    if (column.type == JST_TYPE_BOOLEAN) {
                                        isChecked = values[k];
                                    } else {
                                        isChecked = inArray(key, values);
                                    }
                                    
                                    buffer.append("<div style=\"display:inline\"><label onclick=\"stopPropagation(event)\"><input id=\"").append(controlId).append("\" class=\"")
                                        .append(this.editControlRadioCheckboxClass).append("\" onclick=\"stopPropagation(event);")
                                        .append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes)
                                        .append(" type=\"").append(editControl.type).append("\" value=\"").append(key).append("\" ")
                                        .append(isChecked ? "checked" : "").append(">").append(isEmpty(value) ? "" : ("&nbsp;" + value)).append("</label></div>");
                                }
                                break;
                            default:
                                buffer.append("<input id=\"").append(controlId).append("\" class=\"").append(this.editControlClass)
                                    .append("\" onclick=\"stopPropagation(event)\" onblur=\"").append(finishEditFunction).append("\" onkeyup=\"")
                                    .append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes)
                                    .append(" type=\"").append(editControl.type).append("\" value=\"").append(formattedValue).append("\">");
                                break;
                        }
                    } else {
                        var textClass;
                        var cellFunction = "";
                        //Check the cell function
                        if (useCellFunction) {
                            textClass = (even ? column.evenRowCellWithFunctionClass : column.oddRowCellWithFunctionClass);
                            if (textClass == null) textClass = (even ? this.evenRowTextWithFunctionClass : this.oddRowTextWithFunctionClass);
                            var funct = column.cellFunction;
                            if (isInstance(funct, Function)) {
                                funct = functionName(funct);
                            }
                            cellFunction = " style=\"" + cursorPointer + "\" onclick=\"" + funct + "('" + row.id + "', " + column.index + ", " + tableVar + ");stopPropagation(event)\"";
                        } else {
                            textClass = (even ? this.evenRowTextClass : this.oddRowTextClass);
                        }
                        //Render the table text
                        buffer.append("<span class=\"").append(textClass).append("\"").append(cellFunction);
                        //Check the highlighting
                        if (!this.printing && this.getRowHighlightingParts()[2]) {
                            var highlightedTextClass;
                            if (useCellFunction) {
                                highlightedTextClass = (even ? column.highlightedEvenRowCellWithFunctionClass : column.highlightedOddRowCellWithFunctionClass);
                                if (highlightedTextClass == null) highlightedTextClass = (even ? this.highlightedEvenRowTextWithFunctionClass : this.highlightedOddRowTextWithFunctionClass);
                            } else {
                                highlightedTextClass = (even ? this.highlightedEvenRowTextClass : this.highlightedOddRowTextClass);
                            }
                            buffer.append(" onmouseover=\"this.className='").append(highlightedTextClass).append("'\" onmouseout=\"this.className='").append(textClass).append("';\"");
                        }
                        buffer.append(">");
                        //Apply the column specific cell text style
                        if (column.cellTextClass != null || column.cellTextStyle != null) {
                            buffer.append("<span");
                            if (column.cellTextClass != null) {
                                buffer.append(" class=\"").append(column.cellTextClass).append("\"");
                            }
                            if (column.cellTextStyle != null) {
                                buffer.append(" style=\"").append(column.cellTextStyle).append("\"");
                            }
                            buffer.append(">");
                        }
                        buffer.append((isEmpty(formattedValue) ? "&nbsp;" : formattedValue));
                        if (column.cellTextClass != null || column.cellTextStyle != null) {
                            buffer.append("</span>");
                        }
                        buffer.append("</span>");
                    }
                    buffer.append("</td>");
                }
                buffer.append("</tr>");
                lastValues = row.values;
            }
        }

        //Render the additional footers
        buffer.append(this.renderCells(this.footers, this.additionalFooterClass));

        //If the navigation bar is on bottom, render it
        if (this.navigation == JST_NAV_BOTTOM || this.navigation == JST_NAV_BOTH) {
            buffer.append(navBar);
        }
        
        //If the footer text is set, put it
        if (!isEmpty(this.footerText)) {
            buffer.append("<tr><td colspan=\"").append(renderedColumnCount).append("\" class=\"").append(this.footerClass).append("\">").append(this.footerText).append("</td></tr>");
        }
        
        buffer.append("</table>");

        //This hidden is only used to determine the form enclosing the table
        this.container.innerHTML = "<input type=\"hidden\" name=\"hidden" + this.id + "\">";

        //Get the form enclosing the table
        var hidden = getObject("hidden" + this.id);
        if (hidden == null || hidden.form == null)  {
            this.form = null;
        } else {
            this.form = hidden.form;
        }

        //Renders the table into its container
        this.container.innerHTML = buffer.toString();
        //window.open().document.write("<textarea rows=40 cols=150>" + buffer.toString() + "</textarea>");
        buffer.clear();
        
        //Sets the images src properties
        var keys = images.getKeys();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var ref = document.images[key];
            var img = images.get(key);
            if (ref && img.src) {
                ref.src = img.src;
            }
        }
        
        //Apply the masks
        for (var i = 0; i < visibleColumns.length; i++) {
            var column = visibleColumns[i];
            if (column.getMaskFunction != null) {
                for (var j = firstRow; j < lastRow; j++) {
                    var row = this.rows[j];
                    var controls = getObject(this.getControlId(row, column));
                    if (controls == null) continue;
                    if (!isInstance(controls, Array)) {
                        controls = [controls];
                    }
                    for (var k = 0; k < controls.length; k++) {
                        var mask = column.getMaskFunction(controls[k], column, row);
                        if (mask != null) {
                            mask.updateValueFunction = tableVar + ".updateValue('" + row.id + "', " + column.index + ")";
                            mask.finishEditFunction = tableVar + ".finishEdit('" + row.id + "', " + column.index + ")";
                            mask.updateFunction = function() {
                                eval(this.updateValueFunction);
                            }
                            mask.blurFunction = function() {
                                eval(this.finishEditFunction);
                            }
                        }
                    }
                }
            }
        }
        
        //Invoke the callback if any
        if (typeof (this.onRender) == 'function') {
            this.onRender(this);
        }
    }

    /* Returns the rows generated by the given cell containers with a given default class */
    this.renderCells = function(containers, defaultClass) {
        if (isEmpty(containers)) {
            return "";
        }
        var sb = new StringBuffer();
        var usesSelection = this.selectionType != JST_SEL_NONE && !this.printing;
        for (var i = 0; i < containers.length; i++) {
            var container = containers[i];
            sb.append("<tr>");
            if (usesSelection) {
                sb.append("<td class='").append(defaultClass).append("'>&nbsp;</td>");
            }
            for (var j = 0; j < container.cells.length; j++) {
                var cell = container.cells[j];
                sb.append("<td ");
                if (isEmpty(cell["class"])) {
                    cell["class"] = defaultClass;
                }
                for (var opt in cell) {
                    var value = cell[opt];
                    //Boolean values, when true, render attribute value equals to it's name (like nowrap="nowrap")
                    if (value == true) {
                        value = opt;
                    } else if (value == false) {
                        continue;
                    }
                    if (opt == "text" || (!isInstance(value, String) && !isInstance(value, Number))) {
                        continue;
                    }
                    sb.append(opt).append("='").append(value).append("' ");
                }
                sb.append(">");
                sb.append(cell.text || "&nbsp;").append("</td>"); 
            } 
            sb.append("</tr>");
        }
        return sb.toString();
    }
    
    /*
     * Sets the current page. If the page is not specified, prompts the user for the new page
     */
    this.changePage = function(page) {
        if (isNaN(page)) {
            do {
                page = prompt(this.changePagePrompt, this.currentPage);
                //Check if user canceled
                if (page == null) {
                    return;
                }
            } while (isNaN(page));
        }
        //Validates the bounds
        var maxPage = this.getMaxPage();
        page = parseInt(page, 10);
        if (page <= 0) {
            page = 1;
        } else if (page > maxPage) {
            page = maxPage;
        }        
        //Updates the table
        this.currentPage = page;
        this.update();
    }

    /*
     * Sets the page size. If the size is not specified, prompts the user for the new size
     */
    this.changePageSize = function(size) {
        if (isNaN(size)) {
            do {
                size = prompt(this.changePageSizePrompt, this.pageSize);
                //Check if user canceled
                if (size == null) {
                    return;
                }
                size = parseInt(size, 10);
            } while (isNaN(size));
        }
        //Check the bounds
        if (size <= 1) {
            size = 1;
        }        
        //Updates the table, checking if the page is not after the max
        this.pageSize = parseInt(size, 10);
        var maxPage = this.getMaxPage();
        if (this.currentPage > maxPage) {
            this.currentPage = maxPage;
        }
        
        //Refresh the table
        this.update();
    }
        
    /*
     * Builds the source for the navigation bar
     */
    this.buildNavigation = function(renderedColumnCount) {
        var cursorPointer = "cursor:" + (document.createTextRange ? "hand" : "pointer") + ";";
        var buffer = new StringBuffer();
        var rowCount = this.getRowCount();
        var tableVar = this.getTableVar();
        buffer.append("<tr><td colspan=\"" + renderedColumnCount + "\" class=\"" + this.navigationClass + "\">");
        buffer.append(rowCount + " " + (rowCount == 1 ? this.singleRowText : this.multipleRowText) + "&nbsp;&nbsp;&nbsp;");
        var linkClass = this.navigationLinkClass;
        var highlightedLinkClass = this.highlightedNavigationLinkClass;
        var table = this;
        function buildLink(text, onclick, statusMsg) {
            var sb = new StringBuffer();
            sb.append("<span style=\"").append(cursorPointer).append("\" class=\"").append(linkClass).append("\" onclick=\"").append(onclick).append("\" ");
            sb.append("onMouseOver=\"this.className='" + highlightedLinkClass + "'");
            if (table.messagesOnStatusBar) {
                sb.append(";window.status='").append(statusMsg).append("';return true;\" ");
            } else {
                sb.append("\" title=\"").append(statusMsg).append("\"");
            }
            sb.append("onMouseOut=\"this.className='" + linkClass + "'");
            if (table.messagesOnStatusBar) {
                sb.append(";window.status='").append(statusMsg).append("';return true; ");
            }
            sb.append("\">").append(text).append("</span>");
            return sb.toString();
        }
        if (rowCount > 0) {
            //Checks if paging is being used or not
            if (this.usePaging) {
                //Using paging
                var maxPage = this.getMaxPage();
                //Put the back navigation if not on first page
                if (this.currentPage > 1) {
                    buffer.append(buildLink(this.firstPageText, tableVar + ".setPage(1);", this.firstPageDescription) + "&nbsp;");
                    buffer.append(buildLink(this.previousPageText, tableVar + ".setPage(" + (this.currentPage - 1) + ");", this.previousPageDescription) + "&nbsp;");
                }
                //Change the variables
                var current = buildLink(this.currentPage, tableVar + ".changePage()", this.changePageDescription);
                var total;
                if (this.allowChangePageSize) {
                     total = buildLink(maxPage, tableVar + ".changePageSize()", this.changePageSizeDescription);
                } else {
                    total = maxPage;
                }
                buffer.append("&nbsp;" + this.pageText.replace("${current}", current).replace("${total}", total) + "&nbsp;");
                //Put the forward navigation if not on last page
                if (this.currentPage < maxPage) {
                    buffer.append(buildLink(this.nextPageText, tableVar + ".setPage(" + (this.currentPage + 1) + ");", this.nextPageDescription) + "&nbsp;");
                    buffer.append(buildLink(this.lastPageText, tableVar + ".setPage(" + maxPage + ");", this.lastPageDescription) + "&nbsp;");
                }
                if (this.allowChangePaging) {
                    buffer.append("&nbsp;&nbsp;" + buildLink(this.showAllText, tableVar + ".setUsePaging(false);", this.showAllDescription));
                }
            } else {
                //Showing all rows
                if (this.allowChangePaging) {
                    buffer.append(buildLink(this.usePagingText, tableVar + ".setUsePaging(true);", this.usePagingDescription));
                }
            }
            //Put the table top link
            if (this.allowTopLink) {
                buffer.append("&nbsp;").append(buildLink(this.topText, "var pos = self.location.href.indexOf('#');var loc = pos < 0 ? self.location.href : self.location.href.substring(0, pos); self.location.href = loc + '#tableTop" + this.id + "'", this.topDescription));
            }
        }
        buffer.append("</td></tr>");
        return buffer.toString();
    }
    
    /*
     * Returns the correct text and, if an image, adds its reference to the images map
     */
    var imgId = 0;
    this.handleLabel = function(label, images) {
        if (label.src) {
            var id = "img" + imgId;
            imgId++;
            if (isInstance(images, Map)) {
                images.put(id, label);
            }
            return "<img name='" + id + "' border='0'>";
        } else {
            return label;
        }
    }
    
    /*
     * Used on the Array.sort() method when sorting rows
     */
    this.sort = function(row1, row2) {
        var jst = row1.table;
        var column = jst.getColumnByIndex(jst.sortColumn);
        var type = column.type;
        var value1, values2;
        
        //Gets both values to test
        values1 = row1.values[jst.sortColumn];
        values2 = row2.values[jst.sortColumn];
        
        //Ensures both values are arrays
        if (!isInstance(values1, Array)) {
            values1 = [values1];
        }
        if (!isInstance(values2, Array)) {
            values2 = [values2];
        }

        //Gets the function that prepares the values
        var prepare;
        switch (column.type) {
            case JST_TYPE_NUMERIC:
            case JST_TYPE_CURRENCY:
                prepare = function(value) {
                    if (isNaN(value)) {
                        value = 0;
                    }
                    return value;
                }
                break;
            case JST_TYPE_DATE:
                prepare = function(value) {
                    return value.valueOf();
                }
                break;
            case JST_TYPE_BOOLEAN:
                prepare = function(value) {
                    return booleanValue(value) ? 1 : 0;
                }
                break;
            case JST_TYPE_STRING:
            default:
                prepare = function(value) {
                    return String(value).replace(/\<[^\>]*\>/g,"").toUpperCase();
                }
                break;
        }
        
        //Returns the comparision value
        var maxIndex = Math.max(values1.length, values2.length);
        var comp = 0;
        for (var i = 0; (comp == 0) && (i < maxIndex); i++) {
            //Get the values, checking null values
            var var1 = values1[i];
            if (var1 == null) {
                comp = -1;
            }
            var var2 = values2[i];
            if (var2 == null) {
                comp = 1;
            }
            //Compare the values
            if (comp == 0) {
                var1 = prepare(var1);
                var2 = prepare(var2);
                comp = (var1 == var2) ? 0 : (var1 > var2) ? 1 : -1;
            }
            //Check asc / desc sorting
            if (comp != 0) {
                comp *= (jst.ascSort ? 1 : -1);
            }
        }
        return comp;
    }

    //Returns the highlighting constant for the parts
    this.buildHighlightingConstant = function(row, cell, text) {
        return (row ? "1" : "0") + (cell ? "1" : "0") + (text ? "1" : "0");
    }

    //Returns the highlighting array for the constant
    this.buildHighlightingParts = function(constant) {
        if (isEmpty(constant) || (constant.length < 3)) {
            return [false, false, false];
        }
        var ret = new Array(3);
        for (var i = 0; i < 3; i++) {
            ret[i] = constant.charAt(i) == "1";
        }
        return ret;
    }
    
    //Sets the column header highlighting components
    this.setColumnHeaderHighlightingParts = function(cell, text, update) {
        this.columnHeaderHighlighting = this.buildHighlightingConstant(false, cell, text);
        if (update) {
            this.update();
        }
    }
    
    //Sets the row highlighting components
    this.setRowHighlightingParts = function(row, cell, text, update) {
        this.rowHighlighting = this.buildHighlightingConstant(row, cell, text);
        if (update) {
            this.update();
        }
    }
    
    //Sets the row highlighting components
    this.getColumnHeaderHighlightingParts = function() {
        return this.buildHighlightingParts(this.columnHeaderHighlighting);
    }
    
    //Sets the row highlighting components
    this.getRowHighlightingParts = function() {
        return this.buildHighlightingParts(this.rowHighlighting);
    }
    
    /* Returns a String representation of this table */
    this.toString = function() {
        return "Table: Id = '" + this.id + "', Rows = " + this.getRowCount() + ", Columns = " + this.columns.length;
    };
}

/*
 * Changes the class of all subRows
 */
function changeRowsClass(tableId, rowId, subRowCount, className) {
    for (var i = 0; i < subRowCount; i++) {
        getObject(tableId + "_" + rowId + "_" + i).className = className;
    }
}

///////////////////////////////////////////////////////////////////////////////
/*
 * This class represents a column.
 */
function Column(header, type, width, align, valign, possibleValues) {
    this.table = null;
    this.index = -1;
    this.header = header || "";
    this.type = type || JST_TYPE_STRING;
    this.width = width || "";
    this.align = align || JST_ALIGN_LEFT;
    this.valign = valign || JST_VALIGN_MIDDLE;
    this.possibleValues = possibleValues || null;
    this.propertyName = null;
    this.visible = true;
    this.sortable = true;
    this.editable = false;
    this.editControl = new EditControl();
    this.parser = null;
    this.encodingParser = null;
    this.validateFunction = null;
    this.cellFunction = null;
    this.getMaskFunction = null;
    this.cellTextClass = null;
    this.cellTextStyle = null;
    this.oddRowCellWithFunctionClass = null;
    this.evenRowCellWithFunctionClass = null;
    this.highlightedOddRowCellWithFunctionClass = null;
    this.highlightedEvenRowCellWithFunctionClass = null;
    this.headerTextClass = null;
    this.headerTextStyle = null;
    this.allowEmptyValue = false;
    this.cropRepeated = false;
    this.colspan = 1;
    this.rowspan = 1;
    
    /*
     * Gets the parser for data entry
     */
    this.getParser = function(row) {
        //Checks for the given interface
        if (this.parser != null && isInstance(this.parser, Parser)) {
            return this.parser;
        }
        
        //Check if there's a editControl or row with multiple values
        var colValues = isInstance(this.possibleValues, Map) && this.possibleValues.size() > 0;
        var rowValues = false;
        try {
            rowValues = isInstance(row.possibleValues[this.index], Map) && (row.possibleValues[this.index].size() > 0);
        } catch (e) {
        } 
        //If has multi values, return a MapParser
        if (colValues || rowValues) {
            var values = new Map();
            //Put the EditControl values
            if (colValues) {
                var entries = this.possibleValues.getEntries();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    values.put(entry.key, entry.value);
                }
            }
            //Put the row values
            if (rowValues) {
                var entries = row.possibleValues[this.index].getEntries();
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    values.put(entry.key, entry.value);
                }
            }
            //Build the parser
            return new MapParser(values, true);
        }
        
        //If the column does not have a specific parser, return the default from the table
        switch (this.type) {
            case JST_TYPE_STRING:
                return this.table.stringParser;
            case JST_TYPE_NUMERIC:
                return this.table.numberParser;
            case JST_TYPE_CURRENCY:
                return this.table.currencyParser;
            case JST_TYPE_DATE:
                return this.table.dateParser;
            case JST_TYPE_BOOLEAN:
                return this.table.booleanParser;
            default:
                return this.table.stringParser;
         }
    }
    
    /*
     * Gets the parser for encoding data
     */
    this.getEncodingParser = function() {
        //Checks for the given interface
        if (this.encodingParser != null && (this.encodingParser.parse) && (this.encodingParser.format)) {
            return this.encodingParser;
        }
        
        //If the column does not have a specific EncodingParser, return the default from the table
        switch (this.type) {
            case JST_TYPE_STRING:
                return this.table.stringEncodingParser;
            case JST_TYPE_NUMERIC:
                return this.table.numberEncodingParser;
            case JST_TYPE_CURRENCY:
                return this.table.currencyEncodingParser;
            case JST_TYPE_DATE:
                return this.table.dateEncodingParser;
            case JST_TYPE_BOOLEAN:
                return this.table.booleanEncodingParser;
            default:
                return this.table.stringEncodingParser;
         }
    }
    
    /* Returns a String representation of this column */
    this.toString = function() {
        return "Column: Index = " + this.index + ", Header = '" + this.header + "'";
    };
}

///////////////////////////////////////////////////////////////////////////////
/*
 * This class represents a row.
 */
function Row(id, values, possibleValues, titles) {
    this.table = null;
    this.id = id;
    this.values = ensureArray(values);
    this.possibleValues = ensureArray(possibleValues);
    this.titles = ensureArray(titles);
    this.selectable = true;
    this.selected = false;
    this.editable = true;
    this.useCellFunction = true;
    
    /*
     * Encodes the data on the row, on the following format:
     * id<table.columnSeparator>value0<table.columnSeparator>value1<table.columnSeparator>...valueN
     * If a 'value' has multiple values (an Array), they are joined using the 
     * <table.valueSeparator>
     * If the columns parameter is set, it must be an Array of integers. Only those columns will be encoded. 
     * The row identifier is always encoded, unless the encodeRowId parameter is
     * set to false
     */
    this.encode = function(columns, encodeRowId) {
        encodeRowId = encodeRowId || true;
        
        //Get the encoded identifier
        var ret = encodeRowId ? escapeCharacters(id, this.table.columnSeparator + this.table.valueSeparator) : "";
        columns = columns || null;

        //Get the values
        if (this.values.length > 0) {
            if (encodeRowId) {
                ret += this.table.columnSeparator;
            }
            var tempVals = new Array();
            for (var i = 0; i < this.values.length; i++) {
                var cellValue = this.values[i];
                //Determine if the column will be encoded
                if ((columns != null) && (!inArray(i, columns))) {
                    continue;
                }
                //Get the column and it's encoding parser
                var column = this.table.getColumnByIndex(i);
                var encodingParser = column.getEncodingParser();
                if (!isInstance(cellValue, Array)) {
                    cellValue = [cellValue];
                }
                //Treat cellValue as an array of values
                values = new Array();
                //Parse the value and escape the values separator
                for (var j = 0; j < cellValue.length; j++) {
                    var value = cellValue[j];
                    if (value == null) {
                        values[j] = "";
                    } else {
                        var formattedValue = encodingParser.format(value, this, column);
                        values[j] = escapeCharacters(formattedValue, this.table.valueSeparator, false);
                    }
                }
                cellValue = values.join(this.table.valueSeparator);
                
                //Escape the column separators
                cellValue = escapeCharacters(cellValue, this.table.columnSeparator, true);
                
                //Store the current values
                tempVals[tempVals.length] = cellValue;
            }

            //Build the single String
            ret += tempVals.join(this.table.columnSeparator);
        }
        return ret;
    }
    
    /* Returns a String representation of this row */
    this.toString = function() {
        return "Row: Id = '" + this.id + "', Values = " + this.values;
    };    
}

///////////////////////////////////////////////////////////////////////////////
/*
 * This class represents an edit control.
 */
function EditControl(type, attributes, multiLine, name) {
    this.type = type || JST_CONTROL_TEXT;
    this.attributes = attributes || "";
    this.multiLine = booleanValue(multiLine);
    this.name = null;
    
    /* Returns a String representation of this edit control */
    this.toString = function() {
        return "Edit Control: Type = '" + this.type + "'";
    };
}

///////////////////////////////////////////////////////////////////////////////
/*
 * Contains arbitrary cells, used to render headers or footers.
 */
function JavaScripTableCellContainer() {
    this.cells = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var cell;
        if (isInstance(arg, String)) {
            cell = {text: arg}
        } else {
            cell = arg;
        }
        this.cells[this.cells.length] = cell;
    }
    
    /* Adds another cell */
    this.add = function(text, options) {
        var cell = options || {}
        cell.text = text;
        this.cells[this.cells.length] = cell;
    }
}

///////////////////////////////////////////////////////////////////////////////
/*
 * This class allows mapping from an object (or map) to a row and vice-versa
 */
function ObjectRowMapper() {
    this.identifierName = null;
    this.propertyNames = [];
    this.className = "Object";
    this.constructorParams = null;
    
    //Method used to register the identifier mapping
    this.mapIdentifier = function(name) {
        this.identifierName = name;
    }
    
    //Method used to register a property mapping
    this.mapProperty = function(columnIndex, name) {
        this.propertyNames[columnIndex] = name;
    }
    
    //Convert a Row to a Object
    this.toObject = function(row) {
        if (!isInstance(row, Row)) {
            return null;
        }
        var className = this.className;
        if (isInstance(className, Function)) {
            className = functionName(className);
        }
        var object = invoke("new " + className, this.constructorParams);
        if (this.identifierName != null) {
            object[this.identifierName] = row.id;
        }
        for (var i = 0; i < this.propertyNames.length; i++) {
            try {
                object[this.propertyNames[i]] = row.values[i];
            } catch (exception) {
            }
        }
        return object;
    }
    
    //Convert a Row to a Map
    this.toMap = function(row) {
        if (!isInstance(row, Row)) {
            return null;
        }
        return new ObjectMap(this.toObject(row));
    }
    
    //Convert a Object or Map to Row
    this.toRow = function(object) {
        if (!object) {
            return null;
        }
        var id = this.getIdentifier(object);
        var values = new Array(this.propertyNames.length);
        for (var i = 0; i < this.propertyNames.length; i++) {
            var name = this.propertyNames[i];
            if (name != null) {
                values[i] = this.getProperty(object, name);
            }
        }
        return new Row(id, values);
    }
   
    //Method used to retrieve a property value
    this.getProperty = function(object, name) {
        try {
            if (isInstance(object, Row)) {
                for (var i = 0; i < this.propertyNames; i++) {
                    if (this.propertyNames[i] == name) {
                        return row.values[i];
                    }
                }
            } else if (isInstance(object, Map)) {
                return object.get(name);
            } else {
                return object[name];
            }
        } catch (exception) {
        }
        return null;
    }
    
    //Method used to set a property value
    this.setProperty = function(object, name, value) {
        try {
            if (isInstance(object, Row)) {
                for (var i = 0; i < this.propertyNames; i++) {
                    if (this.propertyNames[i] == name) {
                        row.values[i] = value;
                        return;
                    }
                }
            } else if (isInstance(object, Map)) {
                object.put(name, value);
            } else {
                object[name] = value;
            }
        } catch (exception) {
        }
    }
    
    //Method used to retrieve the identifier value
    this.getIdentifier = function(object) {
        try {
            if (isInstance(object, Row)) {
                return row.id;
            } else if (this.identifierName == null) {
                return null;
            } else {
                return this.getProperty(object, this.identifierName);
            }
        } catch (exception) {
        }
        return null;
    }
    
    //Method used to set the identifier value
    this.setIdentifier = function(object, value) {
        try {
            if (isInstance(object, Row)) {
                row.id = value;
            } else if (this.identifierName != null) {
                this.setProperty(object, this.identifierName, value);
            }
        } catch (exception) {
        }
    }
}

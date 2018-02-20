'use strict';
/**
 * A micro library to change the number values in the DOM by sweeping them left or right
 *
 * Surround the number you want to activate with a span tag, class "sweep" like so: 
 * <h3><input class = "sweep">104</h3>
 *
 * It's designed to work only with integers, both positive and negative.
 * 
 * NEEDS TO BE DONE IN REACT!
 * 
 */

let Sweep = (opts = {}) => {
    const options = Object.assign(
        // Default options
        {
            selector       : 'input.sweep',
            cursor         : 'help',
            clickEditable  : true,
            color          : '#00e0ff',
            suffix         : '',
            prefix         : '',
            onlyPositive   : false,
            splitThousands : true
        },
        // User options
        opts
    );
    // Browser-standard valid cursors
    let validCursors = [
        'auto',
        'default',
        'context-menu',
        'help',
        'pointer',
        'progress',
        'wait',
        'cell',
        'crosshair',
        'text',
        'vertical-text',
        'alias',
        'copy',
        'move',
        'no-drop',
        'not-allowed',
        'all-scroll',
        'col-resize',
        'row-resize',
        'n-resize',
        'e-resize',
        's-resize',
        'w-resize',
        'ns-resize',
        'ew-resize',
        'ne-resize',
        'nw-resize',
        'se-resize',
        'sw-resize',
        'nesw-resize',
        'nwse-resize'
    ];
    // We scan the page once in page load and process all the elements
    const $sweeps = document.querySelectorAll(options.selector);
    // No span.sweep's? Nothing to do
    if ($sweeps.length === 0) {
        console.log(`%cSweepNumbers: We didn't find any elements with the selector '${options.selector}'`,
        'color:white;background-color:' + options.color + ';padding:3px');
        return;
    }
    let startingX, // x coordinate of the mouse when started dragging
        sweepElement,  // sweep element the dragging started on
        originalNumber, // sweep element's original value before movement starts
        dragging; // are we currently dragging?

    // Every SweepNumber has to be ready to react to a variety of events
    for (let i = 0, len = $sweeps.length; i < len; i++) {
        $sweeps[i].setAttribute('readonly', 'true');
        $sweeps[i].addEventListener('mouseover', mouseoverF);
        $sweeps[i].addEventListener('mouseout', mouseoutF);
        $sweeps[i].addEventListener('mousedown', mousedownF);
        if (options.clickEditable)
            $sweeps[i].addEventListener('click', clickF);
        $sweeps[i].addEventListener('keypress', keypressF);
        $sweeps[i].addEventListener('blur', blurF);
        $sweeps[i].dataset.value = clean($sweeps[i].value);             // Store initial value in a non distortable location
        $sweeps[i].value         = decorate($sweeps[i].dataset.value);  // Markup the visible value with commas or symbols
        $sweeps[i].style.color   = options.color;
        // Adjust all input's width
        updateInputWidth($sweeps[i]);

        // These need to be 'listened' by the document to work properly
        document.addEventListener('mousemove', mousemoveF);
        document.addEventListener('mouseup', mouseupF);
    }

    /**
     * Simple and easy way to restore the cursor style
     */
    function restoreCursor() {
        document.documentElement.style.cursor = 'default';
        event.target.style.cursor  = 'auto';
    }

    /**
     * Actions to take when the mouse is over a SweepNumber.
     * So far, we change the cursor type to indicate it is sweepable
     */
    function mouseoverF() {
        if (validCursors.includes(options.cursor))
            document.documentElement.style.cursor = event.target.style.cursor = options.cursor;
        else 
            document.documentElement.style.cursor = event.target.style.cursor = 'cell';
    }

    /**
     * Cleanup actions when finishing hovering a number, sometimes sweeping it
     * 
     * @param event The element representing the number being interacted
     */
    function mouseoutF(event) {
        if (!dragging)
            restoreCursor();
    }

    /**
     * The handler for a mousedown event on a sweep number. Prepares the variables to be used
     * in case of mousedown -> drag
     * 
     * @param event The element representing the number being interacted
     */
    function mousedownF(event) {
        sweepElement = event.target;
        event.target.setAttribute('readonly', 'true');
        originalNumber = event.target.dataset.value;
        startingX      = event.pageX;
        dragging       = true;
    }

    /**
     * Handler on mousemove checks if there's actual dragging or not. If it is, changes
     * the number value according to the distance dragged.
     * 
     * @param event The element representing the number being interacted
     */
    function mousemoveF(event) {
        if (dragging) {
            let moved = Math.floor(event.pageX - startingX);
            sweepElement.dataset.value = clean(originalNumber) + moved;
            sweepElement.value = options.onlyPositive && sweepElement.dataset.value < 0
                ? 0
                : decorate(sweepElement.dataset.value);
            updateInputWidth(sweepElement);
        }
    }
    /**
     * Mouseup event handler. A mouseup stops the dragging gesture at all times.
     * It restores the cursor.
     * 
     */
    function mouseupF() {
        dragging = false;
        restoreCursor();
    }

    /**
     * This function is called when clicking a sweep number and it converts it into
     * an input field that's transparent, to alter the number manually and dynamically.
     * Either pressing 'Enter' or clicking away will turn the input back to a span element.
     *
     * @param event The element representing the number being interacted
     */
    function clickF(event) {
        event.target.removeAttribute('readonly');
    }

    /**
     * Filter out anything other than numbers and use Enter to blur the element
     *
     * @param event The element representing the number being interacted
     */
    function keypressF(event) {
        // first we have the number codes and then 189 is the code for dash used in negative numbers
        if (!(event.keyCode >= 48 && event.keyCode <= 57 || (!options.onlyPositive && event.keyCode === 45))) {
            // Manage Enter key
            if (event.keyCode === 13)
                blurF(event);
            // Reject any other key
            event.preventDefault();
        } else
            updateInputWidth(event.target);
    }

    function blurF(event) {
        event.target.dataset.value = clean(sweepElement.value);
        event.target.value = decorate(sweepElement.dataset.value);
        event.target.blur();
        event.target.setAttribute('readonly', 'true');
    }

    function updateInputWidth(element) {
        element.style.width = element.value.length + 'em';
    }

    function decorate(value) {
        if (options.splitThousands)
            value = value.toLocaleString();
        return options.suffix + value + options.prefix;
    }

    function clean(stringOfNumber){
        return parseInt(/[0-9]+/.exec(stringOfNumber));
    }
};
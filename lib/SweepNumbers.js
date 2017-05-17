'use strict';
/**
 * A micro library to change the number values in the DOM by sweeping them left or right
 *
 * Surround the number you want to activate with a span tag, class "sweep" like so:
 * <h3><span class="sweep">104</span></h3>
 *
 * It's designed to work only with integers, both positive and negative.
 * 
 */

let Sweep = (options = false) => {
    const inOptions = {};
    // Browser standard valid cursors
    inOptions.validCursors = ['auto', 'default', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ns-resize', 'ew-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'nesw-resize', 'nwse-resize'];
    // We scan the page once in page load and process all the span.sweep's
    // const $sweeps = document.querySelectorAll('span.sweep');
    const $sweeps = document.querySelectorAll('input.sweep');
    // No span.sweep's? Nothing to do
    if (!$sweeps > 0) return;

    let startingX, // x coordinate of the mouse when started dragging
        target, // sweep element the dragging started on
        originalNumber, // sweep element's original value
        dragging; // are we currently dragging?

    // Every SweepNumber has to be ready to react to a variety of events
    for (let i = 0, len = $sweeps.length; i < len; i++) {
        $sweeps[i].setAttribute('readonly', 'true');
        $sweeps[i].addEventListener('mouseover', mouseoverF);
        $sweeps[i].addEventListener('mouseout', mouseoutF);
        $sweeps[i].addEventListener('mousedown', mousedownF);
        $sweeps[i].addEventListener('click', clickF);
        $sweeps[i].addEventListener('keypress', keypressF);
        $sweeps[i].addEventListener('blur', blurF);
        // Adjust all input's width
        updateWidth($sweeps[i]);

        // These need to be 'listened' by the document to work properly
        document.addEventListener('mousemove', mousemoveF);
        document.addEventListener('mouseup', mouseupF);
    }

    /**
     * Simple and easy way to restore the cursor style
     */
    function restoreIcon(event) {
        document.body.style.cursor = 'default';
        event.target.style.cursor = 'auto';
    }

    /**
     * Actions to take when the mouse is over a SweepNumber.
     * So far, we change the cursor type to indicate it is sweepable
     */
    function mouseoverF() {
        if (options.icon && inOptions.validCursors.includes(options.icon)) {
            document.body.style.cursor = options.icon;
            event.target.style.cursor = options.icon;
        } else
            document.body.style.cursor = 'ew-resize';
    }

    /**
     * Cleanup actions when finishing hovering a number, sometimes sweeping it
     */
    function mouseoutF(event) {
        if (!dragging)
            restoreIcon(event);
    }

    /**
     * The handler for a mousedown event on a sweep number. Prepares the variables to be used
     * in case of mousedown -> drag
     * @param event - the element representing the number being interacted
     */
    function mousedownF(event) {
        event.target.setAttribute('readonly', 'true');
        target = event.target;
        originalNumber = event.target.value;
        startingX = event.pageX;
        dragging = true;
    }

    /**
     * Handler on mousemove checks if there's actual dragging or not. If it is, changes
     * the number value according to the distance dragged.
     * @param event - the element representing the number being interacted
     */
    function mousemoveF(event) {
        if (dragging) {
            let moved = Math.floor(event.pageX - startingX);
            target.value = parseInt(originalNumber) + moved;
            updateWidth(event.target);
        }
    }

    /**
     * Mouseup event handler. A mouseup stops the dragging gesture at all times.
     * It restores the mouse icon.
     */
    function mouseupF(event) {
        dragging = false;
        restoreIcon(event);
    }

    /**
     * This function is called when clicking a sweep number and it converts it into
     * an input field that's transparent, to alter the number manually and dynamically.
     * Either pressing 'Enter' or clicking away will turn the input back to a span element.
     * @param event
     */
    function clickF(event) {
        event.target.removeAttribute('readonly');
    }

    /**
     * Filter out anything other than numbers and use Enter to blur the element
     * @param {*} event 
     */
    function keypressF(event) {
        if (event.keyCode < 48 || event.keyCode > 57) {
            // Manage Enter key
            if (event.keyCode === 13) {
                blurF(event);
            }
            event.preventDefault();
        } else {
            updateWidth(event.target);
        }
    }

    function blurF(event) {
        event.target.blur();
        event.target.setAttribute('readonly', 'true');
    }

    function updateWidth(element) {
        element.style.width = element.value.length + 'em';
    }
};
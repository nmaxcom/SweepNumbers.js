'use strict';
/**
 * A micro library to change the number values in the DOM by sweeping them left or right
 *
 * Surround the number you want to activate with a span tag, class "sweep" like so:
 * <h3><span class="sweep">104</span></h3>
 *
 */

let Sweep = (options = false)=>{
    /**
     * Merely for debugging purposes
     */
        // function d(value,label){
        //     console.info(`${label}: ${value}`);
        //     return value;
        // }

    const inOptions        = {};
    inOptions.validCursors = ['auto', 'default', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ns-resize', 'ew-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'nesw-resize', 'nwse-resize'];
    const $sweeps          = document.querySelectorAll('span.sweep');
    if(!$sweeps > 0) return;

    let startingX,      // x coordinate of the mouse when started dragging
        target,         // sweep element the dragging started on
        originalNumber, // sweep element's original value
        dragging;       // are we currently dragging?

    function restoreIcon(){
        document.body.style.cursor = 'default';
    }

    function mouseoverF(){
        if(options.icon && inOptions.validCursors.includes(options.icon))
            document.body.style.cursor = options.icon;
        else
            document.body.style.cursor = 'ew-resize';
    }

    function mouseoutF(){
        if(!dragging)
            restoreIcon();
    }

    function mousedownF(event){
        event.preventDefault();
        target         = event.target;
        originalNumber = event.target.innerHTML;
        startingX      = event.pageX;
        dragging       = true;
    }

    function mousemoveF(event){
        if(dragging){
            let moved        = Math.floor(event.pageX - startingX);
            target.innerHTML = parseInt(originalNumber) + moved;
        }
    }

    function mouseupF(){
        dragging = false;
        restoreIcon();
    }

    function clickF(event){
        let $input = document.createElement('input');
        $input.classList.add('sweep');
        $input.value = event.target.innerText;
        $input.addEventListener('keypress', (event)=>{
            if(event.key === 'Enter'){
                event.target.blur();
            }
        });
        event.target.parentNode.replaceChild($input, event.target);
        $input.focus();

        $input.addEventListener('blur', (event)=>{
            let $span = document.createElement('span');
            $span.classList.add('sweep');
            $span.innerText = event.target.value;
            $span.addEventListener('mouseover', mouseoverF);
            $span.addEventListener('mouseout', mouseoutF);
            $span.addEventListener('mousedown', mousedownF);
            $span.addEventListener('click', clickF);
            event.target.parentNode.replaceChild($span, event.target);
        });
    }

    for(let i = 0, len = $sweeps.length; i < len; i++){
        $sweeps[i].addEventListener('mouseover', mouseoverF);
        $sweeps[i].addEventListener('mouseout', mouseoutF);
        $sweeps[i].addEventListener('mousedown', mousedownF);
        $sweeps[i].addEventListener('click', clickF);
        document.addEventListener('mousemove', mousemoveF);
        document.addEventListener('mouseup', mouseupF);
    }
};



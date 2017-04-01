'use strict';
/**
 * Nano library to change the value of numbers in the DOM by sweeping them left or right
 *
 * Surround the number you want to activate with a span tag, class "sweep" like so:
 * <h3> <span class="sweep"> 104 </span> </h3>
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

    let $sweeps = document.querySelectorAll('span.sweep');
    if(!$sweeps > 0) return;

    let startingX, target, originalNumber, dragging;

    function restoreIcon(){
        document.body.style.cursor = 'default';
    }

    function mouseoverF(){
        document.body.style.cursor = 'ew-resize';
    }


    function mouseoutF(){
        if(!dragging)
            restoreIcon();
    }

    function mousedownF(e){
        e.preventDefault();
        target         = e.target;
        originalNumber = e.target.innerHTML;
        startingX      = e.pageX;
        dragging       = true;
    }

    function mousemoveF(e){
        if(dragging){
            let moved        = Math.floor(e.pageX - startingX);
            target.innerHTML = parseInt(originalNumber) + moved;
        }
    }

    function mouseupF(){
        dragging = false;
        restoreIcon();
    }

    for(let i = 0, len = $sweeps.length; i < len; i++){
        $sweeps[i].addEventListener('mouseover', mouseoverF);
        $sweeps[i].addEventListener('mouseout', mouseoutF);
        $sweeps[i].addEventListener('mousedown', mousedownF);
        document.addEventListener('mousemove', mousemoveF);
        document.addEventListener('mouseup', mouseupF);
    }
};



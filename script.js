/**
 * Nano library to change the value of numbers in the DOM by sweeping them left or right
 *
 * Surround the number you want to activate with a span tag, class "sweep" like so:
 * <h3> <span class="sweep"> 104 </span> </h3>
 *
 */

{
    'use strict';

    window.onload = function(){

        let $sweeps = document.querySelectorAll('span.sweep');
        if(!$sweeps > 0) return;

        for(let i = 0, len = $sweeps.length; i < len; i++){
            console.info($sweeps[i]);

            $sweeps[i].addEventListener('mouseover', () => document.body.style.cursor = 'ew-resize');
            $sweeps[i].addEventListener('mouseout', () => document.body.style.cursor = 'default');
        }

        let startingX, target, originalValue, dragging;
        document.onmousedown = (e) =>{
            if(e.target.className === 'sweep'){
                e.preventDefault();
                target        = e.target;
                originalValue = e.target.innerHTML;
                startingX     = e.pageX;
                dragging      = true;
            }
        };

        document.onmousemove = (e) =>{
            if(dragging){
                let moved         = Math.floor((e.pageX - startingX) * 0.01 * originalValue);
                target.innerHTML  = parseInt(originalValue) + moved;
                let $result       = document.getElementById('result');
                let $input1       = document.querySelectorAll('.sweep')[0].innerHTML;
                let $input2       = document.querySelectorAll('.sweep')[1].innerHTML;
                $result.innerHTML = parseInt($input1) + parseInt($input2);
            }
        };

        document.onmouseup = () =>{
            dragging = false;
        };
    };
}


/**
 * Nano library to change the value of numbers in the DOM by sweeping them left or right
 *
 * - todo: re-write to 100% ES6
 */

{
    'use strict';

    window.onload = function(){

        let $sweeps = document.querySelectorAll('.sweep');
        if (!$sweeps>0) return;

        for(let i = 0, len = $sweeps.length; i < len; i++){
            console.info($sweeps[i]);

            $sweeps[i].onmouseover = document.body.style.cursor = 'ew-resize';
            $sweeps[i].onmouseout = document.body.style.cursor = 'default';
        }

        var startingX, target, originalValue, dragging;
        document.onmousedown = (e) =>{
            if(e.target.className === "sweep"){
                e.preventDefault();
                target        = e.target;
                originalValue = e.target.innerHTML;
                startingX     = e.pageX;
                dragging      = true;
            }
        };

        document.onmousemove = (e) =>{
            if(dragging){
                var moved         = Math.floor((e.pageX - startingX) * 0.01 * originalValue);
                target.innerHTML  = parseInt(originalValue) + moved;
                var $result       = document.getElementById('result');
                var $input1       = document.querySelectorAll('.sweep')[0].innerHTML;
                var $input2       = document.querySelectorAll('.sweep')[1].innerHTML;
                $result.innerHTML = parseInt($input1) + parseInt($input2);
            }
        };

        document.onmouseup = () =>{
            dragging = false;
        };
    };
}


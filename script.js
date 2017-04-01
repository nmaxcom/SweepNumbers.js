/**
 * Nano library to change the value of numbers in the DOM by sweeping them left or right
 *
 * Surround the number you want to activate with a span tag, class "sweep" like so:
 * <h3> <span class="sweep"> 104 </span> </h3>
 *
 */

{
    'use strict';

    window.onload = ()=>{
        /**
         * Merely for debugging purposes
         */
        function d(value,label){
            console.info(`${label}: ${value}`);
            return value;
        }

        let $sweeps = document.querySelectorAll('span.sweep');
        if(!$sweeps > 0) return;
        function restoreIcon(){
            document.body.style.cursor = 'default';
        }

        for(let i = 0, len = $sweeps.length; i < len; i++){
            let startingX, target, originalNumber, dragging;

            // console.info($sweeps[i]);

            $sweeps[i].addEventListener('mouseover', () =>{
                // console.info('mouseover');

                document.body.style.cursor = 'ew-resize';
            });
            $sweeps[i].addEventListener('mouseout', ()=>{
                // console.info('mouseout');

                if(!dragging)
                    restoreIcon();
            });
            $sweeps[i].addEventListener('mousedown', (e)=>{
                // console.info('mousedown');
                e.preventDefault();
                target         = e.target;
                originalNumber = e.target.innerHTML;
                startingX      = e.pageX;
                dragging       = true;
            });
            document.addEventListener('mousemove', (e)=>{
                // console.info('mousemove');
                if(dragging){
                    let moved        = Math.floor(d((e.pageX - startingX),'e.pageX - startingX'));
                    target.innerHTML = parseInt(originalNumber) + moved;
                }
            });
            document.addEventListener('mouseup', () =>{
                // console.info('mouseup');
                dragging = false;
                restoreIcon();
            });
        }
    };
}


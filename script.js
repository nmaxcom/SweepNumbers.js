(function(){
    window.onload = () =>{
        var $sweeps = document.querySelectorAll('.sweep');

        var startingX, target, originalValue, dragging;
        document.onmousedown = (e)=>{
            if(e.target.className === "sweep"){
                e.preventDefault();
                target        = e.target;
                originalValue = e.target.innerHTML;
                startingX     = e.pageX;
                dragging      = true;
            }
        };
        document.onmousemove = (e)=>{
            if(dragging){
                var moved         = Math.floor((e.pageX - startingX) * 0.01 * originalValue);
                target.innerHTML  = parseInt(originalValue) + moved;
                var $result       = document.getElementById('result');
                var $input1       = document.querySelectorAll('.sweep')[0].innerHTML;
                var $input2       = document.querySelectorAll('.sweep')[1].innerHTML;
                $result.innerHTML = parseInt($input1) + parseInt($input2);
            }
        };
        document.onmouseup   = (e) =>{
            dragging = false;
        };
    };
})();


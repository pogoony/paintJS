document.addEventListener('DOMContentLoaded', function() {

    const canvas = document.getElementById('jsCanvas');
    const ctx = canvas.getContext('2d');
    const range = document.getElementById('jsRange');
    const colors = document.getElementById('jsColors');
    const modeBtn = document.getElementById('jsMode');
    const saveBtn = document.getElementById('jsSave');
    
    const INITAL_COLOR = '#2c2c2c';

    let painting = false; 
    let mode = 'painting';

    function handleClickSave(event) {

        var link = document.createElement('a');
        link.addEventListener('click', function(event) {
            link.href = canvas.toDataURL('image/jpeg');
            link.download = `save.jpg`;
        });
        link.click();
    }

    function handleClickMode(event) {

        if(mode == 'painting') {
            
            mode = 'filling';
            modeBtn.innerText = 'Paint';

        } else {

            mode = 'painting';
            modeBtn.innerText = 'Fill';
        }
    }

    function selectColorBtn() {

        children = colors.children;

        for(let i = 0; i < children.length; i++) {
            children[i].classList.remove('on');
        }

        event.target.classList.add('on');        
    }

    function handleClickColors(event) {

        ctx.fillStyle = event.target.style.backgroundColor;
        ctx.strokeStyle = event.target.style.backgroundColor;

        selectColorBtn();
    }

    function handleChangeRange(event) {

        ctx.lineWidth = range.value;
    }

    function stopPainting() {

        if(painting == true) {

            painting = false;          

            ctx.stroke();
        }
    }

    function startPainting(x, y) {

        if(painting == false) {

            painting = true;

            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }

    function drawPainting(x, y) {

        if(painting == true) {

            if(mode == 'painting') {

                ctx.lineTo(x, y);
                ctx.stroke();

            } else {

                ctx.fillRect(0,0,canvas.width, canvas.height);
            }
        }
    }

    function onMouseMove(event) {
        const x  = event.offsetX;
        const y  = event.offsetY;

        drawPainting(x, y);
    }

    function onMouseDown(event) {
        
        const x  = event.offsetX;
        const y  = event.offsetY;

        startPainting(x, y);
    }

    function onMouseUp(event) {

        stopPainting();
    }

    function handleCM(event) {
        event.preventDefault();
    }

    function init() {

        ctx.fillStyle = 'white';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.lineWidth = range.value;
        ctx.strokeStyle = INITAL_COLOR;
        ctx.fillStyle = INITAL_COLOR;

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mouseleave', stopPainting);
        
        range.addEventListener('change', handleChangeRange);
        modeBtn.addEventListener('click', handleClickMode);
        saveBtn.addEventListener('click', handleClickSave);
        colors.addEventListener('click', handleClickColors);     
        
        canvas.addEventListener('contextmenu', handleCM);
    }

    init();
});


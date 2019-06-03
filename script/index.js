'use strict'
let actualSlide = 1;
let frame = 0;

window.addEventListener('load', startIndex);

function startIndex() {
    slide(actualSlide);
    setInterval(()=>{
        if(frame === 75){
            actualSlide++;
            slide(actualSlide);
            frame = 0;
        }
        frame++;
    }, 100);
    checkLoggedIn();
    document.getElementById('dart_icon').addEventListener('click', () => {
        scroll('#navigation');
    });
    document.getElementById('scrollAbout').addEventListener('click', () =>{
        scroll('#about');
    });
    document.getElementById('scrollFeatures').addEventListener('click', () =>{
        scroll('#features');
    });
    document.getElementById('scrollPractice').addEventListener('click', () =>{
        scroll('#practice');
    });
    document.getElementById('scrollStats').addEventListener('click', () =>{
        scroll('#stats');
    });
    document.getElementById('scrollTimeline').addEventListener('click', () =>{
        scroll('#timeline');
    });
    document.getElementById('linkBox1').addEventListener('click', ()=>{
        scroll('#navigation');
    });
    document.getElementById('left').addEventListener('click', () =>{
        frame = 0;
        actualSlide--;
        slide(actualSlide);
    });
    document.getElementById('right').addEventListener('click', ()=>{
        frame = 0;
        actualSlide++;
        slide(actualSlide);
    });
    document.getElementById('btn').addEventListener('click', openRegister);
}


function slide(slide){
    let slides = document.getElementsByClassName('slide');

    if(slide > slides.length){
        actualSlide = 1;
    }
    else if(slide == 0){
        actualSlide = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[actualSlide - 1].style.display = 'block';
    changeColor(actualSlide);
}

function scroll(scrollTo){
    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top
    }, 750);
}

function changeColor(slide){
    console.log(slide);
    switch(slide){
        // case 4:
        // case 6:
        //     document.getElementById('dart_icon').src = './images/dart_icon_grey.svg';
        //     document.getElementById('right').style.color = 'grey';
        //     document.getElementById('left').style.color = 'grey';
        //     break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        document.getElementById('dart_icon').src = './images/dart_icon_white.svg';
        document.getElementById('right').style.color = 'white';
            document.getElementById('left').style.color = 'white';
        break;
    }
}

// function hoverFunctionLinkBox(){
//     let element, box;

//     for (let i = 1; i < 7; i++) {
        
//         element = 'arrow' + i;
//         box = 'linkBox' + i;
        
//         console.log(element);
//         console.log(box);
        
//         document.getElementById(box).addEventListener('mouseover', ()=>{
//             document.getElementById(element).style.color = 'yellow';
//         });
//         document.getElementById(box).addEventListener('mouseout', ()=>{
//             hoverArrowOut(element);
//         });
//     }
// }

function hoverArrow(elementToChange){
    console.log(elementToChange);
    document.getElementById(elementToChange).style.color = 'yellow';
}

function hoverArrowOut(elementToChange){
    console.log(elementToChange);
    document.getElementById(elementToChange).style.color = 'white';
}

function openRegister(){
    window.open('./html/register.html', '_self');
}
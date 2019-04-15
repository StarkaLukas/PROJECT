'use strict'
let actualSlide = 1;
let frame = 0;


function start() {
    slide(actualSlide);
    setInterval(()=>{
        if(frame === 50){
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
    document.getElementById('scrollDart').addEventListener('click', () =>{
        scroll('#dart');
    });
    document.getElementById('scrollTimeline').addEventListener('click', () =>{
        scroll('#timeline');
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
}

function scroll(scrollTo){
    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top
    }, 750);
}
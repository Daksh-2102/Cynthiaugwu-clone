    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });

    // cursor movement
    function firstpageanimation(){
        var timelin = gsap.timeline();

        timelin.from(".nav",{
            y:'-10',
            opacity:0,
            duration:1.5,
            ease:Expo.easeInOut
        })
        .to(".boundingelem",{
            y: 0,
            ease:Expo.easeInOut,
            duration:1.8,
            delay:-1,
            stagger:.2 // delay dega yeh
        })
        .from(".footer",{
            y:-10,
            opacity:0,
            duration:1.5,
            delay:-1,
            ease:Expo.easeInOut
        })
    }

    // jb mouse move ho tohskew kar paye aur maximum skew and minimum skew define kar paye,jb mouse move ho toh chapta ki value bdey
    // aur jb moude chlna bnd  ho jaye toh chpata ko htao

    var timeout;

    function chptakro(){
        //define default scale value 
        var xscale = 1;
        var yscale = 1;

        var xprev = 0;
        var yprev = 0;

        window.addEventListener("mousemove",function(dets){
            // var xdiff = dets.clientX - xprev;
            // var ydiff = dets.clientY - yprev;

            clearTimeout(timeout);

            xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
            yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

            xprev = dets.clientX;
            yprev = dets.clientY;
            // console.log(xdiff,ydiff);

            cursormovement(xscale,yscale);

        timeout = setTimeout(function(){
                document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`; 
            },100)
        });


    }
    // chptakro();

    function cursormovement(xscale,yscale){
        window.addEventListener("mousemove" ,function (dets) {
            // console.log(dets.clientX,dets.clientY );
            document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale} , ${yscale})`; 
        })
    }
    chptakro();
    cursormovement(); 
    firstpageanimation();   

    // second page website ka
    // teeno elem ko select kro ,uske bdh teeno pr mousemove lgao,jb mousemove ho toh yeh pta lgao ki mouse khn 
    // par hai .. jiska mtlb hai ki mouse ki x and y position pta kro
    // ab mouse ki x and y position ke bdle us img ko show kro and uss img ko move kro
    // move krte tym rotate kro and jsey jsey move fast chle vse vse rotation b fast ho jaye'!

    document.querySelectorAll(".elem")
    .forEach(function(elem){
        // var diff = 0;
        elem.addEventListener("mousemove",function(dets){
            // console.log(details.clientX,details.clientY);
            var diff = dets.clientY - elem.getBoundingClientRect().top; 
            gsap.to(elem.querySelector(".elem img"),{
                opacity : 1,
                ease : Power1,
               top : diff,
                left : dets.clientX
            });
        });
    });

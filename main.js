const imagesConstainer = document.querySelector(".sliderContainer"),
firstImage = document.querySelectorAll("img")[0] ,
sliderBtn = document.querySelectorAll(".imageSlider i");
let isDragingStart = false,isDragging = false ,
prevPageX ,
prevScrollLeft ,
positionDiff ,
images = [...imagesConstainer.children] ,
firstImgWidth = firstImage.offsetWidth ,
imagePerview = Math.round(imagesConstainer.offsetWidth / firstImgWidth) ,
timeoutId;

images.slice(-imagePerview).reverse().forEach(img =>{
    imagesConstainer.insertAdjacentHTML("afterbegin",img.outerHTML)
})

images.slice(0,imagePerview).forEach(img =>{
    imagesConstainer.insertAdjacentHTML("beforeend",img.outerHTML)
})


sliderBtn.forEach((btn)=>{
    btn.addEventListener("click" ,()=>{
        imagesConstainer.scrollLeft += btn.id == "left" ? -firstImgWidth : firstImgWidth
        if (imagesConstainer.scrollLeft >= scrollWidth) {
            imagesConstainer.scrollLeft == 0
        }
    });
});

const autoSlide = () => {
    if (imagesConstainer.scrollLeft == (imagesConstainer.scrollWidth - imagesConstainer.clientWidth)) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImage.clientWidth;
    let valDifference = firstImgWidth - positionDiff
    if (imagesConstainer.scrollLeft > prevScrollLeft) {
        return imagesConstainer.scrollLeft += positionDiff > firstImgWidth /2 ? valDifference : -positionDiff;
    }
    imagesConstainer.scrollLeft -= positionDiff > firstImgWidth /2 ? valDifference : -positionDiff;

}
const dragStart = (e) => {
    isDragingStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = imagesConstainer.scrollLeft;
    e.preventDefault();
}


const dragging = (e) =>{
    if(!isDragingStart) return ;
    isDragging = true;
    e.preventDefault();
    imagesConstainer.classList.add("dragging")
    positionDiff = ( e.pageX || e.touches[0].pageX ) - prevPageX
    imagesConstainer.scrollLeft = prevScrollLeft - positionDiff;
}
const dragEnd = () => {
    isDragingStart = false;
    if (!isDragging) return;
    isDragging=false
    imagesConstainer.classList.remove("dragging")
    autoSlide();
}
const autoPlay = ()=>{
    if(window.innerWidth < 800 ) return;
    timeoutId = setTimeout(() => imagesConstainer.scrollLeft += firstImgWidth , 3000)
}
autoPlay(); 
const infiniteScroll = () => {
    if(imagesConstainer.scrollLeft === 0) {
        imagesConstainer.classList.add("no-transition")
        imagesConstainer.scrollLeft = imagesConstainer.scrollWidth - (2 * imagesConstainer.offsetWidth)
        imagesConstainer.classList.remove("no-transition")
    } else if (Math.ceil(imagesConstainer.scrollLeft) === imagesConstainer.scrollWidth - imagesConstainer.offsetWidth) {
        imagesConstainer.classList.add("no-transition")
        imagesConstainer.scrollLeft = imagesConstainer.offsetWidth
        imagesConstainer.classList.remove("no-transition")
    }
    clearTimeout(timeoutId)
    if (!imagesConstainer.matches(":hover")) autoPlay(); 
}
imagesConstainer.addEventListener("mousemove" , dragging)
imagesConstainer.addEventListener("touchmove" , dragging)

imagesConstainer.addEventListener("mousedown" , dragStart)
imagesConstainer.addEventListener("touchstart" , dragStart)

imagesConstainer.addEventListener("mouseleave" , dragEnd)
imagesConstainer.addEventListener("touchend" , dragEnd)

document.addEventListener("mouseup" , dragEnd)
imagesConstainer.addEventListener("scroll" , infiniteScroll)
imagesConstainer.addEventListener("mouseenter" , ()=>clearTimeout(timeoutId))
imagesConstainer.addEventListener("mouseleave" , autoPlay)

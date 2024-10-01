// Pre Loader
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("content").style.display = "block";
  }, 3000); // Adjust the duration as needed
});

// Status Bar

const statusbar = document.querySelectorAll(".status-bar");

statusbar.forEach(bar => {
  const percent = bar.dataset.percent;
  bar.style.width = percent + '%';
});

// Second Slider
let SlideIndex = 1;
showSlides(SlideIndex);

function plusSlides(n) {
  showSlides(SlideIndex += n);
}

function currentSlide(n) {
  showSlides(SlideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {SlideIndex = 1}    
  if (n < 1) {SlideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[SlideIndex-1].style.display = "block";
  dots[SlideIndex-1].className += " active";
}
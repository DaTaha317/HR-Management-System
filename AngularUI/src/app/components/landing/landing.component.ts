import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  images: string[] = [
    'https://th.bing.com/th/id/R.c75a8033076962826e7ab6b1dc136ec9?rik=GVT5bpBkWf2lqg&pid=ImgRaw&r=0',
    'https://www.businessmanagementdaily.com/app/uploads/2020/10/HR-technology-HR-tech-tech-technology-556x400-hr.jpg',
    'https://th.bing.com/th/id/OIP.KB5kSwpMTMLzVflPcIAnaAHaEn?w=480&h=299&rs=1&pid=ImgDetMain',
   
    // Add more image URLs as needed
  ];


  slideIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.showSlides();
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n?: number) {
    let i;
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("dot");
    if (n == undefined) { n = ++this.slideIndex; }
    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
    setTimeout(() => this.showSlides(), 1000); // Change slide every 2 seconds
  }

}



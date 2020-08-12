import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'expandable-header',
  styleUrls: ['expandable-header.scss'],
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {

    @Input('scrollArea') scrollArea: any;
    @Input('headerHeight') headerHeight: number;
   

    initHeight: number;
    newHeaderHeight: any;
   
    constructor(public element: ElementRef, public renderer: Renderer2) {
    }
   
    ngOnInit(){
 
        this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
     
        this.scrollArea.ionScroll.subscribe((ev) => {
          this.resizeHeader(ev);
        });
     
      }
     
    resizeHeader(ev){
    
      ev.domWrite(() => {
    
        this.newHeaderHeight = this.headerHeight - ev.scrollTop;
    
        if(this.newHeaderHeight < 0){
          this.newHeaderHeight = 0;
        }  
    
        this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
    
        for(let headerElement of this.element.nativeElement.children){
    
          let totalHeight = headerElement.offsetTop + headerElement.clientHeight;
    
          if(totalHeight > this.newHeaderHeight && !headerElement.isHidden){
            headerElement.isHidden = true;
            this.renderer.setStyle(headerElement, 'opacity', '0');
            this.renderer.setStyle(headerElement, 'transition', 'opacity 0s');
          } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
            headerElement.isHidden = false;
            this.renderer.setStyle(headerElement, 'opacity', '1');
            this.renderer.setStyle(headerElement, 'transition', 'opacity 1s');
          }
    
        }
    
      });
    
    }
}

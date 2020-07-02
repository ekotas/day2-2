var pixctx=canvas.getContext('2d');
class Graphics2d
{
    constructor(f,xmin,xmax,ymin,ymax,w,h,vec)
    {
        this.f=f;
        this.xmin=xmin;
        this.xmax=xmax;
        this.ymin=ymin;
        this.ymax=ymax;
        this.w=parseInt(w);
        this.h=parseInt(h);
        this.vec=vec;
    }
    draw()
    {
        var  imgData = pixctx.getImageData(0,0,this.w,this.h);
        var   RGBA =  imgData.data;
        let X = 0;
        let Y = 0;
        for(let p=0; p<this.w*this.h*4; p+=4)
        { 
          let dx=this.w/(this.xmax-this.xmin);
          let dy=this.h/(this.ymax-this.ymin);
        let x =  X/(dx*10);
        let y = -Y/(dy*10); 
             x -= (this.xmax/10);      
             y += (this.ymax/10);      
               const th=4/256;   
               let axis_x =  Math.abs(y) < th ;
               let axis_y =  Math.abs(x) < th ;
                let axes =  (axis_x+axis_y)*64;
      
               let grid_vertical   =  Math.abs(x%1) < th
               let grid_horizontal =  Math.abs(y%1) < th
                 let grid = (grid_vertical+grid_horizontal)*64 
                 
                  let axes_and_grid = axes+grid

             let F= this.f(x,y); 


                   F = 1024/F;  
               
   
                   if(F>0) RGBA[p+0]=F;              
                           RGBA[p+1]=axes_and_grid;   
                   if(F<0) RGBA[p+2]=-F;             
                           RGBA[p+3]=255;            
      
     
                X++; 
                if(X==this.w)
                { 
                    X=0; 
                    Y++;
                }
        }
        pixctx.putImageData(imgData, 0, 0); 
    }
}
function Func()
{
  let W=document.getElementById("width");
let H=document.getElementById("height");
let w=parseInt(W.value);
let h=parseInt(H.value);
canvas.width=w;
canvas.height=h;

let Xmax=document.getElementById("xmax");
let Xmin=document.getElementById("xmin");
let Ymax=document.getElementById("ymax");
let Ymin=document.getElementById("ymin");
let xmax=parseInt(Xmax.value);
let xmin=parseInt(Xmin.value);
let ymax=parseInt(Ymax.value);
let ymin=parseInt(Ymin.value);
let tmp=document.getElementById("asd");
let lol=tmp.value; let s1="";
    if(lol!=""){
        for(let i = 0; i < lol.length;i++){
          if(lol[i]!='x' && lol[i]!='+' && lol[i]!='-' && lol[i]!='/' 
             && lol[i]!='*' && lol[i]!='('&& lol[i]!=')' && !(lol[i]>='0' && lol[i]<='9') && lol[i]!=' ' && lol[i]!='.'){
            s1+="Math."
            while(lol[i]!=')')
            {
                s1+=lol[i];
                i++;
            }
            s1+=lol[i];
          }
          else 
          {
            s1+=lol[i];
          }
        }
    }
    else
    {
        s1="x*x+y*y";
    }
    console.log(s1);
    let f=function(x,y){
        return eval(s1);
    }
let vec=[];
var graph=new Graphics2d(f,xmin,xmax,ymin,ymax,w,h,vec);
graph.draw();
}
// // export default function draw(picUrl: string){
// //     const canvas:any = document.getElementById('svsPic');
// //     const context:any = canvas.getContext('2d');
// //     const img = new Image();
// //     img.src = picUrl;
// //     img.onload = () => {
// //         context.drawImage(img, 0, 0);
// //     }
// // }
// import * as d3 from 'd3';
// import { PIC_SIZE as picSize, ROI_BG_COLOR as roiBgColor } from '../constant';
// import { IPicInfo } from '../store';

// export default function draw(pic: IPicInfo){

//     if(d3.select('svg')){
//         d3.select('svg').remove();
//     }

//     const svg = d3.select('.main__content__pic__area')
//         .append('svg')
//         .attr('width',picSize)
//         .attr('height',picSize)
//     svg.append('image')
//         .attr('width',picSize)
//         .attr('height',picSize)
//         .attr('xlink:href',pic.picUrl)

//     let i: number;
//     let g = svg.append('g');
//     for(i=0; i<pic.roi.length; i++){
//         const roiWidth = (pic.roi[i].x2 - pic.roi[i].x1) * (picSize/pic.picWidth);
//         const roiHeight = (pic.roi[i].y2 - pic.roi[i].y1)  * (picSize/pic.picHeight);
//         const roiPosX = pic.roi[i].x1 / pic.picWidth * picSize;
//         const roiPosY = pic.roi[i].y1 / pic.picHeight * picSize;
//         let roiColor: string;
//         switch(pic.roi[i].status){
//             case 'true':
//                 roiColor = roiBgColor.true;
//                 break;
//             case 'false':
//                 roiColor = roiBgColor.false;
//                 break;
//             case 'unlabeled':
//                 roiColor = roiBgColor.unlabelled;
//                 break;
//             default: 
//                 roiColor = 'black';
//         }
//         g.append('rect')
//             .attr('width',roiWidth)
//             .attr('height',roiHeight)
//             .attr('x',roiPosX)
//             .attr('y',roiPosY)
//             .attr('fill','none')
//             .attr('stroke',roiColor)
//             .attr('stroke-width',"2.5")
//         // g.append('text')
//         //     .attr('')
//         // svg.append('rect')
//         //     .attr('width',)
//     }
// }
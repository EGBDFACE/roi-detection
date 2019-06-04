export default function draw(picUrl: string){
    const canvas:any = document.getElementById('svsPic');
    const context:any = canvas.getContext('2d');
    const img = new Image();
    img.src = picUrl;
    img.onload = () => {
        context.drawImage(img, 0, 0);
    }
}
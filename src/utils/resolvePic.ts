import { IPicInfo, IRoiInfo } from "../store";

interface IRoiItemRes{
    cancer_type: string,
    roi_id: number,
    roi_url: string,
    score: number,
    status: string,
    user_name: string,
    x1: number,
    x2: number,
    y1: number,
    y2: number
}
interface IPicDataRes{
    height: number,
    rois_data: IRoiItemRes[],
    svs_url: string,
    width: number
}
export function getPicData(value: IPicDataRes, id: number) : IPicInfo{
    const roiD: IRoiInfo[] = [];
    for(let j=0; j<value.rois_data.length; j++){
        const v = value.rois_data[j];
        roiD[j] = {
            roiId: v.roi_id,
            roiUrl: v.roi_url,
            score: v.score,
            status: v.status,
            type: v.cancer_type,
            userName:  v.user_name,
            x1: v.x1,
            x2: v.x2,
            y1: v.y1,
            y2: v.y2
        }
    }
    const pic: IPicInfo = {
        picHeight: value.height,
        picUrl: value.svs_url,
        picWidth: value.width,
        roi: roiD,
        svsId: id
    }
    return pic;
}
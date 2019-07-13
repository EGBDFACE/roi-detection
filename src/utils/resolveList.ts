import { IFileListItem } from '../store';

interface IListResItem{
    labeled_count: number,
    magnification: number,
    svs_id: number,
    total_count: number
}

export function formatListData(value:IListResItem[]) :IFileListItem[]{
    const list: IFileListItem[] = [];
    for(let i=0; i<value.length; i++){
        const v = value[i];
        list[i] = {
            labeledCount: v.labeled_count,
            magnification: v.magnification,
            svsId: v.svs_id,
            totalCount: v.total_count
        }
        // list[i].labeledCount = v.labeled_count;
        // list[i].magnification = v.magnification;
        // list[i].svsId = v.svs_id;
        // list[i].totalCount = v.total_count;
    }
    return list;
}
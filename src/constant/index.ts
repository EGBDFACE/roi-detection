// export const BASE_URL = 'http://222.20.79.250:8081/api/';
// export const BASE_URL ='http://222.20.79.123:5000';
// export const BASE_URL = 'http://222.20.79.250:5000';
export const BASE_URL = 'http://54.203.111.1:5000';
// export const BASE_URL = '/api';
// export const BASE_URL = 'http://www.elongevity.ai/api/'

interface ICancerType{
    [N:string]: string,
    R: string,
    S: string,
    T: string,
    X: string
}

export const CANCER_TYPE:ICancerType = {
    N: '粘液型',
    R: '乳头型',
    S: '实体型',
    T: '贴壁型',
    X: '腺泡型'
};

export const ROI_BG_COLOR = {
    true: '#79FF6F',
    false: '#FFE14F',
    unlabelled: '#6FFFF4'
}

export const PIC_SIZE = 600;
export const ROI_MENU_MAX_LENGTH = 130;
export const ROI_SCORE_THRESHOLD = 0.1;

export const FILE_LIST_DISPLAY_NUMBER = 90;
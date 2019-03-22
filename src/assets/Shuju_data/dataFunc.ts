import { csv } from 'd3-fetch';

interface pieDataObj{
    key:string,
    value:number
}

const dataArray:any[] = [];

export function dataInit(){
    csv('/dataset.csv').then(data=>{
        for(let i=0;i<data.length;i++){
            dataArray[i] = {...data[i]};
        }
    });
    console.log(dataArray);
}

export function dataChartGet(...arg:string[]){
    if(arg.length === 1){
        console.log(arg[0]);
        return countNum(dataArray.map((value,index)=>{
            return value[arg[0]];
        }))
    }else if(arg.length  === 2){
        
    }
}

function countNum(inputArray:any[]){
    let outputArray:any[] = [];
    for(let i = 0;i<inputArray.length;i++){
        if(JSON.stringify(outputArray).indexOf(inputArray[i]) == -1){
            // let tempObj:{key:string,value:number} = ;\
            let tempObj: pieDataObj = {key:'',value:0 };
            tempObj.key = inputArray[i];
            tempObj.value = 1;
            outputArray.push(tempObj);
        }else{
            for(let j=0;j<outputArray.length;j++){
                if(outputArray[j].key === inputArray[i]){
                    outputArray[j].value ++;
                }
            }
        }
    }
    return outputArray;
}
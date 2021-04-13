import fs from 'fs';
import { obj } from './obj';

let data = fs.readFileSync('data.json');
let ary = JSON.parse(data.toString());
console.log(ary);

let currentCat='';
let currentSubCat='';
let finalAry:obj[]=[];
let currentObj:obj|null=null;
for(let row of ary)
{
    if(currentObj===null)
    {
        AddNewTopLevelNode(row);
    }
    else if(row.ImageCategory_Description===currentCat &&  row.ImageSubCategory_Description==currentSubCat)
    {
        AddNewLeaf(row);
    }
    else if(row.ImageCategory_Description===currentCat)
    {
        AddNewIntermediateNode(row);
    }
    else
    {
        AddNewTopLevelNode(row);
    }
}

console.log(JSON.stringify(finalAry));

function AddNewIntermediateNode(row: any) {
    currentObj!.children!.push(new obj());
    currentObj!.children![currentObj!.children!.length - 1].name = row.ImageSubCategory_Description;
    currentObj!.children![currentObj!.children!.length - 1].children = [];
    currentObj!.children![currentObj!.children!.length - 1].children!.push(new obj());
    currentObj!.children![currentObj!.children!.length - 1].children![0].name = row.Image_ImageFileName;
    currentSubCat = row.ImageSubCategory_Description;
}

function AddNewLeaf(row: any) {
    currentObj!.children![currentObj!.children!.length - 1].children!.push(new obj());
    currentObj!.children![currentObj!.children!.length - 1].children![currentObj!.children![currentObj!.children!.length - 1].children!.length - 1].name = row.Image_ImageFileName;
}

function AddNewTopLevelNode(row: any) {
    currentObj = new obj();
    currentObj.name = row.ImageCategory_Description;
    currentObj.children = [];
    currentObj.children.push(new obj());
    currentObj.children[currentObj.children.length - 1].name = row.ImageSubCategory_Description;
    if(currentObj.children[currentObj.children.length - 1].children===null)
        currentObj.children[currentObj.children.length - 1].children=[];
    currentObj.children[currentObj.children.length - 1].children!.push(new obj());
    currentObj.children[currentObj.children.length - 1].children![0].name = row.Image_ImageFileName;
    finalAry.push(currentObj);
    currentCat = row.ImageCategory_Description;
    currentSubCat = row.ImageSubCategory_Description;
}

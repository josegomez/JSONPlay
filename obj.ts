export class obj
{
    name:string='';
    children:obj[]|null|undefined=null;
    constructor()
    {
    }

    toJSON()
    {
        if (this.children==null || this.children?.length==0)
            return {name:this.name}
        else
            return this;
    }


}  
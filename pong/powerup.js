
var PowerupType = 
{
    SPEED: 0,
    SLOW: 1
};
class Powerup extends Entity
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.frame = 0;
        this.noCollide = true;
    }
    update()
    {        
        if (!this.animfinished)
        {
            this.updateframe++;
            if (this.framelist != null)
            {
                if (this.frame == this.framelist.length - 1)
                    this.animfinished = true;
            }
            if (this.updateframe > 5)
            {
                this.frame++;
                this.updateframe = 0;
            }
        }
        else
        {
            this.frame = 0; 
            this.animfinished = false;
        }    
        super.update();
    }
    killSelf()
    {
        for (var i = 0; i < entlist.length; i++)
            if (this == entlist[i])
            {
                entlist.splice(i, 1);
                current_powerups--;
            }
         
    }
}
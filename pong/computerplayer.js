class ComputerPlayer extends Entity
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.speed = 3.5;
    }
    // Computer is interested in the closest puck
    getClosestPuck()
    {
        if (pucks.length < 1)
            return null;
        var closestPuck = pucks[0];
        for (var i = 0; i < pucks.length; i++)
            if (closestPuck.pos.x < pucks[i].pos.x)
                closestPuck = pucks[i];
        
        return closestPuck;
    }
    update()
    {
        var puck = this.getClosestPuck();

        // Is the puck moving towards me?
        if (puck.vel.x > 0)
        {
            if (puck.pos.y > this.pos.y)
                this.vel.y = this.speed;
            else if (puck.pos.y < this.pos.y)
                this.vel.y = -1 * this.speed;
            else
                this.vel.y = 0;
        }
        else
        {
            // Move towards center if puck is moving away from me
            if (this.pos.y + this.h/2 < canvas.height/2)
                this.vel.y = this.speed;
            else
                this.vel.y = -1 * this.speed;
            
        }
        super.update();
    }
}
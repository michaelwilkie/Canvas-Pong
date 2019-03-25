class Player extends Entity
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.speed = 3.5;
    }
    update()
    {
        if (isUpArrowPressed)
        {
            if (this.pos.y > 0)
                this.vel.y = -1 * this.speed;
            else
                this.pos.y = 0;
        }
        else if (isDownArrowPressed)
        {
            if (this.pos.y + this.h < canvas.height)
                this.vel.y = this.speed;
            else
                this.pos.y = canvas.height - this.h;
        }
        else
        {
            this.vel.y = 0;
        }
        super.update();
    }
}
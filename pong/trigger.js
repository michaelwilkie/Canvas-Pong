class Trigger extends Entity
{
    constructor(x, y, w, h, color="darkred")
    {
        super(x, y, w, h, null, null);
        this.noCollide = true;
        this.invisible = false;
        this.color = color;
    }
    update() { }
    draw()
    {
        if(!this.invisible)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        }
    }
}
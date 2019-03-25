class Puck extends Entity
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.frame = 2;
        this.speed = 5;
        this.vel = {x: this.speed, y: this.speed};
        pucks.push(this);
    }
    update()
    {
        if (this.pos.x + this.w > canvas.width)  this.vel.x *= -1;
        if (this.pos.x < 0)                      this.vel.x *= -1;
        if (this.pos.y + this.h > canvas.height) this.vel.y *= -1;
        if (this.pos.y < 0)                      this.vel.y *= -1;
 
        for (var i = 0; i < entlist.length; i++)
        {
            if (this == entlist[i]) // Puck: don't consider myself when checking collisions
                continue;
            if (checkCollision(this, entlist[i]))
            {
                // Only check for collisions against paddles
                // Goals and Walls have their own collision code
                sound_ping.play();
                if (!entlist[i].noCollide && !(entlist[i] instanceof Wall))
                {
                    var cp = entlist[i].pos.y + (entlist[i].h / 2);
                    var cb = this.pos.y + (this.h / 2);
                   
                    this.vel.y = -1 * (cp - cb) / 5;
 
                    if (this.vel.x < 0)
                        this.pos.x += 1;
                    else
                        this.pos.x -= 1;
                    this.vel.x *= -1;
                }
            }
        }    
        if (!this.animfinished)
        {
            this.updateframe++;
            if (this.framelist != null)
            {
                if (this.frame == this.framelist.length - 1)
                    this.animfinished = true;
            }
            if (this.updateframe > 10)
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
    resetPosition()
    {
        this.pos.x = canvas.width/2;
        this.pos.y = canvas.height/2;

        if (getRandomNumber(0, 2) == 0)
            this.vel.y = this.speed;
        else
            this.vel.y = -1 * this.speed;       

        if (getRandomNumber(0, 2) == 0)
            this.vel.x =      this.speed;
        else
            this.vel.x = -1 * this.speed;
        
    }
}
class Wall extends Entity
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.AnimEnum = { IDLE: 0, UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };
        this.framecooldown = 10;
        this.maxvel = 5;
        this.moveup = false;
    }
    update()
    {
        for (var i = 0; i < pucks.length; i++)
        {
            var puck = pucks[i];
            if (checkCollision(this, puck))
            {
                sound_bump.play();
                if (puck.vel.x < 0) puck.pos.x += 10;
                else                puck.pos.x -= 10;
                if (puck.vel.y < 0) puck.pos.y += 10;
                else                puck.pos.y -= 10;
                
                var side = checkSide(puck, this);
    
                switch(side)
                {
                    case SideEnum.LEFT : { puck.vel.x *= -1; this.frame = this.AnimEnum.LEFT ; break; }
                    case SideEnum.UP   : { puck.vel.y *= -1; this.frame = this.AnimEnum.UP   ; break; }
                    case SideEnum.RIGHT: { puck.vel.x *= -1; this.frame = this.AnimEnum.RIGHT; break; }
                    case SideEnum.DOWN : { puck.vel.y *= -1; this.frame = this.AnimEnum.DOWN ; break; }
                    default:
                    {
                        
                    }
                }
            }
            else
            {
                if (this.framecooldown <= 0)
                {
                    this.frame = this.AnimEnum.IDLE;
                    this.framecooldown = 50;
                }
                else
                    this.framecooldown--;
            }
        }
        if (this.pos.y + this.h/2 < canvas.height/2)
        {
            if (Math.abs(this.vel.y) < this.maxvel + 1)
                this.vel.y += 0.1;
            else
                this.vel.y = this.maxvel;
        }
        else
        {
            if (Math.abs(this.vel.y) < this.maxvel + 1)
                this.vel.y -= 0.1;
            else
                this.vel.y = -1*this.maxvel;
        }
        super.update();
    }
}
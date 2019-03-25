class SpeedPowerup extends Powerup
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        super(x, y, w, h, imgsrc, framelist);
        this.frame = 0;        
    }
    update()
    {
        for (var i = 0; i < entlist.length; i++)
        {
            if (this == entlist[i]) // Puck: don't consider myself when checking collisions
                continue;
            if (checkCollision(this, entlist[i]) && entlist[i] instanceof Puck)
            {
                sound_spup.play();
                entlist[i].vel.x *= 2;
                entlist[i].vel.y *= 2;
                this.killSelf();
            }            
        }
        super.update();
    }
}
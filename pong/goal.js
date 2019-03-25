class Goal extends Trigger
{
    constructor(x, y, w, h, color, playergoal)
    {
        super(x, y, w, h, color);
        this.playergoal = playergoal;
        this.isColliding = false;
    }
    setPlayerGoal()
    {
        this.playergoal = true;
    }
    setComputerGoal()
    {
        this.playergoal = false;
    }
    update()
    {
        for (var i = 0; i < pucks.length; i++)
        {
            if (checkCollision(this, pucks[i]))
            {
                if (!this.isColliding)
                {
                    sound_goal.play();
                    pucks[i].resetPosition();
                    var scrbrd = getScoreBoard();
                    if (this.playergoal)
                        scrbrd.computerScored();
                    else
                        scrbrd.playerScored();
                    this.isColliding = true;
                }
            }
            else
                this.isColliding = false;
        }
    }
}
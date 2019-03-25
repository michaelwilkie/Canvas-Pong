class ScoreBoard
{
    constructor()
    {
        this.scoreplayer = 0;
        this.scorecomputer = 0;
    }
    display()
    {
        var score = this.scoreplayer + " | " + this.scorecomputer;
       
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
 
        ctx.fillText(score, canvas.width/2 - ctx.measureText(score).width/2, 50);
    }
    playerScored()
    {
        this.scoreplayer++;
    }
    computerScored()
    {
        this.scorecomputer++;
    }
}
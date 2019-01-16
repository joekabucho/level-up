#pragma strict

private var levelUpScript : LevelUpSystem;

function Start () 
{	
	levelUpScript = GameObject.Find("First Person Controller").GetComponent(LevelUpSystem);
}

function OnTriggerEnter (Col : Collider)
{
	if(Col.tag == "Player")
	{
		Destroy(gameObject);
		levelUpScript.currentXP += 10;
	}
}
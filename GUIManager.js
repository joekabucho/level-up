var currentHealth : float = 100;
var maxHealth : int = 100;

var currentMana : float = 100.0;
var maxMana : int = 100;

var currentStamina : float = 100.0;
var maxStamina : int = 100;

var barLength = 0.0;

private var chMotor : CharacterMotor;

function Start()
{
	barLength = Screen.width / 8;
	chMotor = GetComponent(CharacterMotor);
}

function Update ()
{
	AdjustCurrentHealth (0);
	AdjustCurrentMana (0);
	
	/* MANA CONTROL SECTION*/
	
	//Normal Mana Regeneration
	if(currentMana >= 0)
	{
		currentMana += Time.deltaTime * 2;
	}
	
	//Don't let mana go above 100
	if(currentMana >= maxMana)
	{
		currentMana = maxMana;
	}
	
	//if mana reaches 0, never go below!
	if(currentMana <= 0)
	{
		currentMana = 0;
	}
	
	if(Input.GetKeyDown("f"))
	{
		AdjustCurrentMana(-20);
	}
	
	/*STAMINA CONTROL SECTION*/
	
	//Set and find charactercontroller
	var controller : CharacterController = GetComponent(CharacterController);
	
	//if you're moving and pressing shift then speed up take from stamina bar
	if(controller.velocity.magnitude > 0 && Input.GetKey(KeyCode.LeftShift))
	{
		currentStamina -= Time.deltaTime * 10;
		chMotor.movement.maxForwardSpeed = 10;
		chMotor.movement.maxSidewaysSpeed = 10;
	}
	
	//if not pressing anything, then normal movement speed
	else
	{
		chMotor.movement.maxForwardSpeed = 6;
		chMotor.movement.maxSidewaysSpeed = 6;
	}
	
	//Stamina Regeneration
	if(controller.velocity.magnitude == 0 && (currentStamina >= 0))
	{
		currentStamina += Time.deltaTime * 2;
	}
	
	//if moving, pressing shift and stamina is 0 then you cannot sprint
	if(controller.velocity.magnitude > 0 && Input.GetKey(KeyCode.LeftShift) && currentStamina <= 0)
	{
		chMotor.movement.maxForwardSpeed = 6;
		chMotor.movement.maxSidewaysSpeed = 6;
	}
	
	//if stamina regeneration set to 100, never go past
	if(currentStamina >= maxStamina)
	{
		currentStamina = maxStamina;
	}
	
	//if goes to 0, then set to 0
	if(currentStamina <= 0)
	{
		currentStamina = 0;
	}
}

function OnGUI()
{
	//Icons for GUI
	GUI.Box(new Rect(5, 30, 40, 20), "HP");
	GUI.Box(new Rect(5, 50, 40, 20), "Mana");
	GUI.Box(new Rect(5, 70, 40, 20), "Stam");
	
	//Health / Mana / Stamina main bars
	GUI.Box(new Rect(45, 30, barLength, 20), currentHealth.ToString("0") + "/" + maxHealth);
	GUI.Box(new Rect(45, 50, barLength, 20), currentMana.ToString("0") + "/" + maxMana);
	GUI.Box(new Rect(45, 70, barLength, 20), currentStamina.ToString("0") + "/" + maxStamina);
}

function AdjustCurrentHealth (adj)
{
	currentHealth += adj;
	
	if(currentHealth >= maxHealth)
	{
		currentHealth = maxHealth;
	}
	
	if(currentHealth <= 0)
	{
		currentHealth = 0;
	}
}

function AdjustCurrentMana (adj)
{
	currentMana += adj;
}
const BattleSim = {
    logElement: "",
    RunBattle: function(contestant1, contestant2, log) {
        this.logElement = log;
        this.Log(`Beginning battle between ${contestant1.name} and ${contestant2.name}.`);
        this.DoCombat(contestant1, contestant2, 1);
    },
    Log: function(text) {
        let newItem = document.createElement("p");
        newItem.innerText = text;
        this.logElement.appendChild(newItem);
    },
    Delay: function(ms) {
        return new Promise(resolve => {setTimeout(resolve, ms)});
    },
    DoCombat: async function(c1, c2, turn) {
        if(turn > 20){
            this.Log("The battle went too long. Declaring a draw.")
            return;
        }
        this.Log(`${c1.name} attacks`)
        let doubleStatus  = this.CheckDouble(c1, c2);
        this.MakeAttack(c1, c2);
        this.Delay(100);
        if(c2.currentHP > 0) {
            this.MakeAttack(c2, c1);
            this.Delay(100);
        }
        if(c1.currentHP > 0 && c2.currentHP > 0 && doubleStatus == 1) {
            this.MakeAttack(c1, c2);
            this.Delay(100);
        }
        if(c1.currentHP > 0 && c2.currentHP > 0 && doubleStatus == -1) {
            this.MakeAttack(c2, c1);
            this.Delay(100);
        }
        if(c1.currentHP == 0) {
            this.Log(`${c1.name} is down, ${c2.name} wins!`);
        } else if (c2.currentHP == 0) {
            this.Log(`${c2.name} is down, ${c1.name} wins!`);
        } else this.DoCombat(c2, c1, turn + 1);
    },
    CheckDouble: function(c1, c2) {
        if(c1.speed - 5 >= c2.speed) return 1;
        else if (c2.speed - 5 >= c1.speed) return -1
        else return 0;
    },
    MakeAttack: function(attacker, defender) {
        if(Math.random() < attacker.specialChance) this.DoSpecial(attacker, defender);
        else {
            if(Math.random() < (attacker.hit - defender.avoid)){
                let isCrit = Math.random() < attacker.critChance;
                let damage = attacker.attack - defender[attacker.targetStat];
                damage = Math.max(damage, 0);
                if (isCrit) damage *= 3;
                this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} for ${damage} damage`);
                defender.currentHP = Math.max(0, defender.currentHP - damage);
            } else {
                this.Log(`${attacker.name} missed ${defender.name}`);
            }
        }
    },
    DoSpecial: function (attacker, defender){
        switch(attacker.specialName){
            case "Sol":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = attacker.attack - defender[attacker.targetStat];
                    damage = Math.max(damage, 0);
                    if (isCrit) damage *= 3;
                    let healing = Math.min(damage / 2, defender.currentHP / 2);
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Sol for ${damage} damage, and healed for ${healing} hp`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                    attacker.currentHP = Math.min(attacker.MaxHP, attacker.currentHP + healing);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Sol`);
                }
                break;
            case "Luna":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = attacker.attack - Math.floor(defender[attacker.targetStat] / 2);
                    damage = Math.max(damage, 0);
                    if (isCrit) damage *= 3;
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Luna for ${damage} damage`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Luna`);
                }
                break;
            case "Astra":
                let damage = Math.floor((attacker.attack - defender[attacker.targetStat]) * 0.3);
                damage = Math.max(damage, 0);
                for (let i = 1; i <= 5; i++) {
                    if(Math.random() < (attacker.hit - defender.avoid)){
                        let isCrit = Math.random() < attacker.critChance;
                        let hitdamage = damage;
                        if (isCrit) hitdamage *= 3;
                        this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Astra ${i} for ${hitdamage} damage`);
                        defender.currentHP = Math.max(0, defender.currentHP - hitdamage);
                    } else {
                        this.Log(`${attacker.name} missed ${defender.name} with Astra ${i}`);
                    }
                }
                break;
            case "Aether":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = attacker.attack - defender[attacker.targetStat];
                    damage = Math.max(damage, 0);
                    if (isCrit) damage *= 3;
                    let healing = Math.min(damage / 2, defender.currentHP / 2);
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Aether's Sol attack for ${damage} damage, and healed for ${healing} hp`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                    attacker.currentHP = Math.min(attacker.MaxHP, attacker.currentHP + healing);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Aether's Sol attack`);
                }
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = attacker.attack - Math.floor(defender[attacker.targetStat] / 2);
                    damage = Math.max(damage, 0);
                    if (isCrit) damage *= 3;
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Aether's Luna attack for ${damage} damage`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Aether's Luna attack`);
                }
                break;
            case "Rend Heaven":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = attacker.attack + Math.floor(defender.attack / 2) - defender[attacker.targetStat];
                    damage = Math.max(damage, 0);
                    if (isCrit) damage *= 3;
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Rend Heaven for ${damage} damage`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Rend Heaven`);
                }
                break;
            case "Ignis":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = attacker.attack + Math.floor(attacker.defense / 2) - defender[attacker.targetStat];
                    damage = Math.max(damage, 0);
                    if (isCrit) damage *= 3;
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Ignis for ${damage} damage`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Ignis`);
                }
                break;
            case "Glacies":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = attacker.attack + Math.floor(attacker.resist / 2) - defender[attacker.targetStat];
                    damage = Math.max(damage, 0);
                    if (isCrit) damage *= 3;
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Glacies for ${damage} damage`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Glacies`);
                }
                break;
            case "Lethality":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = defender.currentHP;
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Lethality for ${damage} damage`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Lethality`);
                }
                break;
            case "Dragon Fang":
                if(Math.random() < (attacker.hit - defender.avoid)){
                    let isCrit = Math.random() < attacker.critChance;
                    let damage = Math.floor(attacker.attack * 1.5) - defender[attacker.targetStat];
                    damage = Math.max(damage, 0);
                    if(isCrit) damage *= 3;
                    this.Log(`${attacker.name} ${isCrit ? "critically " : ""}hit ${defender.name} with Dragon Fang for ${damage} damage`);
                    defender.currentHP = Math.max(0, defender.currentHP - damage);
                } else {
                    this.Log(`${attacker.name} missed ${defender.name} with Dragon Fang`);
                }
                break;
        }
    }

}

export default BattleSim;